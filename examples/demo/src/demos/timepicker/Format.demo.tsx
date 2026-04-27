import { TimePicker } from '@skygraph/react'

/**
 * `format` decides both the displayed string and the shape of
 * `onChange`. Use `HH` for 24h hours, `hh` + `A` for 12h + AM/PM.
 * Omit `ss` to hide the seconds column automatically.
 */
export function FormatTimePicker() {
  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <TimePicker defaultValue="09:00:00" format="HH:mm:ss" placeholder="24h + seconds" />
      <TimePicker defaultValue="13:45" format="HH:mm" showSecond={false} placeholder="24h no seconds" />
      <TimePicker defaultValue="03:30:15 PM" format="hh:mm:ss A" use12Hours placeholder="12h + AM/PM" />
    </div>
  )
}
