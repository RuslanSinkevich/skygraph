import { TimePicker } from '@skygraph/react'

/**
 * Disabled blocks the dropdown entirely. Loading shows the inline
 * spinner in place of the clock icon and prevents the dropdown from
 * opening.
 */
export function StatesTimePicker() {
  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <TimePicker disabled defaultValue="10:30:00" />
      <TimePicker loading placeholder="Loading…" />
    </div>
  )
}
