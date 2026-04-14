import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps, InteractiveProps, SizableProps } from '../../types'
import { Spin } from './Spin'

/** Props for the Input component. */
export interface InputProps extends BaseComponentProps, InteractiveProps, SizableProps {
  /** Controlled input value. */
  value?: string
  /** Uncontrolled initial value. */
  defaultValue?: string
  /** Placeholder text when the field is empty. */
  placeholder?: string
  /** Native HTML input type. @default 'text' */
  type?: 'text' | 'email' | 'password' | 'number'
  /** Exposes invalid state to assistive technologies. */
  'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling'
  /** Marks the field as required for assistive technologies. */
  'aria-required'?: boolean | 'false' | 'true'
  /** Called when the text value changes. */
  onChange?: (value: string) => void
  /** Called when the input loses focus. */
  onBlur?: () => void
  /** Called when the input gains focus. */
  onFocus?: () => void
}

/** Single-line text input with optional loading indicator and configurable HTML type. */
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
  'aria-invalid': ariaInvalid,
  'aria-required': ariaRequired,
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
        aria-invalid={ariaInvalid}
        aria-required={ariaRequired}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {loading && <Spin size="small" unstyled={unstyled} />}
    </span>
  )
}
