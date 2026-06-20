import { Button } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  display: 'flex',
  gap: 12,
  flexWrap: 'wrap',
  background: '#0f172a',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.16)',
  '--sg-color-error-bg': 'rgba(248, 113, 113, 0.16)',
  '--sg-color-text': '#f8fafc',
  '--sg-color-border': '#475569',
  '--sg-color-bg-disabled': '#1e293b',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-text-disabled': '#64748b',
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
