import { Checkbox } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  display: 'grid',
  gap: 6,
  background: '#0f172a',
  '--sg-color-bg-disabled': '#1e293b',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-color-text-disabled': '#64748b',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg': '#0f172a',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-text': '#f8fafc',
  '--sg-color-border': '#475569',
} as CSSProperties

export function TokensOverrideCheckbox() {
  return (
    <div style={dark}>
      <Checkbox defaultChecked>Receive emails</Checkbox>
      <Checkbox>Remember me</Checkbox>
    </div>
  )
}
