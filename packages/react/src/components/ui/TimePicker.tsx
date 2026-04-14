import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { Spin } from './Spin'
import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps, InteractiveProps, SizableProps } from '../../types'

// ── Helpers ──

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function formatTime(h: number, m: number, s: number, fmt: string, use12h: boolean): string {
  if (use12h) {
    const period = h >= 12 ? 'PM' : 'AM'
    const h12 = h % 12 || 12
    return fmt
      .replace('hh', pad(h12))
      .replace('mm', pad(m))
      .replace('ss', pad(s))
      .replace('A', period)
  }
  return fmt
    .replace('HH', pad(h))
    .replace('mm', pad(m))
    .replace('ss', pad(s))
}

function parseTime(str: string): { h: number; m: number; s: number } | null {
  if (!str) return null
  const upper = str.toUpperCase()
  const isPM = upper.includes('PM')
  const cleaned = upper.replace(/(AM|PM)/g, '').trim()
  const parts = cleaned.split(':').map(Number)
  if (parts.some(isNaN)) return null

  let h = parts[0] ?? 0
  const m = parts[1] ?? 0
  const s = parts[2] ?? 0

  if (isPM && h < 12) h += 12
  if (!isPM && upper.includes('AM') && h === 12) h = 0

  return { h, m, s }
}

// ── ScrollColumn ──

function ScrollColumn({
  items,
  value,
  disabledItems,
  onChange,
  unstyled,
}: {
  items: number[]
  value: number
  disabledItems?: Set<number>
  onChange: (v: number) => void
  unstyled?: boolean
}) {
  const colRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = colRef.current
    if (!el) return
    const active = el.querySelector('[data-active="true"]') as HTMLElement | null
    if (active?.scrollIntoView) {
      active.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [value])

  return (
    <div ref={colRef} className={unstyled ? '' : 'sg-tp-col'}>
      {items.map((n) => {
        const isDisabled = disabledItems?.has(n) ?? false
        const isActive = n === value
        const cls = unstyled ? '' : [
          'sg-tp-cell',
          isActive ? 'sg-tp-cell-active' : '',
          isDisabled ? 'sg-tp-cell-disabled' : '',
        ].filter(Boolean).join(' ')
        return (
          <div
            key={n}
            data-active={isActive}
            className={cls}
            onClick={() => !isDisabled && onChange(n)}
          >
            {pad(n)}
          </div>
        )
      })}
    </div>
  )
}

// ── Types ──

export interface TimePickerProps extends BaseComponentProps, InteractiveProps, SizableProps {
  value?: string
  defaultValue?: string
  placeholder?: string
  format?: string
  use12Hours?: boolean
  hourStep?: number
  minuteStep?: number
  secondStep?: number
  showSecond?: boolean
  showNow?: boolean
  allowClear?: boolean
  disabledHours?: () => number[]
  disabledMinutes?: (hour: number) => number[]
  disabledSeconds?: (hour: number, minute: number) => number[]
  onChange?: (timeString: string) => void
  onOpenChange?: (open: boolean) => void
  open?: boolean
  inputReadOnly?: boolean
}

export interface TimeRangePickerProps extends BaseComponentProps, InteractiveProps, SizableProps {
  value?: [string, string]
  defaultValue?: [string, string]
  placeholder?: [string, string]
  format?: string
  use12Hours?: boolean
  hourStep?: number
  minuteStep?: number
  secondStep?: number
  showSecond?: boolean
  allowClear?: boolean
  separator?: React.ReactNode
  onChange?: (timeStrings: [string, string]) => void
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

// ═══════════════════════════════════════════════════════
// TimePicker
// ═══════════════════════════════════════════════════════

export function TimePicker({
  value,
  defaultValue,
  placeholder = 'Select time',
  format: formatProp,
  use12Hours = false,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  showSecond = true,
  showNow = true,
  allowClear = true,
  disabledHours,
  disabledMinutes,
  disabledSeconds,
  disabled: disabledProp,
  loading,
  size: sizeProp,
  onChange,
  onOpenChange,
  open: openProp,
  inputReadOnly: _inputReadOnly = false,
  className,
  style,
  unstyled,
}: TimePickerProps) {
  const config = useConfig()
  const size = sizeProp ?? config.size ?? 'middle'
  const disabled = disabledProp ?? config.disabled ?? false

  const fmt = formatProp ?? (use12Hours ? 'hh:mm:ss A' : (showSecond ? 'HH:mm:ss' : 'HH:mm'))

  const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? '')
  const [internalOpen, setInternalOpen] = useState(false)
  const currentValue = value !== undefined ? value : internalValue
  const isOpen = openProp ?? internalOpen

  const parsed = useMemo(() => parseTime(currentValue), [currentValue])
  const [hour, setHour] = useState(parsed?.h ?? 0)
  const [minute, setMinute] = useState(parsed?.m ?? 0)
  const [second, setSecond] = useState(parsed?.s ?? 0)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setInternalOpen(false)
        onOpenChange?.(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [onOpenChange])

  useEffect(() => {
    const p = parseTime(currentValue)
    if (p) {
      setHour(p.h)
      setMinute(p.m)
      setSecond(p.s)
    }
  }, [currentValue])

  const hours = useMemo(() => {
    const arr: number[] = []
    if (use12Hours) {
      for (let i = 1; i <= 12; i += hourStep) arr.push(i)
    } else {
      for (let i = 0; i < 24; i += hourStep) arr.push(i)
    }
    return arr
  }, [hourStep, use12Hours])

  const minutes = useMemo(() => {
    const arr: number[] = []
    for (let i = 0; i < 60; i += minuteStep) arr.push(i)
    return arr
  }, [minuteStep])

  const seconds = useMemo(() => {
    const arr: number[] = []
    for (let i = 0; i < 60; i += secondStep) arr.push(i)
    return arr
  }, [secondStep])

  const disHours = useMemo(() => new Set(disabledHours?.() ?? []), [disabledHours])
  const disMinutes = useMemo(() => new Set(disabledMinutes?.(hour) ?? []), [disabledMinutes, hour])
  const disSecs = useMemo(() => new Set(disabledSeconds?.(hour, minute) ?? []), [disabledSeconds, hour, minute])

  const commitTime = useCallback((h: number, m: number, s: number) => {
    const str = formatTime(h, m, s, fmt, use12Hours)
    setInternalValue(str)
    onChange?.(str)
  }, [fmt, use12Hours, onChange])

  const handleHourChange = (h: number) => {
    const realH = use12Hours ? (h === 12 ? (hour >= 12 ? 12 : 0) : (hour >= 12 ? h + 12 : h)) : h
    setHour(realH)
    commitTime(realH, minute, second)
  }

  const handleMinuteChange = (m: number) => {
    setMinute(m)
    commitTime(hour, m, second)
  }

  const handleSecondChange = (s: number) => {
    setSecond(s)
    commitTime(hour, minute, s)
  }

  const handleNow = () => {
    const now = new Date()
    const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds()
    setHour(h)
    setMinute(m)
    setSecond(s)
    commitTime(h, m, s)
    setInternalOpen(false)
    onOpenChange?.(false)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setInternalValue('')
    onChange?.('')
  }

  const openDropdown = () => {
    if (disabled || loading) return
    setInternalOpen(true)
    onOpenChange?.(true)
  }

  const displayHour = use12Hours ? (hour % 12 || 12) : hour

  const wrapperCls = unstyled ? className ?? '' : [
    'sg-timepicker',
    `sg-timepicker-${size}`,
    isOpen ? 'sg-timepicker-open' : '',
    disabled ? 'sg-timepicker-disabled' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={wrapperCls} ref={ref} style={style}>
      <div
        className={unstyled ? '' : 'sg-timepicker-input'}
        onClick={openDropdown}
        role="combobox"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-disabled={disabled}
      >
        <span className={currentValue ? '' : (unstyled ? '' : 'sg-timepicker-placeholder')}>
          {currentValue || placeholder}
        </span>
        <span className={unstyled ? '' : 'sg-timepicker-suffix'}>
          {loading ? (
            <Spin size="small" unstyled={unstyled} />
          ) : (
            <>
              {allowClear && currentValue && (
                <span className={unstyled ? '' : 'sg-timepicker-clear'} onClick={handleClear}>&times;</span>
              )}
              <svg className={unstyled ? '' : 'sg-timepicker-icon-svg'} viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                <path d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 1a7 7 0 100 14A7 7 0 008 1zm.5 3v4.5l3 1.5-.5 1-3.5-1.75V4h1z"/>
              </svg>
            </>
          )}
        </span>
      </div>

      {isOpen && (
        <div className={unstyled ? '' : 'sg-tp-dropdown'}>
          <div className={unstyled ? '' : 'sg-tp-columns'}>
            <ScrollColumn
              items={hours}
              value={displayHour}
              disabledItems={disHours}
              onChange={handleHourChange}
              unstyled={unstyled}
            />
            <ScrollColumn
              items={minutes}
              value={minute}
              disabledItems={disMinutes}
              onChange={handleMinuteChange}
              unstyled={unstyled}
            />
            {showSecond && (
              <ScrollColumn
                items={seconds}
                value={second}
                disabledItems={disSecs}
                onChange={handleSecondChange}
                unstyled={unstyled}
              />
            )}
            {use12Hours && (
              <div className={unstyled ? '' : 'sg-tp-col sg-tp-col-ampm'}>
                <div
                  className={unstyled ? '' : `sg-tp-cell${hour < 12 ? ' sg-tp-cell-active' : ''}`}
                  onClick={() => { if (hour >= 12) { const h = hour - 12; setHour(h); commitTime(h, minute, second) } }}
                >
                  AM
                </div>
                <div
                  className={unstyled ? '' : `sg-tp-cell${hour >= 12 ? ' sg-tp-cell-active' : ''}`}
                  onClick={() => { if (hour < 12) { const h = hour + 12; setHour(h); commitTime(h, minute, second) } }}
                >
                  PM
                </div>
              </div>
            )}
          </div>
          {showNow && (
            <div className={unstyled ? '' : 'sg-tp-footer'}>
              <button className={unstyled ? '' : 'sg-tp-now-btn'} onClick={handleNow}>Now</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Attach TimeRangePicker for Ant-like API: TimePicker.RangePicker
export function TimeRangePicker({
  value,
  defaultValue,
  placeholder = ['Start', 'End'],
  format: formatProp,
  use12Hours = false,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  showSecond = true,
  allowClear = true,
  separator = '→',
  disabled: disabledProp,
  loading,
  size: sizeProp,
  onChange,
  onOpenChange,
  open: openProp,
  className,
  style,
  unstyled,
}: TimeRangePickerProps) {
  const config = useConfig()
  const size = sizeProp ?? config.size ?? 'middle'
  const disabled = disabledProp ?? config.disabled ?? false

  const fmt = formatProp ?? (use12Hours ? 'hh:mm:ss A' : (showSecond ? 'HH:mm:ss' : 'HH:mm'))

  const [internalValue, setInternalValue] = useState<[string, string]>(value ?? defaultValue ?? ['', ''])
  const [internalOpen, setInternalOpen] = useState(false)
  const currentValue = value ?? internalValue
  const isOpen = openProp ?? internalOpen

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setInternalOpen(false)
        onOpenChange?.(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [onOpenChange])

  const handleStartChange = (v: string) => {
    const next: [string, string] = [v, currentValue[1]]
    setInternalValue(next)
    onChange?.(next)
  }

  const handleEndChange = (v: string) => {
    const next: [string, string] = [currentValue[0], v]
    setInternalValue(next)
    onChange?.(next)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    const next: [string, string] = ['', '']
    setInternalValue(next)
    onChange?.(next)
  }

  const openDropdown = () => {
    if (disabled || loading) return
    setInternalOpen(true)
    onOpenChange?.(true)
  }

  const wrapperCls = unstyled ? className ?? '' : [
    'sg-timepicker', 'sg-timepicker-range',
    `sg-timepicker-${size}`,
    isOpen ? 'sg-timepicker-open' : '',
    disabled ? 'sg-timepicker-disabled' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={wrapperCls} ref={ref} style={style}>
      <div className={unstyled ? '' : 'sg-timepicker-input sg-timepicker-range-input'} onClick={openDropdown}>
        <span>{currentValue[0] || placeholder[0]}</span>
        <span className={unstyled ? '' : 'sg-timepicker-separator'}>{separator}</span>
        <span>{currentValue[1] || placeholder[1]}</span>
        <span className={unstyled ? '' : 'sg-timepicker-suffix'}>
          {allowClear && (currentValue[0] || currentValue[1]) && (
            <span className={unstyled ? '' : 'sg-timepicker-clear'} onClick={handleClear}>&times;</span>
          )}
        </span>
      </div>

      {isOpen && (
        <div className={unstyled ? '' : 'sg-tp-dropdown sg-tp-dropdown-range'}>
          <div className={unstyled ? '' : 'sg-tp-range-panels'}>
            <TimePicker
              value={currentValue[0]}
              onChange={handleStartChange}
              format={fmt}
              use12Hours={use12Hours}
              hourStep={hourStep}
              minuteStep={minuteStep}
              secondStep={secondStep}
              showSecond={showSecond}
              showNow={false}
              open={true}
              unstyled={unstyled}
            />
            <TimePicker
              value={currentValue[1]}
              onChange={handleEndChange}
              format={fmt}
              use12Hours={use12Hours}
              hourStep={hourStep}
              minuteStep={minuteStep}
              secondStep={secondStep}
              showSecond={showSecond}
              showNow={false}
              open={true}
              unstyled={unstyled}
            />
          </div>
        </div>
      )}
    </div>
  )
}

;(TimePicker as unknown as { RangePicker: typeof TimeRangePicker }).RangePicker = TimeRangePicker
