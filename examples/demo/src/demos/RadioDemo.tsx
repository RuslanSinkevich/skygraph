import { useState } from 'react'
import { RadioGroup } from '@skygraph/react'

export function RadioDemo() {
  const [value, setValue] = useState<string | number>('a')

  return (
    <section>
      <h2>Radio</h2>
      <RadioGroup
        value={value}
        onChange={setValue}
        options={[
          { label: 'Option A', value: 'a' },
          { label: 'Option B', value: 'b' },
          { label: 'Option C', value: 'c' },
          { label: 'Disabled', value: 'd', disabled: true },
        ]}
      />
      <p style={{ marginTop: 8, color: 'var(--sg-color-text-secondary)' }}>Selected: {String(value)}</p>

      <h3>Loading</h3>
      <RadioGroup
        loading
        value="a"
        options={[
          { label: 'Option A', value: 'a' },
          { label: 'Option B', value: 'b' },
        ]}
      />
    </section>
  )
}
