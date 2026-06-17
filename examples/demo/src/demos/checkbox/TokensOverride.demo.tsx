import { Checkbox } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  display: 'grid',
  gap: 6,
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-checkbox-bg-checked': '#60a5fa',
  '--sg-checkbox-border-hover': '#60a5fa',
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
