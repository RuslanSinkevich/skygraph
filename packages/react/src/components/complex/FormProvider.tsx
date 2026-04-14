import React, { createContext, useCallback, useContext, useMemo, useRef } from 'react'
import type { FormEngine } from '@skygraph/core'

interface FormProviderContextValue {
  registerForm: (name: string, form: FormEngine) => void
  unregisterForm: (name: string) => void
  onFormFinish?: (
    name: string,
    info: { values: Record<string, unknown>; forms: Record<string, FormEngine> },
  ) => void
  onFormChange?: (
    name: string,
    info: { changedFields: string[]; forms: Record<string, FormEngine> },
  ) => void
}

const FormProviderContext = createContext<FormProviderContextValue | null>(null)

export interface FormProviderProps {
  onFormFinish?: (
    name: string,
    info: { values: Record<string, unknown>; forms: Record<string, FormEngine> },
  ) => void
  onFormChange?: (
    name: string,
    info: { changedFields: string[]; forms: Record<string, FormEngine> },
  ) => void
  children: React.ReactNode
}

export function FormProvider({ onFormFinish, onFormChange, children }: FormProviderProps) {
  const formsRef = useRef<Record<string, FormEngine>>({})

  const registerForm = useCallback((name: string, form: FormEngine) => {
    formsRef.current[name] = form
  }, [])

  const unregisterForm = useCallback((name: string) => {
    delete formsRef.current[name]
  }, [])

  const value = useMemo<FormProviderContextValue>(
    () => ({
      registerForm,
      unregisterForm,
      onFormFinish,
      onFormChange,
    }),
    [registerForm, unregisterForm, onFormFinish, onFormChange],
  )

  return (
    <FormProviderContext.Provider value={value}>{children}</FormProviderContext.Provider>
  )
}

export function useFormProvider() {
  return useContext(FormProviderContext)
}

export function useFormProviderRegister(name: string | undefined, form: FormEngine) {
  const provider = useContext(FormProviderContext)

  React.useEffect(() => {
    if (!provider || !name) return
    provider.registerForm(name, form)
    return () => provider.unregisterForm(name)
  }, [provider, name, form])

  return provider
}
