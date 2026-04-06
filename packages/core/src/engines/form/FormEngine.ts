import type { Core } from '../../types'
import type {
  FieldMeta,
  FieldOptions,
  FormEngine,
  FormOptions,
  FormState,
  GetFieldValue,
  Rule,
  RuleFn,
  RuleObject,
  ValidationResult,
} from './types'

const META_PREFIX = '$meta.'

function metaPath(name: string, field: keyof FieldMeta): string {
  return `${META_PREFIX}${name}.${field}`
}

function compileRule(rule: Rule): RuleFn {
  if (typeof rule === 'function') return rule

  const obj = rule as RuleObject
  return (value: unknown, getFieldValue: GetFieldValue): string | null | Promise<string | null> => {
    if (obj.required) {
      if (value === undefined || value === null || value === '') {
        return obj.message ?? 'This field is required'
      }
    }

    if (value === undefined || value === null || value === '') return null

    if (obj.type) {
      switch (obj.type) {
        case 'string':
          if (typeof value !== 'string') return obj.message ?? 'Must be a string'
          break
        case 'number':
          if (typeof value !== 'number' || isNaN(value)) return obj.message ?? 'Must be a number'
          break
        case 'email':
          if (typeof value !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return obj.message ?? 'Invalid email'
          break
        case 'url':
          try { new URL(value as string) } catch { return obj.message ?? 'Invalid URL' }
          break
        case 'boolean':
          if (typeof value !== 'boolean') return obj.message ?? 'Must be a boolean'
          break
      }
    }

    if (obj.min !== undefined) {
      if (typeof value === 'string' && value.length < obj.min)
        return obj.message ?? `Minimum ${obj.min} characters`
      if (typeof value === 'number' && value < obj.min)
        return obj.message ?? `Minimum value is ${obj.min}`
    }

    if (obj.max !== undefined) {
      if (typeof value === 'string' && value.length > obj.max)
        return obj.message ?? `Maximum ${obj.max} characters`
      if (typeof value === 'number' && value > obj.max)
        return obj.message ?? `Maximum value is ${obj.max}`
    }

    if (obj.pattern) {
      if (typeof value === 'string' && !obj.pattern.test(value))
        return obj.message ?? 'Invalid format'
    }

    if (obj.validator) {
      return obj.validator(value, getFieldValue)
    }

    return null
  }
}

interface FieldRecord {
  rules: RuleFn[]
  options: FieldOptions
  abortController: AbortController | null
}

export function createForm(core: Core, options?: FormOptions): FormEngine {
  const fields = new Map<string, FieldRecord>()
  const depMap = new Map<string, string[]>()
  const debounceTimers = new Map<string, ReturnType<typeof setTimeout>>()
  let isSubmitting = false

  if (options?.defaultValues) {
    for (const [key, value] of Object.entries(options.defaultValues)) {
      core.set(key, value)
    }
  }

  const defaultMeta: FieldMeta = {
    touched: false,
    dirty: false,
    error: null,
    validating: false,
  }

  function setMeta(name: string, meta: Partial<FieldMeta>): void {
    for (const [key, value] of Object.entries(meta)) {
      core.set(metaPath(name, key as keyof FieldMeta), value)
    }
  }

  function getMeta(name: string): FieldMeta {
    return {
      touched: (core.get(metaPath(name, 'touched')) as boolean) ?? false,
      dirty: (core.get(metaPath(name, 'dirty')) as boolean) ?? false,
      error: (core.get(metaPath(name, 'error')) as string | null) ?? null,
      validating: (core.get(metaPath(name, 'validating')) as boolean) ?? false,
    }
  }

  const getFieldValue: GetFieldValue = (fieldName: string) => core.get(fieldName)

  async function runValidation(name: string): Promise<string | null> {
    const record = fields.get(name)
    if (!record) return null

    const value = core.get(name)

    record.abortController?.abort()
    const controller = new AbortController()
    record.abortController = controller

    let firstError: string | null = null

    for (const rule of record.rules) {
      if (controller.signal.aborted) return null

      const result = rule(value, getFieldValue)

      if (result instanceof Promise) {
        setMeta(name, { validating: true })
        try {
          const asyncResult = await result
          if (controller.signal.aborted) return null
          if (asyncResult) {
            firstError = asyncResult
            break
          }
        } catch {
          if (controller.signal.aborted) return null
          firstError = 'Validation failed'
          break
        }
      } else if (result) {
        firstError = result
        break
      }
    }

    if (!controller.signal.aborted) {
      setMeta(name, { error: firstError, validating: false })
    }

    return firstError
  }

  async function validateDependents(name: string): Promise<void> {
    for (const [target, deps] of depMap) {
      if (deps.includes(name)) {
        await runValidation(target)
      }
    }
  }

  const form: FormEngine = {
    register(name: string, fieldOptions?: FieldOptions): void {
      const opts = fieldOptions ?? {}
      fields.set(name, {
        rules: opts.rules ? opts.rules.map(compileRule) : [],
        options: opts,
        abortController: null,
      })

      if (opts.defaultValue !== undefined && core.get(name) === undefined) {
        core.set(name, opts.defaultValue)
      }

      if (opts.dependencies) {
        depMap.set(name, [...opts.dependencies])
      }

      core.batch(() => {
        setMeta(name, defaultMeta)
      })
    },

    unregister(name: string): void {
      const record = fields.get(name)
      record?.abortController?.abort()
      fields.delete(name)
      depMap.delete(name)
    },

    setValue(name: string, value: unknown): void {
      core.transaction(() => {
        core.set(name, value)
        setMeta(name, { dirty: true, touched: true })
      })

      const mode = fields.get(name)?.options.validateOn ?? options?.validateOn ?? 'change'
      if (mode === 'change') {
        const debounceMs = options?.asyncDebounceMs
        if (debounceMs && debounceMs > 0) {
          const existing = debounceTimers.get(name)
          if (existing) clearTimeout(existing)
          debounceTimers.set(name, setTimeout(() => {
            debounceTimers.delete(name)
            runValidation(name).then(() => validateDependents(name))
          }, debounceMs))
        } else {
          runValidation(name).then(() => validateDependents(name))
        }
      }
    },

    getValue(name: string): unknown {
      return core.get(name)
    },

    onFieldBlur(name: string): void {
      setMeta(name, { touched: true })
      const mode = fields.get(name)?.options.validateOn ?? options?.validateOn ?? 'change'
      if (mode === 'blur') {
        runValidation(name).then(() => validateDependents(name))
      }
    },

    setFieldsValue(values: Record<string, unknown>): void {
      core.batch(() => {
        for (const [name, value] of Object.entries(values)) {
          core.set(name, value)
          if (fields.has(name)) {
            setMeta(name, { dirty: true, touched: true })
          }
        }
      })
    },

    getFieldsValue(): Record<string, unknown> {
      const values: Record<string, unknown> = {}
      for (const name of fields.keys()) {
        values[name] = core.get(name)
      }
      return values
    },

    getFieldState(name: string): FieldMeta {
      return getMeta(name)
    },

    getFormState(): FormState {
      let isDirty = false
      let isValid = true
      let isValidating = false

      for (const name of fields.keys()) {
        const meta = getMeta(name)
        if (meta.dirty) isDirty = true
        if (meta.error) isValid = false
        if (meta.validating) isValidating = true
      }

      return { isDirty, isValid, isSubmitting, isValidating }
    },

    addRule(name: string, rule: Rule): void {
      const record = fields.get(name)
      if (!record) return
      record.rules.push(compileRule(rule))
    },

    removeRule(name: string, rule: Rule): void {
      const record = fields.get(name)
      if (!record) return
      const compiled = compileRule(rule)
      const idx = record.rules.indexOf(compiled)
      if (idx !== -1) record.rules.splice(idx, 1)
    },

    depends(target: string, deps: string[]): void {
      depMap.set(target, [...deps])
    },

    async validate(name?: string): Promise<ValidationResult> {
      const errors: Record<string, string> = {}

      if (name) {
        const err = await runValidation(name)
        if (err) errors[name] = err
      } else {
        const promises: Promise<void>[] = []
        for (const fieldName of fields.keys()) {
          promises.push(
            runValidation(fieldName).then((err) => {
              if (err) errors[fieldName] = err
            })
          )
        }
        await Promise.all(promises)
      }

      return { valid: Object.keys(errors).length === 0, errors }
    },

    async submit(
      handler: (values: Record<string, unknown>) => Promise<void>
    ): Promise<void> {
      isSubmitting = true

      core.batch(() => {
        for (const name of fields.keys()) {
          setMeta(name, { touched: true })
        }
      })

      const result = await form.validate()

      if (!result.valid) {
        isSubmitting = false
        return
      }

      const values: Record<string, unknown> = {}
      for (const name of fields.keys()) {
        values[name] = core.get(name)
      }

      try {
        await handler(values)
      } finally {
        isSubmitting = false
      }
    },

    reset(values?: Record<string, unknown>): void {
      core.batch(() => {
        for (const [name, record] of fields) {
          record.abortController?.abort()
          record.abortController = null

          const resetValue = values?.[name]
            ?? options?.defaultValues?.[name]
            ?? record.options.defaultValue
            ?? undefined
          core.set(name, resetValue)
          setMeta(name, defaultMeta)
        }
      })
    },

    getFieldNames(): string[] {
      return [...fields.keys()]
    },

    getListValue(name: string): unknown[] {
      const val = core.get(name)
      return Array.isArray(val) ? val : []
    },

    listAdd(name: string, defaultValue?: unknown): void {
      const current = form.getListValue(name)
      core.set(name, [...current, defaultValue ?? null])
    },

    listRemove(name: string, index: number): void {
      const current = form.getListValue(name)
      core.set(name, current.filter((_, i) => i !== index))
    },

    listMove(name: string, from: number, to: number): void {
      const current = [...form.getListValue(name)]
      const [item] = current.splice(from, 1)
      current.splice(to, 0, item)
      core.set(name, current)
    },
  }

  return form
}
