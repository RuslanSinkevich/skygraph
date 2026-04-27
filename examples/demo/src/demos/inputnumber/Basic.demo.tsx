import { useState } from 'react'
import { InputNumber } from '@skygraph/react'

/**
 * Controlled numeric input with a live readout. Clearing the field
 * commits `null`, so make sure your state type accepts it.
 */
export function BasicInputNumber() {
  const [value, setValue] = useState<number | null>(3)
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <InputNumber value={value ?? undefined} onChange={setValue} />
      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        value: {value === null ? 'null' : value}
      </span>
    </div>
  )
}
