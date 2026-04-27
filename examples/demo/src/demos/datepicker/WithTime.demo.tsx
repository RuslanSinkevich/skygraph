import { DatePicker } from '@skygraph/react'

/**
 * `showTime` adds hour/minute columns (or `{ hourStep, minuteStep }` for
 * coarser steppers). `showNow` exposes a "Now" shortcut in the footer.
 */
export function WithTimeDatePicker() {
  return (
    <>
      <DatePicker
        showTime
        showNow
        format="YYYY-MM-DD HH:mm"
        placeholder="Date + time"
        allowClear
      />
      <DatePicker
        showTime={{ hourStep: 1, minuteStep: 15 }}
        format="YYYY-MM-DD HH:mm"
        placeholder="15-minute step"
        allowClear
      />
    </>
  )
}
