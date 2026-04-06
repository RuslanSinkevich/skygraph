import { useState } from 'react'
import { Select } from '@skygraph/react'

export function SelectDemo() {
  const [val, setVal] = useState<string | number>('')

  return (
    <section>
      <h2>Select</h2>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Select
          placeholder="Choose city"
          value={val}
          onChange={setVal}
          options={[
            { label: 'Moscow', value: 'moscow' },
            { label: 'Berlin', value: 'berlin' },
            { label: 'Tokyo', value: 'tokyo' },
            { label: 'Disabled', value: 'x', disabled: true },
          ]}
        />
        <Select
          size="small"
          placeholder="Small"
          options={[
            { label: 'One', value: 1 },
            { label: 'Two', value: 2 },
          ]}
        />
        <Select
          loading
          placeholder="Loading all..."
          options={[]}
        />
        <Select
          placeholder="Option loading"
          options={[
            { label: 'Ready', value: 'ready' },
            { label: 'Syncing...', value: 'sync', loading: true },
            { label: 'Failed', value: 'fail', disabled: true },
          ]}
        />
      </div>
    </section>
  )
}
