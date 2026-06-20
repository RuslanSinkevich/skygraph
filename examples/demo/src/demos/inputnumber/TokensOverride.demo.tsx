import { InputNumber } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-color-text-disabled': '#64748b',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-border': '#475569',
  '--sg-color-text': '#f8fafc',
} as CSSProperties

export function TokensOverrideInputNumber() {
  return (
    <div style={dark}>
      <InputNumber defaultValue={7} min={0} max={20} />
    </div>
  )
}
