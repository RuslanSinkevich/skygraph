import React from 'react'
import { Spin } from './Spin'
import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps, InteractiveProps, SizableProps } from '../../types'

export interface InputNumberProps extends BaseComponentProps, InteractiveProps, SizableProps {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  precision?: number
  placeholder?: string
  onChange?: (value: number | null) => void
  onBlur?: () => void
}

export function InputNumber({
  value,
  defaultValue,
  min,
  max,
  step = 1,
  precision,
  disabled: disabledProp,
  loading,
  placeholder,
  size: sizeProp,
  onChange,
  onBlur,
  className,
  style,
  unstyled,
}: InputNumberProps) {
  const config = useConfig()
  const size = sizeProp ?? config.size ?? 'middle'
  const disabled = disabledProp ?? config.disabled ?? false

  const [internalValue, setInternalValue] = React.useState<number | null>(
    value ?? defaultValue ?? null
  )
  const currentValue = value ?? internalValue

  const clamp = (v: number): number => {
    let result = v
    if (min !== undefined && result < min) result = min
    if (max !== undefined && result > max) result = max
    if (precision !== undefined) result = Number(result.toFixed(precision))
    return result
  }

  const update = (v: number | null) => {
    const clamped = v !== null ? clamp(v) : null
    setInternalValue(clamped)
    onChange?.(clamped)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (raw === '' || raw === '-') {
      setInternalValue(null)
      onChange?.(null)
      return
    }
    const num = Number(raw)
    if (!isNaN(num)) update(num)
  }

  const increment = () => {
    if (disabled || loading) return
    update((currentValue ?? 0) + step)
  }

  const decrement = () => {
    if (disabled || loading) return
    update((currentValue ?? 0) - step)
  }

  const wrapperClass = unstyled
    ? className ?? ''
    : [
        'sg-input-number',
        `sg-input-number-${size}`,
        loading ? 'sg-input-number-loading' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')

  return (
    <span className={wrapperClass} style={style}>
      <button
        className={unstyled ? '' : 'sg-input-number-btn sg-input-number-minus'}
        onClick={decrement}
        disabled={disabled || loading || (min !== undefined && (currentValue ?? 0) <= min)}
        tabIndex={-1}
      >
        −
      </button>
      <input
        type="text"
        inputMode="numeric"
        className={unstyled ? '' : 'sg-input-number-input'}
        value={currentValue ?? ''}
        placeholder={placeholder}
        disabled={disabled || loading}
        onChange={handleChange}
        onBlur={onBlur}
      />
      <button
        className={unstyled ? '' : 'sg-input-number-btn sg-input-number-plus'}
        onClick={increment}
        disabled={disabled || loading || (max !== undefined && (currentValue ?? 0) >= max)}
        tabIndex={-1}
      >
        +
      </button>
      {loading && <Spin size="small" unstyled={unstyled} />}
    </span>
  )
}
