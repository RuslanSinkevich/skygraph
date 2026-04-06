import React from 'react'
import { Spin } from './Spin'

export interface TextareaProps {
  value?: string
  defaultValue?: string
  placeholder?: string
  rows?: number
  maxLength?: number
  showCount?: boolean
  disabled?: boolean
  loading?: boolean
  onChange?: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}

export function Textarea({
  value,
  defaultValue,
  placeholder,
  rows = 4,
  maxLength,
  showCount,
  disabled,
  loading,
  onChange,
  onBlur,
  onFocus,
  className,
  style,
  unstyled,
}: TextareaProps) {
  const [internalValue, setInternalValue] = React.useState(value ?? defaultValue ?? '')
  const currentValue = value ?? internalValue

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value
    if (maxLength && v.length > maxLength) return
    setInternalValue(v)
    onChange?.(v)
  }

  const wrapperClass = unstyled
    ? className ?? ''
    : ['sg-textarea-wrapper', loading ? 'sg-textarea-wrapper-loading' : '', className]
        .filter(Boolean)
        .join(' ')

  return (
    <div className={wrapperClass} style={style}>
      <textarea
        className={unstyled ? '' : 'sg-input sg-textarea'}
        value={currentValue}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled || loading}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {loading && <Spin size="small" unstyled={unstyled} />}
      {showCount && !unstyled && (
        <span className="sg-textarea-count">
          {currentValue.length}{maxLength ? ` / ${maxLength}` : ''}
        </span>
      )}
    </div>
  )
}
