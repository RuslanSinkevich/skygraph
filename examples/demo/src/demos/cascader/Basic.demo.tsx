import { useState } from 'react'
import { Cascader } from '@skygraph/react'
import { regionOptions } from './data'

/**
 * Controlled single-select. User drills province → city → district;
 * `onChange` delivers the full value path and the resolved option chain.
 */
export function BasicCascader() {
  const [value, setValue] = useState<(string | number)[]>([])
  const [labels, setLabels] = useState<string[]>([])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 340 }}>
      <Cascader
        options={regionOptions}
        placeholder="Select region"
        value={value}
        onChange={(v, selected) => {
          setValue(v)
          setLabels(selected.map((o) => String(o.label)))
        }}
      />
      <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        {value.length ? `Value: [${value.join(', ')}] · Labels: ${labels.join(' / ')}` : 'Nothing selected'}
      </div>
    </div>
  )
}
