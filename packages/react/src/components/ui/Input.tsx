import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps, InteractiveProps, SizableProps } from '../../types'
import { Spin } from './Spin'

export interface InputProps extends BaseComponentProps, InteractiveProps, SizableProps {
  value?: string
  defaultValue?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number'
  onChange?: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
}

export function Input({
  value,
  defaultValue,
  placeholder,
  type = 'text',
  size: sizeProp,
  disabled: disabledProp,
  loading,
  onChange,
  onBlur,
  onFocus,
  className,
  style,
  unstyled,
}: InputProps) {
  const config = useConfig()
  const size = sizeProp ?? config.size ?? 'middle'
  const disabled = disabledProp ?? config.disabled ?? false

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
