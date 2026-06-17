import { InputNumber } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-input-bg': '#1e293b',
  '--sg-input-color': '#e2e8f0',
  '--sg-input-border': '#334155',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-text': '#f8fafc',
} as CSSProperties

export function TokensOverrideInputNumber() {
  return (
    <div style={dark}>
      <InputNumber defaultValue={7} min={0} max={20} />
    </div>
  )
}
