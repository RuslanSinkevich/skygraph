import { useState } from 'react'
import { Checkbox } from '@skygraph/react'

/**
 * Controlled checkbox with label. `onChange` receives the new boolean
 * value; the native `accent-color` matches `--sg-color-primary`.
 */
export function BasicCheckbox() {
  const [checked, setChecked] = useState(false)
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Checkbox checked={checked} onChange={setChecked}>
        I agree to the terms
      </Checkbox>
      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        state: {checked ? 'checked' : 'unchecked'}
      </span>
    </div>
  )
}
