import React, { useEffect, useRef } from 'react'
import { useFormContext } from './FormContext'
import { useField } from '../../hooks/useField'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { Tooltip } from '../ui/Tooltip'
import { Spin } from '../ui/Spin'
import type { UseFieldReturn } from '../../hooks/useField'
import type { Rule } from '@skygraph/core'
import type { BaseComponentProps } from '../../types'

export interface FieldProps extends BaseComponentProps {
  name: string
  label?: string
  required?: boolean
  rules?: Rule[]
  warningRules?: Rule[]
  dependencies?: string[]
  hidden?: boolean
  disabled?: boolean
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea'
  help?: React.ReactNode
  extra?: React.ReactNode
  tooltip?: string
  children?: React.ReactNode | ((field: UseFieldReturn) => React.ReactNode)
  // New props
  noStyle?: boolean
  normalize?: (value: unknown, prevValue: unknown) => unknown
  getValueFromEvent?: (...args: unknown[]) => unknown
  valuePropName?: string
  validateFirst?: boolean
  validateStatus?: 'success' | 'warning' | 'error' | 'validating'
  hasFeedback?: boolean
  preserve?: boolean
  labelCol?: { span?: number; offset?: number }
  wrapperCol?: { span?: number; offset?: number }
  messageVariables?: Record<string, string>
}

function FeedbackIcon({
  status,
  icons,
}: {
  status: 'success' | 'warning' | 'error' | 'validating' | undefined
  icons?: {
    success?: React.ReactNode
    warning?: React.ReactNode
    error?: React.ReactNode
    validating?: React.ReactNode
  }
}) {
  if (!status) return null

  const defaults: Record<string, React.ReactNode> = {
    validating: <Spin size="small" />,
    error: <span className="sg-field-feedback-icon sg-field-feedback-error">✕</span>,
    warning: <span className="sg-field-feedback-icon sg-field-feedback-warning">!</span>,
    success: <span className="sg-field-feedback-icon sg-field-feedback-success">✓</span>,
  }

  return <span className="sg-field-feedback">{icons?.[status] ?? defaults[status]}</span>
}

export function Field({
  name,
  label,
  required,
  rules = [],
  warningRules,
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
  noStyle,
  normalize,
  getValueFromEvent: _getValueFromEvent,
  validateFirst,
  validateStatus: manualStatus,
  hasFeedback,
  preserve,
  labelCol: fieldLabelCol,
  wrapperCol: fieldWrapperCol,
  messageVariables: _messageVariables,
}: FieldProps) {
  const ctx = useFormContext()
  const { core, form } = ctx
  const disabled = fieldDisabled ?? ctx.disabled
  const field = useField(core, form, name)
  const prevValueRef = useRef<unknown>(field.value)

  useEffect(() => {
    const allRules: Rule[] = [...rules]
    if (required) {
      allRules.unshift({ required: true })
    }
    form.register(name, {
      rules: allRules,
      warningRules,
      dependencies,
      validateFirst,
      label,
      preserve: preserve ?? ctx.preserve,
    })
    return () => form.unregister(name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, form, required])

  if (hidden) return null

  const wrappedOnChange = normalize
    ? (v: unknown) => {
        const normalized = normalize(v, prevValueRef.current)
        prevValueRef.current = normalized
        field.onChange(normalized)
      }
    : field.onChange

  const effectiveStatus = manualStatus ?? field.status
  const hasErrors = field.errors.length > 0
  const hasWarnings = field.warnings.length > 0

  // Layout
  const layout = ctx.layout ?? 'vertical'
  const lCol = fieldLabelCol ?? ctx.labelCol
  const wCol = fieldWrapperCol ?? ctx.wrapperCol
  const labelAlign = ctx.labelAlign ?? 'right'

  const labelNode = label ? (
    <label
      className="sg-field-label"
      style={
        layout === 'horizontal' && lCol?.offset
          ? { marginLeft: `${(lCol.offset / 24) * 100}%` }
          : undefined
      }
    >
      {tooltip ? (
        <Tooltip title={tooltip}>
          <span>{label}</span>
        </Tooltip>
      ) : (
        label
      )}
      {(required || ctx.requiredMark === true) && (
        <span className="sg-field-required">*</span>
      )}
      {ctx.requiredMark === 'optional' && !required && (
        <span className="sg-field-optional">(optional)</span>
      )}
      {ctx.colon && ':'}
    </label>
  ) : null

  const errorNodes = hasErrors ? (
    <div className="sg-field-error" role="alert">
      {field.errors.map((e, i) => (
        <div key={i}>{e}</div>
      ))}
    </div>
  ) : null

  const warningNodes = hasWarnings && !hasErrors ? (
    <div className="sg-field-warning">
      {field.warnings.map((w, i) => (
        <div key={i}>{w}</div>
      ))}
    </div>
  ) : null

  const helpNode =
    errorNodes ?? warningNodes ?? (help ? <div className="sg-field-help">{help}</div> : null)

  const extraNode = extra ? <div className="sg-field-extra">{extra}</div> : null

  const feedbackIcon =
    hasFeedback && field.touched ? (
      <FeedbackIcon status={effectiveStatus} icons={ctx.feedbackIcons} />
    ) : null

  // Render children
  const renderControl = () => {
    if (typeof children === 'function') {
      return (
        <>
          {children({ ...field, onChange: wrappedOnChange })}
          {feedbackIcon}
        </>
      )
    }

    if (children) {
      return (
        <>
          {children}
          {feedbackIcon}
        </>
      )
    }

    const inputElement =
      type === 'textarea' ? (
        <Textarea
          value={(field.value as string) ?? ''}
          onChange={(v) => wrappedOnChange(v)}
          onBlur={field.onBlur}
          disabled={disabled}
          placeholder={placeholder}
          unstyled={unstyled}
        />
      ) : (
        <Input
          type={type}
          value={(field.value as string) ?? ''}
          onChange={(v) => wrappedOnChange(type === 'number' ? Number(v) : v)}
          onBlur={field.onBlur}
          disabled={disabled}
          placeholder={placeholder}
          unstyled={unstyled}
        />
      )

    return (
      <>
        {inputElement}
        {feedbackIcon}
      </>
    )
  }

  // noStyle — just validation, no wrapper
  if (noStyle) {
    return <>{renderControl()}</>
  }

  // unstyled — minimal structure
  if (unstyled) {
    return (
      <>
        {labelNode}
        {renderControl()}
        {helpNode}
        {extraNode}
      </>
    )
  }

  // Horizontal layout with grid
  if (layout === 'horizontal' && lCol) {
    const labelSpan = lCol.span ?? 6
    const wrapperSpan = wCol?.span ?? 24 - labelSpan
    const labelPct = `${(labelSpan / 24) * 100}%`
    const wrapperPct = `${(wrapperSpan / 24) * 100}%`

    return (
      <div
        className={[
          'sg-field',
          'sg-field-horizontal',
          hasErrors ? 'sg-field-has-error' : '',
          hasWarnings && !hasErrors ? 'sg-field-has-warning' : '',
          effectiveStatus ? `sg-field-status-${effectiveStatus}` : '',
        ]
          .filter(Boolean)
          .join(' ')}
        data-field-name={name}
      >
        <div
          className="sg-field-label-wrap"
          style={{
            width: labelPct,
            flexShrink: 0,
            textAlign: labelAlign,
          }}
        >
          {labelNode}
        </div>
        <div className="sg-field-control-wrap" style={{ width: wrapperPct }}>
          <div className="sg-field-control">{renderControl()}</div>
          {helpNode}
          {extraNode}
        </div>
      </div>
    )
  }

  // Default vertical / inline layout
  const fieldClasses = [
    'sg-field',
    hasErrors ? 'sg-field-has-error' : '',
    hasWarnings && !hasErrors ? 'sg-field-has-warning' : '',
    effectiveStatus ? `sg-field-status-${effectiveStatus}` : '',
  ]

  return (
    <div className={fieldClasses.filter(Boolean).join(' ')} data-field-name={name}>
      {labelNode}
      <div className="sg-field-control">{renderControl()}</div>
      {helpNode}
      {extraNode}
    </div>
  )
}
