import { useState, useEffect, useMemo, useCallback } from 'react'
import type { CalendarProps } from './types'
import { DEFAULT_MONTH_NAMES, DEFAULT_DAY_NAMES } from './types'

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
}

function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

interface DayCell {
  date: Date
  day: number
  inMonth: boolean
}

function getMonthGrid(year: number, month: number): DayCell[][] {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const prevMonthDays = getDaysInMonth(year, month - 1)

  const cells: DayCell[] = []

  for (let i = firstDay - 1; i >= 0; i--) {
    const day = prevMonthDays - i
    cells.push({
      date: new Date(year, month - 1, day),
      day,
      inMonth: false,
    })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      date: new Date(year, month, day),
      day,
      inMonth: true,
    })
  }

  const remaining = 42 - cells.length
  for (let day = 1; day <= remaining; day++) {
    cells.push({
      date: new Date(year, month + 1, day),
      day,
      inMonth: false,
    })
  }

  const weeks: DayCell[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }
  return weeks
}

export function Calendar(props: CalendarProps) {
  const {
    value: controlledValue,
    defaultValue,
    onChange,
    onPanelChange,
    onSelect,
    mode: controlledMode,
    fullscreen = true,
    headerRender,
    cellRender,
    disabledDate,
    locale,
    className,
    style,
    unstyled,
  } = props

  const monthNames = locale?.monthNames ?? DEFAULT_MONTH_NAMES
  const dayNames = locale?.dayNames ?? DEFAULT_DAY_NAMES
  const todayLabel = locale?.today ?? 'Today'

  const [internalValue, setInternalValue] = useState<Date>(
    () => controlledValue ?? defaultValue ?? new Date(),
  )
  const [internalMode, setInternalMode] = useState<'month' | 'year'>(controlledMode ?? 'month')

  const [panelDate, setPanelDate] = useState<Date>(
    () => controlledValue ?? defaultValue ?? new Date(),
  )

  const currentValue = controlledValue ?? internalValue
  const currentMode = controlledMode ?? internalMode

  useEffect(() => {
    if (controlledValue) {
      setInternalValue(controlledValue)
      setPanelDate(controlledValue)
    }
  }, [controlledValue])

  useEffect(() => {
    if (controlledMode !== undefined) {
      setInternalMode(controlledMode)
    }
  }, [controlledMode])

  const panelYear = panelDate.getFullYear()
  const panelMonth = panelDate.getMonth()

  const weeks = useMemo(
    () => getMonthGrid(panelYear, panelMonth),
    [panelYear, panelMonth],
  )

  const handleDateSelect = useCallback((date: Date) => {
    if (disabledDate?.(date)) return
    setInternalValue(date)
    setPanelDate(date)
    onSelect?.(date)
    onChange?.(date)
  }, [disabledDate, onSelect, onChange])

  const handleMonthSelect = useCallback((month: number) => {
    const newDate = new Date(panelYear, month, 1)
    setPanelDate(newDate)
    setInternalValue(newDate)
    onSelect?.(newDate)
    onChange?.(newDate)
    setInternalMode('month')
    onPanelChange?.(newDate, 'month')
  }, [panelYear, onSelect, onChange, onPanelChange])

  const handlePrevMonth = useCallback(() => {
    const d = new Date(panelYear, panelMonth - 1, 1)
    setPanelDate(d)
    onPanelChange?.(d, currentMode)
  }, [panelYear, panelMonth, currentMode, onPanelChange])

  const handleNextMonth = useCallback(() => {
    const d = new Date(panelYear, panelMonth + 1, 1)
    setPanelDate(d)
    onPanelChange?.(d, currentMode)
  }, [panelYear, panelMonth, currentMode, onPanelChange])

  const handlePrevYear = useCallback(() => {
    const d = new Date(panelYear - 1, panelMonth, 1)
    setPanelDate(d)
    onPanelChange?.(d, currentMode)
  }, [panelYear, panelMonth, currentMode, onPanelChange])

  const handleNextYear = useCallback(() => {
    const d = new Date(panelYear + 1, panelMonth, 1)
    setPanelDate(d)
    onPanelChange?.(d, currentMode)
  }, [panelYear, panelMonth, currentMode, onPanelChange])

  const handleModeChange = useCallback((mode: 'month' | 'year') => {
    setInternalMode(mode)
    onPanelChange?.(panelDate, mode)
  }, [panelDate, onPanelChange])

  const handlePanelDateChange = useCallback((date: Date) => {
    setPanelDate(date)
    onPanelChange?.(date, currentMode)
  }, [currentMode, onPanelChange])

  const handleToday = useCallback(() => {
    const today = new Date()
    handleDateSelect(today)
  }, [handleDateSelect])

  // Year selector options: 10 years around current
  const yearOptions = useMemo(() => {
    const years: number[] = []
    for (let y = panelYear - 10; y <= panelYear + 10; y++) {
      years.push(y)
    }
    return years
  }, [panelYear])

  // Unstyled render
  if (unstyled) {
    return (
      <div className={className} style={style}>
        {headerRender ? (
          headerRender({
            value: panelDate,
            type: currentMode,
            onChange: handlePanelDateChange,
            onTypeChange: handleModeChange,
          })
        ) : (
          <div>
            <button onClick={handlePrevYear}>&laquo;</button>
            {currentMode === 'month' && <button onClick={handlePrevMonth}>&lsaquo;</button>}
            <span>{monthNames[panelMonth]} {panelYear}</span>
            {currentMode === 'month' && <button onClick={handleNextMonth}>&rsaquo;</button>}
            <button onClick={handleNextYear}>&raquo;</button>
            <button onClick={() => handleModeChange(currentMode === 'month' ? 'year' : 'month')}>
              {currentMode === 'month' ? 'Year' : 'Month'}
            </button>
          </div>
        )}

        {currentMode === 'month' ? (
          <table>
            <thead>
              <tr>{dayNames.map((d) => <th key={d}>{d}</th>)}</tr>
            </thead>
            <tbody>
              {weeks.map((week, wi) => (
                <tr key={wi}>
                  {week.map((cell) => (
                    <td
                      key={cell.date.toISOString()}
                      onClick={() => handleDateSelect(cell.date)}
                    >
                      {cell.day}
                      {cellRender?.(cell.date, { type: 'date' })}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            {monthNames.map((name, i) => (
              <div key={i} onClick={() => handleMonthSelect(i)}>
                {name}
                {cellRender?.(new Date(panelYear, i, 1), { type: 'month' })}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Styled render
  const wrapperCls = [
    'sg-calendar',
    fullscreen ? 'sg-calendar-fullscreen' : 'sg-calendar-mini',
    className,
  ].filter(Boolean).join(' ')

  const renderHeader = () => {
    if (headerRender) {
      return headerRender({
        value: panelDate,
        type: currentMode,
        onChange: handlePanelDateChange,
        onTypeChange: handleModeChange,
      })
    }

    return (
      <div className="sg-calendar-header">
        <div className="sg-calendar-header-left">
          <button
            className="sg-calendar-nav-btn"
            onClick={handlePrevYear}
            title="Previous year"
          >
            &laquo;
          </button>
          {currentMode === 'month' && (
            <button
              className="sg-calendar-nav-btn"
              onClick={handlePrevMonth}
              title="Previous month"
            >
              &lsaquo;
            </button>
          )}
        </div>

        <div className="sg-calendar-header-center">
          <select
            className="sg-calendar-month-select"
            value={panelMonth}
            onChange={(e) => {
              const d = new Date(panelYear, Number(e.target.value), 1)
              setPanelDate(d)
              onPanelChange?.(d, currentMode)
            }}
          >
            {monthNames.map((name, i) => (
              <option key={i} value={i}>{name}</option>
            ))}
          </select>

          <select
            className="sg-calendar-year-select"
            value={panelYear}
            onChange={(e) => {
              const d = new Date(Number(e.target.value), panelMonth, 1)
              setPanelDate(d)
              onPanelChange?.(d, currentMode)
            }}
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <div className="sg-calendar-mode-switch">
            <button
              className={`sg-calendar-mode-btn ${currentMode === 'month' ? 'sg-calendar-mode-btn-active' : ''}`}
              onClick={() => handleModeChange('month')}
            >
              Month
            </button>
            <button
              className={`sg-calendar-mode-btn ${currentMode === 'year' ? 'sg-calendar-mode-btn-active' : ''}`}
              onClick={() => handleModeChange('year')}
            >
              Year
            </button>
          </div>
        </div>

        <div className="sg-calendar-header-right">
          {currentMode === 'month' && (
            <button
              className="sg-calendar-nav-btn"
              onClick={handleNextMonth}
              title="Next month"
            >
              &rsaquo;
            </button>
          )}
          <button
            className="sg-calendar-nav-btn"
            onClick={handleNextYear}
            title="Next year"
          >
            &raquo;
          </button>
        </div>
      </div>
    )
  }

  const renderMonthView = () => (
    <table className="sg-calendar-table">
      <thead>
        <tr>
          {dayNames.map((d) => (
            <th key={d} className="sg-calendar-day-header">{d}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeks.map((week, wi) => (
          <tr key={wi} className="sg-calendar-week-row">
            {week.map((cell) => {
              const isDisabled = disabledDate?.(cell.date)
              const isSelected = isSameDay(cell.date, currentValue)
              const isTodayCell = isToday(cell.date)

              const cellCls = [
                'sg-calendar-cell',
                cell.inMonth ? '' : 'sg-calendar-cell-outside',
                isSelected ? 'sg-calendar-cell-selected' : '',
                isTodayCell ? 'sg-calendar-cell-today' : '',
                isDisabled ? 'sg-calendar-cell-disabled' : '',
              ].filter(Boolean).join(' ')

              return (
                <td
                  key={cell.date.toISOString()}
                  className={cellCls}
                  onClick={() => !isDisabled && handleDateSelect(cell.date)}
                >
                  <div className="sg-calendar-cell-inner">
                    <span className="sg-calendar-cell-date">{cell.day}</span>
                    {cellRender && (
                      <div className="sg-calendar-cell-content">
                        {cellRender(cell.date, { type: 'date' })}
                      </div>
                    )}
                  </div>
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )

  const renderYearView = () => (
    <div className="sg-calendar-month-grid">
      {monthNames.map((name, i) => {
        const monthDate = new Date(panelYear, i, 1)
        const isCurrentMonth = isSameMonth(monthDate, currentValue)
        const isThisMonth = isSameMonth(monthDate, new Date())

        const cellCls = [
          'sg-calendar-month-cell',
          isCurrentMonth ? 'sg-calendar-month-cell-selected' : '',
          isThisMonth ? 'sg-calendar-month-cell-current' : '',
        ].filter(Boolean).join(' ')

        return (
          <div
            key={i}
            className={cellCls}
            onClick={() => handleMonthSelect(i)}
          >
            <div className="sg-calendar-month-cell-inner">
              <span className="sg-calendar-month-cell-name">{name}</span>
              {cellRender && (
                <div className="sg-calendar-month-cell-content">
                  {cellRender(monthDate, { type: 'month' })}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )

  return (
    <div className={wrapperCls} style={style}>
      {renderHeader()}
      <div className="sg-calendar-body">
        {currentMode === 'month' ? renderMonthView() : renderYearView()}
      </div>
      {fullscreen && (
        <div className="sg-calendar-footer">
          <button className="sg-calendar-today-btn" onClick={handleToday}>
            {todayLabel}
          </button>
        </div>
      )}
    </div>
  )
}
