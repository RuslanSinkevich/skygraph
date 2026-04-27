import { useState } from 'react'
import { TimePicker } from '@skygraph/react'

/**
 * Controlled TimePicker. The value is a **string** matching the active
 * format — not a Date — which makes it trivial to persist and diff.
 */
export function BasicTimePicker() {
  const [value, setValue] = useState('')
  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <TimePicker value={value} onChange={setValue} />
      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        {value ? `Committed value: "${value}"` : 'No value yet.'}
      </span>
    </div>
  )
}
