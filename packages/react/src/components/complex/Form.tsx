import React from 'react'
import { FormContext } from './FormContext'
import { useForm } from '../../hooks/useForm'
import type { UseFormOptions, UseFormReturn } from '../../hooks/useForm'

export interface FormProps extends UseFormOptions {
  form?: UseFormReturn
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
}

export function Form({
  form: externalForm,
  layout = 'vertical',
  size = 'middle',
  disabled,
  colon,
  requiredMark,
  labelCol,
  wrapperCol,
  labelAlign,
  className,
  style,
  children,
  ...formOptions
}: FormProps) {
  const internalForm = useForm(externalForm ? undefined : formOptions)
  const { core, form, submit } = externalForm ?? internalForm

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submit()
  }

  const classes = ['sg-form', `sg-form-${layout}`, `sg-form-${size}`]
  if (disabled) classes.push('sg-form-disabled')
  if (className) classes.push(className)

  return (
    <FormContext.Provider value={{
      core,
      form,
      disabled,
      colon,
      requiredMark,
      labelCol,
      wrapperCol,
      labelAlign,
    }}>
      <form
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
