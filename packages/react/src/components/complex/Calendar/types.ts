import type React from 'react'

export interface CalendarLocale {
  monthNames?: string[]
  dayNames?: string[]
  today?: string
}

export interface CalendarHeaderInfo {
  value: Date
  type: 'month' | 'year'
  onChange: (date: Date) => void
  onTypeChange: (type: 'month' | 'year') => void
}

export interface CalendarCellInfo {
  type: 'date' | 'month'
}

export interface CalendarProps {
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date) => void
  onPanelChange?: (date: Date, mode: 'month' | 'year') => void
  onSelect?: (date: Date) => void
  mode?: 'month' | 'year'
  fullscreen?: boolean
  headerRender?: (info: CalendarHeaderInfo) => React.ReactNode
  cellRender?: (date: Date, info: CalendarCellInfo) => React.ReactNode
  disabledDate?: (date: Date) => boolean
  locale?: CalendarLocale
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}

export const DEFAULT_MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export const DEFAULT_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
