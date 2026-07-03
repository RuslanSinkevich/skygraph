import { Empty } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg': '#1e293b',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-text-disabled': '#64748b',
  '--sg-color-text-tertiary': '#94a3b8',
} as CSSProperties

export function TokensOverrideEmpty() {
  return (
    <div style={dark}>
      <Empty description="No data" />
    </div>
  )
}
