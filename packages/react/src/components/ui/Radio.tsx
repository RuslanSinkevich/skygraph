import React from 'react'
import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps, InteractiveProps } from '../../types'
import { Spin } from './Spin'

export interface RadioOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface RadioGroupProps extends BaseComponentProps, InteractiveProps {
  value?: string | number
  defaultValue?: string | number
  options: RadioOption[]
  direction?: 'horizontal' | 'vertical'
  onChange?: (value: string | number) => void
}

export function RadioGroup({
  value,
  defaultValue,
  options,
  direction = 'horizontal',
  disabled: disabledProp,
  loading,
  onChange,
  className,
  style,
  unstyled,
}: RadioGroupProps) {
  const config = useConfig()
  const disabled = disabledProp ?? config.disabled ?? false

  const [internalValue, setInternalValue] = React.useState(
    value ?? defaultValue
  )
  const currentValue = value ?? internalValue

  const groupClass = unstyled
    ? className ?? ''
    : [
        'sg-radio-group',
        `sg-radio-group-${direction}`,
        loading ? 'sg-radio-group-loading' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')

  return (
    <div className={groupClass} role="radiogroup" style={style}>
      {options.map((opt) => (
        <label
          key={opt.value}
          className={
            unstyled
              ? ''
              : [
                  'sg-radio',
                  currentValue === opt.value ? 'sg-radio-checked' : '',
                  opt.disabled || disabled || loading ? 'sg-radio-disabled' : '',
                ]
                  .filter(Boolean)
                  .join(' ')
          }
        >
          <input
            type="radio"
            className={unstyled ? '' : 'sg-radio-input'}
            checked={currentValue === opt.value}
            disabled={opt.disabled || disabled || loading}
            onChange={() => {
              setInternalValue(opt.value)
              onChange?.(opt.value)
            }}
          />
          <span className={unstyled ? '' : 'sg-radio-label'}>{opt.label}</span>
          {loading && currentValue === opt.value && (
            <Spin size="small" unstyled={unstyled} />
          )}
        </label>
      ))}
    </div>
  )
}
