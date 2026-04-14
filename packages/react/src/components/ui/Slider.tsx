import React, { useRef, useCallback } from 'react'
import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps, InteractiveProps } from '../../types'

export interface SliderProps extends BaseComponentProps, InteractiveProps {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
}

export function Slider({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled: disabledProp,
  onChange,
  className,
  style,
  unstyled,
}: SliderProps) {
  const config = useConfig()
  const disabled = disabledProp ?? config.disabled

  const [internalValue, setInternalValue] = React.useState(value ?? defaultValue)
  const currentValue = value ?? internalValue
  const trackRef = useRef<HTMLDivElement>(null)

  const percent = ((currentValue - min) / (max - min)) * 100

  const updateFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current || disabled) return
      const rect = trackRef.current.getBoundingClientRect()
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      const raw = min + ratio * (max - min)
      const stepped = Math.round(raw / step) * step
      const clamped = Math.max(min, Math.min(max, stepped))
      setInternalValue(clamped)
      onChange?.(clamped)
    },
    [min, max, step, disabled, onChange],
  )

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return
    updateFromPosition(e.clientX)

    const handleMove = (ev: MouseEvent) => updateFromPosition(ev.clientX)
    const handleUp = () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleUp)
    }
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleUp)
  }

  const wrapperClass = unstyled
    ? className ?? ''
    : ['sg-slider', disabled ? 'sg-slider-disabled' : '', className]
        .filter(Boolean)
        .join(' ')

  return (
    <div className={wrapperClass} style={style}>
      <div
        className={unstyled ? '' : 'sg-slider-track'}
        ref={trackRef}
        onMouseDown={handleMouseDown}
      >
        <div
          className={unstyled ? '' : 'sg-slider-fill'}
          style={{ width: `${percent}%` }}
        />
        <div
          className={unstyled ? '' : 'sg-slider-handle'}
          style={{ left: `${percent}%` }}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (disabled) return
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
              e.preventDefault()
              const next = Math.min(max, currentValue + step)
              setInternalValue(next)
              onChange?.(next)
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
              e.preventDefault()
              const next = Math.max(min, currentValue - step)
              setInternalValue(next)
              onChange?.(next)
            }
          }}
        />
      </div>
    </div>
  )
}
