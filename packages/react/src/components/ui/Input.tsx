import React from 'react'
import { Spin } from './Spin'

export interface InputProps {
  value?: string
  defaultValue?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number'
  size?: 'small' | 'middle' | 'large'
  disabled?: boolean
  loading?: boolean
  onChange?: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}

export function Input({
  value,
  defaultValue,
  placeholder,
  type = 'text',
  size = 'middle',
  disabled,
  loading,
  onChange,
  onBlur,
  onFocus,
  className,
  style,
  unstyled,
}: InputProps) {
  const wrapperClasses = unstyled
    ? className ?? ''
    : [
        'sg-input-wrapper',
        `sg-input-wrapper-${size}`,
        loading ? 'sg-input-wrapper-loading' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')

  const inputClasses = unstyled
    ? ''
    : ['sg-input', `sg-input-${size}`].filter(Boolean).join(' ')

  return (
    <span className={wrapperClasses} style={style}>
      <input
        type={type}
        className={inputClasses}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled || loading}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {loading && <Spin size="small" unstyled={unstyled} />}
    </span>
  )
}
