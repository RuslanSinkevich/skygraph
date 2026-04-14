import { useState, useRef, useEffect } from 'react'
import { Spin } from './Spin'
import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps, InteractiveProps, SizableProps } from '../../types'

export interface DatePickerProps extends BaseComponentProps, InteractiveProps, SizableProps {
  value?: string
  defaultValue?: string
  placeholder?: string
  onChange?: (value: string) => void
  onBlur?: () => void
}

export function DatePicker({
  value,
  defaultValue,
  placeholder = 'Select date',
  disabled: disabledProp,
  loading,
  size: sizeProp,
  onChange,
  onBlur: _onBlur,
  className,
  style,
  unstyled,
}: DatePickerProps) {
  const config = useConfig()
  const size = sizeProp ?? config.size ?? 'middle'
  const disabled = disabledProp ?? config.disabled ?? false

  const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? '')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const currentValue = value ?? internalValue

  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const monthName = new Date(viewYear, viewMonth).toLocaleString('default', { month: 'long' })

  const selectDate = (day: number) => {
    const m = String(viewMonth + 1).padStart(2, '0')
    const d = String(day).padStart(2, '0')
    const dateStr = `${viewYear}-${m}-${d}`
    setInternalValue(dateStr)
    onChange?.(dateStr)
    setOpen(false)
  }

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1) }
    else setViewMonth(viewMonth - 1)
  }

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1) }
    else setViewMonth(viewMonth + 1)
  }

  const wrapperClass = unstyled
    ? className ?? ''
    : ['sg-datepicker', `sg-datepicker-${size}`, loading ? 'sg-datepicker-loading' : '', className]
        .filter(Boolean)
        .join(' ')

  return (
    <div className={wrapperClass} ref={ref} style={style}>
      <div
        className={unstyled ? '' : 'sg-datepicker-input'}
        onClick={() => !disabled && !loading && setOpen(!open)}
      >
        <span className={currentValue ? '' : (unstyled ? '' : 'sg-select-placeholder')}>
          {currentValue || placeholder}
        </span>
        {loading ? <Spin size="small" unstyled={unstyled} /> : <span className={unstyled ? '' : 'sg-datepicker-icon'}>📅</span>}
      </div>
      {open && (
        <div className={unstyled ? '' : 'sg-datepicker-dropdown'}>
          <div className={unstyled ? '' : 'sg-datepicker-header'}>
            <button className={unstyled ? '' : 'sg-datepicker-nav'} onClick={prevMonth}>&lt;</button>
            <span className={unstyled ? '' : 'sg-datepicker-title'}>{monthName} {viewYear}</span>
            <button className={unstyled ? '' : 'sg-datepicker-nav'} onClick={nextMonth}>&gt;</button>
          </div>
          <div className={unstyled ? '' : 'sg-datepicker-weekdays'}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <span key={d} className={unstyled ? '' : 'sg-datepicker-weekday'}>{d}</span>
            ))}
          </div>
          <div className={unstyled ? '' : 'sg-datepicker-days'}>
            {Array.from({ length: firstDay }, (_, i) => (
              <span key={`e${i}`} className={unstyled ? '' : 'sg-datepicker-day sg-datepicker-day-empty'} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const m = String(viewMonth + 1).padStart(2, '0')
              const d = String(day).padStart(2, '0')
              const dateStr = `${viewYear}-${m}-${d}`
              const isSelected = dateStr === currentValue
              const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear()

              return (
                <span
                  key={day}
                  className={
                    unstyled
                      ? ''
                      : [
                          'sg-datepicker-day',
                          isSelected ? 'sg-datepicker-day-selected' : '',
                          isToday ? 'sg-datepicker-day-today' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')
                  }
                  onClick={() => selectDate(day)}
                >
                  {day}
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
