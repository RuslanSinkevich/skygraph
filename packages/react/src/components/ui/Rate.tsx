import React from 'react'
import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps, InteractiveProps } from '../../types'

/** Props for the Rate component. */
export interface RateProps extends BaseComponentProps, InteractiveProps {
  /** Controlled rating value. */
  value?: number
  /** Uncontrolled initial rating. @default 0 */
  defaultValue?: number
  /** Number of rating symbols. @default 5 */
  count?: number
  /** Allows selecting half steps between stars. */
  allowHalf?: boolean
  /** Custom node rendered for each rating symbol. @default '★' */
  character?: React.ReactNode
  /** Called when the rating value changes. */
  onChange?: (value: number) => void
}

/** Star-style rating with hover preview, half steps, and keyboard adjustment. */
export function Rate({
  value,
  defaultValue = 0,
  count = 5,
  disabled: disabledProp,
  allowHalf,
  character = '★',
  onChange,
  className,
  style,
  unstyled,
}: RateProps) {
  const config = useConfig()
  const disabled = disabledProp ?? config.disabled

  const [internalValue, setInternalValue] = React.useState(value ?? defaultValue)
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)
  const currentValue = value ?? internalValue
  const displayValue = hoverValue ?? currentValue

  const handleClick = (starValue: number) => {
    if (disabled) return
    setInternalValue(starValue)
    onChange?.(starValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent, _starIndex: number) => {
    if (disabled) return
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(count, allowHalf ? currentValue + 0.5 : currentValue + 1)
      handleClick(next)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(0, allowHalf ? currentValue - 0.5 : currentValue - 1)
      handleClick(next)
    }
  }

  const wrapperClass = unstyled
    ? className ?? ''
    : ['sg-rate', disabled ? 'sg-rate-disabled' : '', className]
        .filter(Boolean)
        .join(' ')

  return (
    <div className={wrapperClass} style={style} role="radiogroup" aria-label="Rating">
      {Array.from({ length: count }, (_, i) => {
        const starIndex = i + 1
        const isFull = displayValue >= starIndex
        const isHalf = allowHalf && displayValue >= starIndex - 0.5 && displayValue < starIndex

        return (
          <span
            key={i}
            className={
              unstyled
                ? ''
                : [
                    'sg-rate-star',
                    isFull ? 'sg-rate-star-full' : '',
                    isHalf ? 'sg-rate-star-half' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')
            }
            role="radio"
            aria-checked={isFull}
            aria-label={`${starIndex} star${starIndex > 1 ? 's' : ''}`}
            tabIndex={disabled ? -1 : 0}
            onClick={() => handleClick(allowHalf ? starIndex - 0.5 : starIndex)}
            onKeyDown={(e) => handleKeyDown(e, starIndex)}
            onMouseEnter={() => !disabled && setHoverValue(starIndex)}
            onMouseLeave={() => !disabled && setHoverValue(null)}
          >
            {character}
          </span>
        )
      })}
    </div>
  )
}
