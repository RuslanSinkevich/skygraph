import { useState } from 'react'
import { Input } from '@skygraph/react'

/**
 * Controlled single-line text input. The callback receives the raw
 * string — strip or format it before storing if you need to.
 */
export function BasicInput() {
  const [value, setValue] = useState('')
  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <Input placeholder="Type something…" value={value} onChange={setValue} />
      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        {value.length ? `value: "${value}"` : 'empty'}
      </span>
    </div>
  )
}
