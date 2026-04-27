import { Calendar } from '@skygraph/react'

/**
 * `showWeekNumber` adds an ISO week column. `weekStartDay` rotates the
 * columns so the week starts on Monday (1), Saturday (6), etc.
 */
export function WeekNumbersCalendar() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Calendar fullscreen={false} showWeekNumber weekStartDay={1} />
    </div>
  )
}
