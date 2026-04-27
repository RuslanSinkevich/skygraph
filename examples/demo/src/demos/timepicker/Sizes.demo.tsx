import { TimePicker } from '@skygraph/react'

/**
 * Three sizes match Input / Select / DatePicker heights.
 */
export function SizesTimePicker() {
  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <TimePicker size="small" placeholder="small" format="HH:mm" showSecond={false} />
      <TimePicker placeholder="middle (default)" format="HH:mm" showSecond={false} />
      <TimePicker size="large" placeholder="large" format="HH:mm" showSecond={false} />
    </div>
  )
}
