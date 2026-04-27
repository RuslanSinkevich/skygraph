import { TimePicker } from '@skygraph/react'

/**
 * `unstyled` drops every SkyGraph class on the trigger, dropdown, and
 * scroll columns. The combobox role stays — style it however you like.
 */
export function UnstyledTimePicker() {
  return (
    <TimePicker
      unstyled
      defaultValue="11:20:00"
      className="demo-unstyled-input"
      style={{ maxWidth: 320 }}
    />
  )
}
