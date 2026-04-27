import { useState } from 'react'
import { Switch } from '@skygraph/react'

/**
 * Controlled toggle. `onChange` gives you the next boolean so you can
 * persist it, sync it, or derive UI state from it.
 */
export function BasicSwitch() {
  const [checked, setChecked] = useState(false)
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Switch checked={checked} onChange={setChecked} />
      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        {checked ? 'On' : 'Off'}
      </span>
    </div>
  )
}
