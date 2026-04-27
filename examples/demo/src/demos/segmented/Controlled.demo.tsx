import { useState } from 'react'
import { Segmented } from '@skygraph/react'

/**
 * Fully controlled: drive `value` from your own state and mirror
 * the change back through `onChange`. Use this when the
 * selection needs to round-trip through a URL, reducer or form.
 */
export function ControlledSegmented() {
  const [value, setValue] = useState('Map')

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Segmented
        options={['Map', 'Transit', 'Satellite']}
        value={value}
        onChange={setValue}
      />
      <span style={{ color: 'var(--sg-color-text-secondary)' }}>Selected: {value}</span>
    </div>
  )
}
