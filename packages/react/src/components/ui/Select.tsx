import { useState, useRef, useEffect, useId } from 'react'
import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps, InteractiveProps, SizableProps } from '../../types'
import { Spin } from './Spin'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
  loading?: boolean
}

export interface SelectProps extends BaseComponentProps, InteractiveProps, SizableProps {
  options: SelectOption[]
  value?: string | number
  defaultValue?: string | number
  placeholder?: string
  onChange?: (value: string | number) => void
  onBlur?: () => void
}

export function Select({
  value,
  defaultValue,
  options,
  placeholder = 'Select...',
  disabled: disabledProp,
  loading,
  size: sizeProp,
  onChange,
  onBlur,
  className,
  style,
  unstyled,
}: SelectProps) {
  const config = useConfig()
  const size = sizeProp ?? config.size ?? 'middle'
  const disabled = disabledProp ?? config.disabled ?? false

  const [internalValue, setInternalValue] = useState(value ?? defaultValue)
  const [open, setOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)
  const listboxId = useId()
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

  useEffect(() => {
    if (!open) setFocusedIndex(-1)
  }, [open])

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
        style={style}
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
        onBlur={onBlur}
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
    <div className={wrapperClass} ref={ref} style={style} onBlur={onBlur}>
      <div
        className="sg-select-selector"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        tabIndex={disabled || loading ? -1 : 0}
        onClick={() => !disabled && !loading && setOpen(!open)}
        onKeyDown={(e) => {
          if (disabled || loading) return
          switch (e.key) {
            case 'Enter':
            case ' ':
              e.preventDefault()
              if (open && focusedIndex >= 0) {
                handleSelect(options[focusedIndex])
              } else {
                setOpen(!open)
              }
              break
            case 'Escape':
              e.preventDefault()
              setOpen(false)
              break
            case 'ArrowDown':
              e.preventDefault()
              if (!open) setOpen(true)
              else setFocusedIndex((i) => (i + 1) % options.length)
              break
            case 'ArrowUp':
              e.preventDefault()
              if (!open) setOpen(true)
              else
                setFocusedIndex(
                  (i) => (i - 1 + options.length) % options.length,
                )
              break
          }
        }}
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
        <div className="sg-select-dropdown" role="listbox" id={listboxId}>
          {options.map((opt, idx) => (
            <div
              key={opt.value}
              role="option"
              aria-selected={opt.value === currentValue}
              className={[
                'sg-select-option',
                opt.value === currentValue ? 'sg-select-option-selected' : '',
                idx === focusedIndex ? 'sg-select-option-focused' : '',
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
