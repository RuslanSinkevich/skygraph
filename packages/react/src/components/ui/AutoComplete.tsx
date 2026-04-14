import React, { useState, useRef, useEffect } from 'react'
import { Spin } from './Spin'
import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps, InteractiveProps, SizableProps } from '../../types'

export interface AutoCompleteOption {
  label: string
  value: string
}

export interface AutoCompleteProps extends BaseComponentProps, InteractiveProps, SizableProps {
  value?: string
  defaultValue?: string
  options: AutoCompleteOption[]
  placeholder?: string
  onChange?: (value: string) => void
  onSearch?: (query: string) => void
  onSelect?: (value: string, option: AutoCompleteOption) => void
  onBlur?: () => void
}

export function AutoComplete({
  value,
  defaultValue,
  options,
  placeholder,
  disabled: disabledProp,
  loading,
  size: sizeProp,
  onChange,
  onSearch,
  onSelect,
  onBlur,
  className,
  style,
  unstyled,
}: AutoCompleteProps) {
  const config = useConfig()
  const size = sizeProp ?? config.size ?? 'middle'
  const disabled = disabledProp ?? config.disabled ?? false

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
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open && filtered.length > 0}
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
