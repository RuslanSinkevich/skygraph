import type React from 'react'

/** Localized labels for month/day names and the “today” action. */
export interface CalendarLocale {
  /** Full month names in order (January–December). */
  monthNames?: string[]
  /** Weekday abbreviations starting Sunday. */
  dayNames?: string[]
  /** Label for the today shortcut button. */
  today?: string
}

/** Values passed to `headerRender` for custom calendar chrome. */
export interface CalendarHeaderInfo {
  /** Date currently shown in the panel (year/month context). */
  value: Date
  /** Whether the panel shows the month grid or year/month picker. */
  type: 'month' | 'year'
  /** Updates the panel date (e.g. month/year selects). */
  onChange: (date: Date) => void
  /** Switches between month and year panel modes. */
  onTypeChange: (type: 'month' | 'year') => void
}

/** Context for `cellRender` describing which cell kind is being rendered. */
export interface CalendarCellInfo {
  /** `date` for day cells, `month` for month tiles in year view. */
  type: 'date' | 'month'
}

/** Props for the month/year calendar with optional custom header and cells. */
export interface CalendarProps {
  /** Controlled selected date. */
  value?: Date
  /** Initial selected date when uncontrolled. */
  defaultValue?: Date
  /** Fired when the selected date changes. */
  onChange?: (date: Date) => void
  /** Fired when the visible panel date or view mode changes. */
  onPanelChange?: (date: Date, mode: 'month' | 'year') => void
  /** Fired when a date is chosen (including month pick in year view). */
  onSelect?: (date: Date) => void
  /** Controlled panel mode: month grid or year/month list. */
  mode?: 'month' | 'year'
  /**
   * Uses full layout including footer “today” when `true`.
   * @default true
   */
  fullscreen?: boolean
  /** Custom header UI; receives navigation state and handlers. */
  headerRender?: (info: CalendarHeaderInfo) => React.ReactNode
  /** Extra content inside day or month cells. */
  cellRender?: (date: Date, info: CalendarCellInfo) => React.ReactNode
  /** Marks dates non-interactive when it returns `true`. */
  disabledDate?: (date: Date) => boolean
  /** Overrides default English month/day names and today label. */
  locale?: CalendarLocale
  /** Root element class name. */
  className?: string
  /** Root element inline styles. */
  style?: React.CSSProperties
  /** Renders semantic structure without Skygraph calendar CSS. */
  unstyled?: boolean
}

export const DEFAULT_MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export const DEFAULT_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
