import React, { useState } from 'react'

export type SegmentedOption =
  | string
  | { label: React.ReactNode; value: string; icon?: React.ReactNode; disabled?: boolean }

export interface SegmentedProps {
  options: SegmentedOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  block?: boolean
  size?: 'small' | 'middle' | 'large'
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}

function normalizeOption(opt: SegmentedOption) {
  if (typeof opt === 'string') return { label: opt, value: opt }
  return opt
}

export function Segmented({
  options,
  value,
  defaultValue,
  onChange,
  block,
  size = 'middle',
  disabled,
  className,
  style,
  unstyled,
}: SegmentedProps) {
  const normalized = options.map(normalizeOption)
  const [internalValue, setInternalValue] = useState(
    value ?? defaultValue ?? normalized[0]?.value ?? ''
  )
  const currentValue = value ?? internalValue

  const handleSelect = (val: string, optDisabled?: boolean) => {
    if (disabled || optDisabled) return
    setInternalValue(val)
    onChange?.(val)
  }

  if (unstyled) {
    return (
      <div className={className} style={style} role="radiogroup">
        {normalized.map((opt) => (
          <label key={opt.value}>
            <input
              type="radio"
              name="sg-segmented"
              value={opt.value}
              checked={opt.value === currentValue}
              disabled={disabled || opt.disabled}
              onChange={() => handleSelect(opt.value, opt.disabled)}
            />
            {opt.icon}
            {opt.label}
          </label>
        ))}
      </div>
    )
  }

  return (
    <div
      className={[
        'sg-segmented',
        `sg-segmented-${size}`,
        block ? 'sg-segmented-block' : '',
        disabled ? 'sg-segmented-disabled' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={style}
      role="radiogroup"
    >
      {normalized.map((opt) => (
        <div
          key={opt.value}
          role="radio"
          aria-checked={opt.value === currentValue}
          className={[
            'sg-segmented-item',
            opt.value === currentValue ? 'sg-segmented-item-selected' : '',
            opt.disabled ? 'sg-segmented-item-disabled' : '',
          ].filter(Boolean).join(' ')}
          onClick={() => handleSelect(opt.value, opt.disabled)}
        >
          {opt.icon && <span className="sg-segmented-item-icon">{opt.icon}</span>}
          <span className="sg-segmented-item-label">{opt.label}</span>
        </div>
      ))}
    </div>
  )
}
