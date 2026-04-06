import React from 'react'

export interface RateProps {
  value?: number
  defaultValue?: number
  count?: number
  disabled?: boolean
  allowHalf?: boolean
  character?: React.ReactNode
  onChange?: (value: number) => void
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}

export function Rate({
  value,
  defaultValue = 0,
  count = 5,
  disabled,
  allowHalf,
  character = '★',
  onChange,
  className,
  style,
  unstyled,
}: RateProps) {
  const [internalValue, setInternalValue] = React.useState(value ?? defaultValue)
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)
  const currentValue = value ?? internalValue
  const displayValue = hoverValue ?? currentValue

  const handleClick = (starValue: number) => {
    if (disabled) return
    setInternalValue(starValue)
    onChange?.(starValue)
  }

  const wrapperClass = unstyled
    ? className ?? ''
    : ['sg-rate', disabled ? 'sg-rate-disabled' : '', className]
        .filter(Boolean)
        .join(' ')

  return (
    <div className={wrapperClass} style={style}>
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
            onClick={() => handleClick(allowHalf ? starIndex - 0.5 : starIndex)}
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
