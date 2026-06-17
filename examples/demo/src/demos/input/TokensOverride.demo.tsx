import { Input } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-input-bg': '#1e293b',
  '--sg-input-color': '#e2e8f0',
  '--sg-input-border': '#334155',
  '--sg-color-text-placeholder': '#94a3b8',
} as CSSProperties

export function TokensOverrideInput() {
  return (
    <div style={dark}>
      <Input placeholder="Search anything…" />
    </div>
  )
}
