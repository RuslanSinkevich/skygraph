import { RadioGroup } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-color-text-disabled': '#64748b',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg': '#0f172a',
  '--sg-color-border': '#475569',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-text': '#f8fafc',
} as CSSProperties

export function TokensOverrideRadio() {
  return (
    <div style={dark}>
      <RadioGroup
        defaultValue="b"
        options={[
          { label: 'Brand A', value: 'a' },
          { label: 'Brand B', value: 'b' },
          { label: 'Brand C', value: 'c' },
        ]}
      />
    </div>
  )
}
