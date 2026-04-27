import { useState } from 'react'
import { Rate } from '@skygraph/react'

/**
 * Controlled star rating. Clicking the currently-selected star clears
 * the value (toggles back to 0) — a common UX pattern for "undo".
 */
export function BasicRate() {
  const [value, setValue] = useState(3)
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Rate value={value} onChange={setValue} />
      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        value: {value}
      </span>
    </div>
  )
}
