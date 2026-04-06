import { createContext, useContext } from 'react'
import type { Core, FormEngine } from '@skygraph/core'

export interface FormContextValue {
  core: Core
  form: FormEngine
  disabled?: boolean
  colon?: boolean
  requiredMark?: boolean | 'optional'
  labelCol?: { span?: number; offset?: number }
  wrapperCol?: { span?: number; offset?: number }
  labelAlign?: 'left' | 'right'
}

export const FormContext = createContext<FormContextValue | null>(null)

export function useFormContext(): FormContextValue {
  const ctx = useContext(FormContext)
  if (!ctx) {
    throw new Error('SkyGraph: useFormContext must be used inside <Form>')
  }
  return ctx
}
