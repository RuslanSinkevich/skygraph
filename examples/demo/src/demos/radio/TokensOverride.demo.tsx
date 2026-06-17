import { RadioGroup } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-radio-border': '#64748b',
  '--sg-radio-bg': '#111827',
  '--sg-radio-bg-checked': '#60a5fa',
  '--sg-radio-border-hover': '#60a5fa',
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
