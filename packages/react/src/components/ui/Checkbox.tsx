import React from 'react'
import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps, InteractiveProps } from '../../types'
import { Spin } from './Spin'

export interface CheckboxProps extends BaseComponentProps, InteractiveProps {
  checked?: boolean
  defaultChecked?: boolean
  indeterminate?: boolean
  onChange?: (checked: boolean) => void
  children?: React.ReactNode
}

export function Checkbox({
  checked,
  defaultChecked,
  disabled: disabledProp,
  loading,
  indeterminate,
  onChange,
  children,
  className,
  style,
  unstyled,
}: CheckboxProps) {
  const config = useConfig()
  const disabled = disabledProp ?? config.disabled ?? false

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
    <label className={wrapperClass} style={style}>
      <input
        ref={inputRef}
        type="checkbox"
        aria-checked={checked}
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
