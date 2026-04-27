import { useState } from 'react'
import { RadioGroup } from '@skygraph/react'

/**
 * Controlled radio group. `onChange` gives you the selected value so you
 * can lift it into a store or form state.
 */
export function BasicRadio() {
  const [value, setValue] = useState<string | number>('standard')
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <RadioGroup
        value={value}
        onChange={setValue}
        options={[
          { label: 'Economy', value: 'economy' },
          { label: 'Standard', value: 'standard' },
          { label: 'Premium', value: 'premium' },
        ]}
      />
      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>Selected: {String(value)}</span>
    </div>
  )
}
