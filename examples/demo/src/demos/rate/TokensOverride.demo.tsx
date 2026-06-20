import { Rate } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-rate-symbol-empty-color': '#475569',
  padding: 24,
  borderRadius: 12,
  '--sg-color-star': '#60a5fa',
  '--sg-color-border': '#475569',
} as CSSProperties

export function TokensOverrideRate() {
  return (
    <div style={dark}>
      <Rate defaultValue={3.5} allowHalf />
    </div>
  )
}
