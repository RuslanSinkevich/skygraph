import { DatePicker } from '@skygraph/react'

/** Three sizes — match the surrounding form density. */
export function SizesDatePicker() {
  return (
    <>
      <DatePicker size="small" placeholder="Small" allowClear />
      <DatePicker placeholder="Default" allowClear />
      <DatePicker size="large" placeholder="Large" allowClear />
    </>
  )
}
