import React, { useRef } from 'react'
import { FormContext } from './FormContext'
import { useForm } from '../../hooks/useForm'
import { useConfig } from '../ConfigProvider'
import { useFormProviderRegister } from './FormProvider'
import type { UseFormOptions, UseFormReturn } from '../../hooks/useForm'
import type { ValidationMode } from '@skygraph/core'

export interface FormProps extends UseFormOptions {
  form?: UseFormReturn
  name?: string
  layout?: 'horizontal' | 'vertical' | 'inline'
  size?: 'small' | 'middle' | 'large'
  disabled?: boolean
  colon?: boolean
  requiredMark?: boolean | 'optional'
  labelCol?: { span?: number; offset?: number }
  wrapperCol?: { span?: number; offset?: number }
  labelAlign?: 'left' | 'right'
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
  scrollToFirstError?: boolean | ScrollIntoViewOptions
  preserve?: boolean
  validateTrigger?: ValidationMode | ValidationMode[]
  feedbackIcons?: {
    success?: React.ReactNode
    warning?: React.ReactNode
    error?: React.ReactNode
    validating?: React.ReactNode
  }
}

export function Form({
  form: externalForm,
  name: formName,
  layout = 'vertical',
  size: sizeProp,
  disabled: disabledProp,
  colon,
  requiredMark,
  labelCol,
  wrapperCol,
  labelAlign,
  className,
  style,
  children,
  scrollToFirstError,
  preserve,
  feedbackIcons,
  ...formOptions
}: FormProps) {
  const config = useConfig()
  const size = sizeProp ?? config.size ?? 'middle'
  const disabled = disabledProp ?? config.disabled

  const internalForm = useForm(externalForm ? undefined : formOptions)
  const { core, form, submit } = externalForm ?? internalForm
  const formRef = useRef<HTMLFormElement>(null)

  useFormProviderRegister(formName, form)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await submit()

    if (scrollToFirstError) {
      const result = await form.validate()
      if (!result.valid) {
        const firstErrorField = Object.keys(result.errors)[0]
        if (firstErrorField && formRef.current) {
          const el =
            formRef.current.querySelector(`[data-field-name="${firstErrorField}"]`) ??
            formRef.current.querySelector(`[name="${firstErrorField}"]`)
          if (el) {
            const scrollOpts =
              typeof scrollToFirstError === 'object' ? scrollToFirstError : { behavior: 'smooth' as const, block: 'center' as const }
            el.scrollIntoView(scrollOpts)
          }
        }
      }
    }
  }

  const classes = ['sg-form', `sg-form-${layout}`, `sg-form-${size}`]
  if (disabled) classes.push('sg-form-disabled')
  if (className) classes.push(className)

  return (
    <FormContext.Provider
      value={{
        core,
        form,
        layout,
        size,
        disabled,
        colon,
        requiredMark,
        labelCol,
        wrapperCol,
        labelAlign,
        preserve,
        feedbackIcons,
      }}
    >
      <form
        ref={formRef}
        name={formName}
        className={classes.join(' ')}
        style={style}
        onSubmit={handleSubmit}
        noValidate
      >
        {children}
      </form>
    </FormContext.Provider>
  )
}
