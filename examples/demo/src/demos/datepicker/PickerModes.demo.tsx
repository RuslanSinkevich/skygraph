import { DatePicker } from '@skygraph/react'

/**
 * `picker` changes the grid granularity: full calendar, months in a
 * year, years in a decade, or ISO week numbers.
 */
export function PickerModesDatePicker() {
  return (
    <>
      <DatePicker picker="date" placeholder="Date" allowClear />
      <DatePicker picker="month" format="YYYY-MM" placeholder="Month" allowClear />
      <DatePicker picker="year" format="YYYY" placeholder="Year" allowClear />
      <DatePicker picker="week" placeholder="Week" allowClear />
    </>
  )
}
