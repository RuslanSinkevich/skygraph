import { RangePicker } from '@skygraph/react'
import type { DatePreset } from '@skygraph/react'

const today = new Date()
today.setHours(0, 0, 0, 0)

const offsetDays = (base: Date, diff: number): Date => {
  const d = new Date(base)
  d.setDate(base.getDate() + diff)
  return d
}

const startOfMonth = (base: Date): Date =>
  new Date(base.getFullYear(), base.getMonth(), 1)

const presets: DatePreset[] = [
  { label: 'Last 7 days', value: [offsetDays(today, -6), today] },
  { label: 'Last 30 days', value: [offsetDays(today, -29), today] },
  { label: 'This month', value: [startOfMonth(today), today] },
  {
    label: 'This quarter',
    value: [
      new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1),
      today,
    ],
  },
]

/** Presets work for ranges too — tuple values fill both ends at once. */
export function RangePresetsDatePicker() {
  return <RangePicker presets={presets} placeholder={['Start', 'End']} allowClear />
}
