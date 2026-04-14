import { useState, useRef, useEffect } from 'react'
import { Spin } from './Spin'
import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps, InteractiveProps, SizableProps } from '../../types'

export interface TimePickerProps extends BaseComponentProps, InteractiveProps, SizableProps {
  value?: string
  defaultValue?: string
  placeholder?: string
  format?: '12h' | '24h'
  onChange?: (value: string) => void
  onBlur?: () => void
}

export function TimePicker({
  value,
  defaultValue,
  placeholder = 'Select time',
  disabled: disabledProp,
  loading,
  size: sizeProp,
  format = '24h',
  onChange,
  onBlur: _onBlur,
  className,
  style,
  unstyled,
}: TimePickerProps) {
  const config = useConfig()
  const size = sizeProp ?? config.size ?? 'middle'
  const disabled = disabledProp ?? config.disabled ?? false

  const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? '')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const currentValue = value ?? internalValue

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const hours = format === '24h'
    ? Array.from({ length: 24 }, (_, i) => i)
    : Array.from({ length: 12 }, (_, i) => i + 1)

  const selectTime = (h: number, m: number) => {
    const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
    setInternalValue(timeStr)
    onChange?.(timeStr)
    setOpen(false)
  }

  const [selectedHour, setSelectedHour] = useState<number | null>(null)

  const wrapperClass = unstyled
    ? className ?? ''
    : ['sg-timepicker', `sg-timepicker-${size}`, loading ? 'sg-timepicker-loading' : '', className]
        .filter(Boolean)
        .join(' ')

  return (
    <div className={wrapperClass} ref={ref} style={style}>
      <div
        className={unstyled ? '' : 'sg-timepicker-input'}
        onClick={() => !disabled && !loading && setOpen(!open)}
      >
        <span className={currentValue ? '' : (unstyled ? '' : 'sg-select-placeholder')}>
          {currentValue || placeholder}
        </span>
        {loading ? <Spin size="small" unstyled={unstyled} /> : <span className={unstyled ? '' : 'sg-timepicker-icon'}>🕐</span>}
      </div>
      {open && (
        <div className={unstyled ? '' : 'sg-timepicker-dropdown'}>
          {selectedHour === null ? (
            <div className={unstyled ? '' : 'sg-timepicker-list'}>
              {hours.map((h) => (
                <div
                  key={h}
                  className={unstyled ? '' : 'sg-timepicker-item'}
                  onClick={() => setSelectedHour(h)}
                >
                  {String(h).padStart(2, '0')}
                </div>
              ))}
            </div>
          ) : (
            <div className={unstyled ? '' : 'sg-timepicker-list'}>
              <div
                className={unstyled ? '' : 'sg-timepicker-back'}
                onClick={() => setSelectedHour(null)}
              >
                ← {String(selectedHour).padStart(2, '0')}:__
              </div>
              {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m) => (
                <div
                  key={m}
                  className={unstyled ? '' : 'sg-timepicker-item'}
                  onClick={() => selectTime(selectedHour, m)}
                >
                  {String(selectedHour).padStart(2, '0')}:{String(m).padStart(2, '0')}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
