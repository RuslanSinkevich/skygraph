import { Calendar } from '@skygraph/react'

/**
 * `disabledDate` returns `true` for non-interactive cells. Classic case:
 * gray out weekends + past days for booking flows.
 */
export function DisabledDatesCalendar() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <div style={{ maxWidth: 320 }}>
      <Calendar
        fullscreen={false}
        disabledDate={(d) => d < today || d.getDay() === 0 || d.getDay() === 6}
      />
    </div>
  )
}
