import { Button } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  display: 'flex',
  gap: 12,
  flexWrap: 'wrap',
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-hover': '#93c5fd',
  '--sg-btn-bg': '#1e293b',
  '--sg-btn-color': '#e2e8f0',
  '--sg-btn-border': '#334155',
} as CSSProperties

export function TokensOverrideButton() {
  return (
    <div style={dark}>
      <Button type="primary">Get started</Button>
      <Button>Learn more</Button>
    </div>
  )
}
