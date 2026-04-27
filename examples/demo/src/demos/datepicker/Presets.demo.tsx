import { DatePicker } from '@skygraph/react'
import type { DatePreset } from '@skygraph/react'

const now = new Date()
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

const presets: DatePreset[] = [
  { label: 'Today', value: today },
  {
    label: 'Tomorrow',
    value: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
  },
  {
    label: 'Next Monday',
    value: (() => {
      const d = new Date(today)
      d.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7 || 7))
      return d
    })(),
  },
  {
    label: 'In a month',
    value: new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()),
  },
]

/**
 * `presets` renders a sidebar with named shortcuts — clicking applies
 * the value without leaving the calendar open.
 */
export function PresetsDatePicker() {
  return <DatePicker presets={presets} placeholder="Pick or use a preset" allowClear />
}
