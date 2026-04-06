import React, { useState, useRef, useEffect } from 'react'
import { Spin } from './Spin'

export interface AutoCompleteOption {
  label: string
  value: string
}

export interface AutoCompleteProps {
  value?: string
  defaultValue?: string
  options: AutoCompleteOption[]
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  size?: 'small' | 'middle' | 'large'
  onChange?: (value: string) => void
  onSearch?: (query: string) => void
  onSelect?: (value: string, option: AutoCompleteOption) => void
  onBlur?: () => void
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}

export function AutoComplete({
  value,
  defaultValue,
  options,
  placeholder,
  disabled,
  loading,
  size = 'middle',
  onChange,
  onSearch,
  onSelect,
  onBlur,
  className,
  style,
  unstyled,
}: AutoCompleteProps) {
  const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? '')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const currentValue = value ?? internalValue

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(currentValue.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setInternalValue(v)
    onChange?.(v)
    onSearch?.(v)
    setOpen(true)
  }

  const handleSelect = (opt: AutoCompleteOption) => {
    setInternalValue(opt.value)
    onChange?.(opt.value)
    onSelect?.(opt.value, opt)
    setOpen(false)
  }

  const wrapperClass = unstyled
    ? className ?? ''
    : ['sg-autocomplete', `sg-autocomplete-${size}`, loading ? 'sg-autocomplete-loading' : '', className]
        .filter(Boolean)
        .join(' ')

  return (
    <div className={wrapperClass} ref={ref} style={style}>
      <span className={unstyled ? '' : 'sg-input-wrapper'}>
        <input
          type="text"
          className={unstyled ? '' : `sg-input sg-input-${size}`}
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled || loading}
          onChange={handleChange}
          onFocus={() => setOpen(true)}
          onBlur={onBlur}
        />
        {loading && <Spin size="small" unstyled={unstyled} />}
      </span>
      {open && filtered.length > 0 && (
        <div className={unstyled ? '' : 'sg-autocomplete-dropdown'}>
          {filtered.map((opt) => (
            <div
              key={opt.value}
              className={unstyled ? '' : 'sg-autocomplete-option'}
              onMouseDown={() => handleSelect(opt)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
