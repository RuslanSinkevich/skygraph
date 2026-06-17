import { Spin } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  display: 'flex',
  justifyContent: 'center',
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-spin-color': '#60a5fa',
} as CSSProperties

export function TokensOverrideSpin() {
  return (
    <div style={dark}>
      <Spin spinning size="large" />
    </div>
  )
}
