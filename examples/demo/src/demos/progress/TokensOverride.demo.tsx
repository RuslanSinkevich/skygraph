import { Progress } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-primary': '#60a5fa',
  '--sg-color-bg-hover': '#273449',
  '--sg-color-text': '#f8fafc',
} as CSSProperties

export function TokensOverrideProgress() {
  return (
    <div style={dark}>
      <Progress percent={35} />
      <Progress percent={75} status="active" />
    </div>
  )
}
