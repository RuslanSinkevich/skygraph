import { useState, useCallback, useMemo } from 'react'
import { createCore, createForm } from '@skygraph/core'
import type { Core, FormEngine, FormOptions, FormState } from '@skygraph/core'

export interface UseFormOptions extends FormOptions {
  onSubmit?: (values: Record<string, unknown>) => void | Promise<void>
  onSubmitInvalid?: (errors: Record<string, string>) => void
}

export interface UseFormReturn {
  core: Core
  form: FormEngine
  formState: FormState
  submit: () => Promise<void>
  reset: (values?: Record<string, unknown>) => void
  setFieldValue: (name: string, value: unknown) => void
  setFieldsValue: (values: Record<string, unknown>) => void
  getFieldValue: (name: string) => unknown
  getFieldsValue: () => Record<string, unknown>
  validateFields: (name?: string) => Promise<{ valid: boolean; errors: Record<string, string> }>
}

export function useForm(options?: UseFormOptions): UseFormReturn {
  const [{ core, form }] = useState(() => {
    const c = createCore()
    const f = createForm(c, options)
    return { core: c, form: f }
  })

  const [formState, setFormState] = useState<FormState>(() =>
    form.getFormState()
  )

  const refreshState = useCallback(() => {
    setFormState(form.getFormState())
  }, [form])

  const submit = useCallback(async () => {
    refreshState()
    await form.submit(async (values) => {
      await options?.onSubmit?.(values)
    })

    const state = form.getFormState()
    setFormState(state)

    if (!state.isValid && options?.onSubmitInvalid) {
      const result = await form.validate()
      options.onSubmitInvalid(result.errors)
    }
  }, [form, options, refreshState])

  const reset = useCallback(
    (values?: Record<string, unknown>) => {
      form.reset(values)
      setFormState(form.getFormState())
    },
    [form]
  )

  const setFieldValue = useCallback(
    (name: string, value: unknown) => {
      form.setValue(name, value)
    },
    [form]
  )

  const setFieldsValue = useCallback(
    (values: Record<string, unknown>) => {
      form.setFieldsValue(values)
    },
    [form]
  )

  const getFieldValue = useCallback(
    (name: string) => form.getValue(name),
    [form]
  )

  const getFieldsValue = useCallback(
    () => form.getFieldsValue(),
    [form]
  )

  const validateFields = useCallback(
    (name?: string) => form.validate(name),
    [form]
  )

  return useMemo(
    () => ({
      core,
      form,
      formState,
      submit,
      reset,
      setFieldValue,
      setFieldsValue,
      getFieldValue,
      getFieldsValue,
      validateFields,
    }),
    [core, form, formState, submit, reset, setFieldValue, setFieldsValue, getFieldValue, getFieldsValue, validateFields]
  )
}
