import React, { useEffect } from 'react'
import { useFormContext } from './FormContext'
import { useField } from '../../hooks/useField'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { Tooltip } from '../ui/Tooltip'
import type { UseFieldReturn } from '../../hooks/useField'
import type { Rule } from '@skygraph/core'

export interface FieldProps {
  name: string
  label?: string
  required?: boolean
  rules?: Rule[]
  dependencies?: string[]
  hidden?: boolean
  disabled?: boolean
  unstyled?: boolean
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea'
  help?: React.ReactNode
  extra?: React.ReactNode
  tooltip?: string
  children?: React.ReactNode | ((field: UseFieldReturn) => React.ReactNode)
}

export function Field({
  name,
  label,
  required,
  rules = [],
  dependencies,
  hidden,
  disabled: fieldDisabled,
  unstyled,
  placeholder,
  type = 'text',
  help,
  extra,
  tooltip,
  children,
}: FieldProps) {
  const ctx = useFormContext()
  const { core, form } = ctx
  const disabled = fieldDisabled ?? ctx.disabled
  const field = useField(core, form, name)

  useEffect(() => {
    const allRules: Rule[] = [...rules]
    if (required) {
      allRules.unshift({ required: true })
    }
    form.register(name, { rules: allRules, dependencies })
    return () => form.unregister(name)
  }, [name, form, required])

  if (hidden) return null

  const labelNode = label ? (
    <label className="sg-field-label">
      {tooltip ? (
        <Tooltip title={tooltip}>
          <span>{label}</span>
        </Tooltip>
      ) : (
        label
      )}
      {(required || ctx.requiredMark === true) && <span className="sg-field-required">*</span>}
      {ctx.requiredMark === 'optional' && !required && (
        <span className="sg-field-optional">(optional)</span>
      )}
      {ctx.colon && ':'}
    </label>
  ) : null

  const helpNode = field.error
    ? <div className="sg-field-error">{field.error}</div>
    : help
      ? <div className="sg-field-help">{help}</div>
      : null

  const extraNode = extra ? <div className="sg-field-extra">{extra}</div> : null

  if (typeof children === 'function') {
    if (unstyled) return <>{children(field)}</>
    return (
      <div className={`sg-field${field.error ? ' sg-field-has-error' : ''}`}>
        {labelNode}
        <div className="sg-field-control">{children(field)}</div>
        {helpNode}
        {extraNode}
      </div>
    )
  }

  const inputElement =
    type === 'textarea' ? (
      <Textarea
        value={(field.value as string) ?? ''}
        onChange={(v) => field.onChange(v)}
        onBlur={field.onBlur}
        disabled={disabled}
        placeholder={placeholder}
        unstyled={unstyled}
      />
    ) : (
      <Input
        type={type}
        value={(field.value as string) ?? ''}
        onChange={(v) =>
          field.onChange(type === 'number' ? Number(v) : v)
        }
        onBlur={field.onBlur}
        disabled={disabled}
        placeholder={placeholder}
        unstyled={unstyled}
      />
    )

  if (unstyled) {
    return (
      <>
        {labelNode}
        {inputElement}
        {helpNode}
        {extraNode}
      </>
    )
  }

  const fieldClasses = ['sg-field']
  if (field.error) fieldClasses.push('sg-field-has-error')

  return (
    <div className={fieldClasses.join(' ')}>
      {labelNode}
      <div className="sg-field-control">{inputElement}</div>
      {helpNode}
      {extraNode}
    </div>
  )
}
