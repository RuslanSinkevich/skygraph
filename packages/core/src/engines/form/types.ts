export interface FieldMeta {
  touched: boolean
  dirty: boolean
  error: string | null
  validating: boolean
}

export interface FormState {
  isDirty: boolean
  isValid: boolean
  isSubmitting: boolean
  isValidating: boolean
}

export type GetFieldValue = (name: string) => unknown

export type RuleFn = (value: unknown, getFieldValue: GetFieldValue) => string | null | Promise<string | null>

export interface RuleObject {
  required?: boolean
  type?: 'string' | 'number' | 'email' | 'url' | 'boolean'
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (value: unknown, getFieldValue: GetFieldValue) => string | null | Promise<string | null>
  message?: string
}

export type Rule = RuleFn | RuleObject

export interface ValidationResult {
  valid: boolean
  errors: Record<string, string>
}

export interface FieldOptions {
  defaultValue?: unknown
  rules?: Rule[]
  validateOn?: ValidationMode
  dependencies?: string[]
}

export type ValidationMode = 'change' | 'blur' | 'submit'

export interface FormOptions {
  defaultValues?: Record<string, unknown>
  validateOn?: ValidationMode
  asyncDebounceMs?: number
}

export interface FormListOperation {
  add(defaultValue?: unknown): void
  remove(index: number): void
  move(from: number, to: number): void
}

export interface FormEngine {
  register(name: string, options?: FieldOptions): void
  unregister(name: string): void

  setValue(name: string, value: unknown): void
  getValue(name: string): unknown
  setFieldsValue(values: Record<string, unknown>): void
  getFieldsValue(): Record<string, unknown>

  getFieldState(name: string): FieldMeta
  getFormState(): FormState

  onFieldBlur(name: string): void

  addRule(name: string, rule: Rule): void
  removeRule(name: string, rule: Rule): void
  depends(target: string, deps: string[]): void

  validate(name?: string): Promise<ValidationResult>
  submit(
    handler: (values: Record<string, unknown>) => Promise<void>
  ): Promise<void>
  reset(values?: Record<string, unknown>): void

  getFieldNames(): string[]

  /** List operations for dynamic field arrays */
  getListValue(name: string): unknown[]
  listAdd(name: string, defaultValue?: unknown): void
  listRemove(name: string, index: number): void
  listMove(name: string, from: number, to: number): void
}
