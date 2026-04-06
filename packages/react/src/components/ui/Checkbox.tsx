import React from 'react'
import { Spin } from './Spin'

export interface CheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  loading?: boolean
  indeterminate?: boolean
  onChange?: (checked: boolean) => void
  children?: React.ReactNode
  className?: string
  unstyled?: boolean
}

export function Checkbox({
  checked,
  defaultChecked,
  disabled,
  loading,
  indeterminate,
  onChange,
  children,
  className,
  unstyled,
}: CheckboxProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate ?? false
    }
  }, [indeterminate])

  const wrapperClass = unstyled
    ? className ?? ''
    : [
        'sg-checkbox',
        disabled || loading ? 'sg-checkbox-disabled' : '',
        loading ? 'sg-checkbox-loading' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')

  return (
    <label className={wrapperClass}>
      <input
        ref={inputRef}
        type="checkbox"
        className={unstyled ? '' : 'sg-checkbox-input'}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled || loading}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      {children && (
        <span className={unstyled ? '' : 'sg-checkbox-label'}>{children}</span>
      )}
      {loading && <Spin size="small" unstyled={unstyled} />}
    </label>
  )
}
