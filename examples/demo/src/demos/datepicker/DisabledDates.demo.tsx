import { DatePicker } from '@skygraph/react'

/**
 * `disabledDate` is called for every rendered cell — return `true` to
 * grey-out and block the day. Handy for "no past dates" or "only
 * weekdays" pickers.
 */
export function DisabledDatesDatePicker() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <>
      <DatePicker
        placeholder="No past dates"
        disabledDate={(d) => d.getTime() < today.getTime()}
        allowClear
      />
      <DatePicker
        placeholder="Weekdays only"
        disabledDate={(d) => d.getDay() === 0 || d.getDay() === 6}
        allowClear
      />
    </>
  )
}
