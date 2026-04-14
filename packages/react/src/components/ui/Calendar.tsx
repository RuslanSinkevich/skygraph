import React, { useState, useMemo } from 'react'
import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps, SizableProps } from '../../types'

export interface CalendarProps extends BaseComponentProps, SizableProps {
  value?: Date
  defaultValue?: Date
  mode?: 'month' | 'year'
  onChange?: (date: Date) => void
  onPanelChange?: (date: Date, mode: 'month' | 'year') => void
  fullscreen?: boolean
  disabledDate?: (date: Date) => boolean
  cellRender?: (date: Date, info: { type: 'date' | 'month' }) => React.ReactNode
}

const DEFAULT_MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DEFAULT_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function Calendar({
  value,
  defaultValue,
  mode: modeProp = 'month',
  onChange,
  onPanelChange,
  fullscreen = true,
  disabledDate,
  cellRender,
  className,
  style,
  unstyled,
}: CalendarProps) {
  const config = useConfig()
  const locale = config.locale?.calendar

  const monthNames = locale?.monthNames ?? DEFAULT_MONTH_NAMES
  const dayNames = locale?.dayNames ?? DEFAULT_DAY_NAMES
  const todayLabel = locale?.today ?? 'Today'

  const today = useMemo(() => new Date(), [])
  const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? today)
  const currentValue = value ?? internalValue

  const [mode, setMode] = useState(modeProp)
  const [viewYear, setViewYear] = useState(currentValue.getFullYear())
  const [viewMonth, setViewMonth] = useState(currentValue.getMonth())

  const handleDateSelect = (date: Date) => {
    if (disabledDate?.(date)) return
    setInternalValue(date)
    onChange?.(date)
  }

  const changeMode = (newMode: 'month' | 'year') => {
    setMode(newMode)
    onPanelChange?.(new Date(viewYear, viewMonth), newMode)
  }

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1) }
    else setViewMonth(viewMonth - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1) }
    else setViewMonth(viewMonth + 1)
  }
  const prevYear = () => setViewYear(viewYear - 1)
  const nextYear = () => setViewYear(viewYear + 1)

  const goToday = () => {
    setViewYear(today.getFullYear())
    setViewMonth(today.getMonth())
    handleDateSelect(today)
  }

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDay = new Date(viewYear, viewMonth, 1).getDay()

  const renderMonthView = () => (
    <>
      <div className={unstyled ? '' : 'sg-calendar-weekdays'}>
        {dayNames.map((d) => (
          <div key={d} className={unstyled ? '' : 'sg-calendar-weekday'}>{d}</div>
        ))}
      </div>
      <div className={unstyled ? '' : 'sg-calendar-days'}>
        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`e${i}`} className={unstyled ? '' : 'sg-calendar-day sg-calendar-day-empty'} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1
          const date = new Date(viewYear, viewMonth, day)
          const isSelected = isSameDay(date, currentValue)
          const isToday = isSameDay(date, today)
          const isDisabled = disabledDate?.(date)

          return (
            <div
              key={day}
              className={unstyled ? '' : [
                'sg-calendar-day',
                isSelected ? 'sg-calendar-day-selected' : '',
                isToday ? 'sg-calendar-day-today' : '',
                isDisabled ? 'sg-calendar-day-disabled' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => !isDisabled && handleDateSelect(date)}
            >
              <span className={unstyled ? '' : 'sg-calendar-day-number'}>{day}</span>
              {cellRender?.(date, { type: 'date' })}
            </div>
          )
        })}
      </div>
    </>
  )

  const renderYearView = () => (
    <div className={unstyled ? '' : 'sg-calendar-months'}>
      {monthNames.map((name, i) => {
        const date = new Date(viewYear, i, 1)
        const isSelected = currentValue.getFullYear() === viewYear && currentValue.getMonth() === i
        return (
          <div
            key={i}
            className={unstyled ? '' : [
              'sg-calendar-month',
              isSelected ? 'sg-calendar-month-selected' : '',
            ].filter(Boolean).join(' ')}
            onClick={() => {
              setViewMonth(i)
              changeMode('month')
              handleDateSelect(date)
            }}
          >
            <span>{name}</span>
            {cellRender?.(date, { type: 'month' })}
          </div>
        )
      })}
    </div>
  )

  const wrapperClass = unstyled
    ? className ?? ''
    : [
        'sg-calendar',
        fullscreen ? 'sg-calendar-fullscreen' : 'sg-calendar-card',
        className,
      ].filter(Boolean).join(' ')

  return (
    <div className={wrapperClass} style={style}>
      <div className={unstyled ? '' : 'sg-calendar-header'}>
        <div className={unstyled ? '' : 'sg-calendar-nav'}>
          {mode === 'month' && (
            <>
              <button className={unstyled ? '' : 'sg-calendar-nav-btn'} onClick={prevYear}>&lt;&lt;</button>
              <button className={unstyled ? '' : 'sg-calendar-nav-btn'} onClick={prevMonth}>&lt;</button>
            </>
          )}
          {mode === 'year' && (
            <button className={unstyled ? '' : 'sg-calendar-nav-btn'} onClick={prevYear}>&lt;&lt;</button>
          )}
          <span
            className={unstyled ? '' : 'sg-calendar-header-title'}
            onClick={() => changeMode(mode === 'month' ? 'year' : 'month')}
          >
            {mode === 'month' ? `${monthNames[viewMonth]} ${viewYear}` : `${viewYear}`}
          </span>
          {mode === 'year' && (
            <button className={unstyled ? '' : 'sg-calendar-nav-btn'} onClick={nextYear}>&gt;&gt;</button>
          )}
          {mode === 'month' && (
            <>
              <button className={unstyled ? '' : 'sg-calendar-nav-btn'} onClick={nextMonth}>&gt;</button>
              <button className={unstyled ? '' : 'sg-calendar-nav-btn'} onClick={nextYear}>&gt;&gt;</button>
            </>
          )}
        </div>
        <button className={unstyled ? '' : 'sg-calendar-today-btn'} onClick={goToday}>
          {todayLabel}
        </button>
      </div>
      {mode === 'month' ? renderMonthView() : renderYearView()}
    </div>
  )
}
