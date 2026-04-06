import { useState, useRef, useEffect } from 'react'
import { Spin } from './Spin'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
  loading?: boolean
}

export interface SelectProps {
  value?: string | number
  defaultValue?: string | number
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  size?: 'small' | 'middle' | 'large'
  onChange?: (value: string | number) => void
  className?: string
  unstyled?: boolean
}

export function Select({
  value,
  defaultValue,
  options,
  placeholder = 'Select...',
  disabled,
  loading,
  size = 'middle',
  onChange,
  className,
  unstyled,
}: SelectProps) {
  const [internalValue, setInternalValue] = useState(value ?? defaultValue)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const currentValue = value ?? internalValue

  const selectedOption = options.find((o) => o.value === currentValue)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (opt: SelectOption) => {
    if (opt.disabled || opt.loading) return
    setInternalValue(opt.value)
    onChange?.(opt.value)
    setOpen(false)
  }

  if (unstyled) {
    return (
      <select
        className={className}
        value={currentValue as string}
        disabled={disabled || loading}
        onChange={(e) => {
          const v = e.target.value
          const numVal = Number(v)
          const finalVal = options.some((o) => o.value === numVal)
            ? numVal
            : v
          setInternalValue(finalVal)
          onChange?.(finalVal)
        }}
      >
        {!selectedOption && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
    )
  }

  const wrapperClass = [
    'sg-select',
    `sg-select-${size}`,
    open ? 'sg-select-open' : '',
    disabled || loading ? 'sg-select-disabled' : '',
    loading ? 'sg-select-loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={wrapperClass} ref={ref}>
      <div
        className="sg-select-selector"
        onClick={() => !disabled && !loading && setOpen(!open)}
      >
        <span
          className={
            selectedOption
              ? 'sg-select-selection-item'
              : 'sg-select-placeholder'
          }
        >
          {selectedOption?.label ?? placeholder}
        </span>
        {loading ? (
          <Spin size="small" unstyled={unstyled} />
        ) : (
          <span className="sg-select-arrow">{open ? '\u25B2' : '\u25BC'}</span>
        )}
      </div>
      {open && (
        <div className="sg-select-dropdown">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={[
                'sg-select-option',
                opt.value === currentValue ? 'sg-select-option-selected' : '',
                opt.disabled || opt.loading ? 'sg-select-option-disabled' : '',
                opt.loading ? 'sg-select-option-loading' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleSelect(opt)}
            >
              <span>{opt.label}</span>
              {opt.loading && <Spin size="small" unstyled={unstyled} />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
