import { Empty } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-text-disabled': '#475569',
  '--sg-color-text-tertiary': '#94a3b8',
} as CSSProperties

export function TokensOverrideEmpty() {
  return (
    <div style={dark}>
      <Empty description="No data" />
    </div>
  )
}
