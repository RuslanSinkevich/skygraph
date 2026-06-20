import { Tag } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
  background: '#0f172a',
  '--sg-color-success-bg': 'rgba(52, 211, 153, 0.16)',
  '--sg-color-error-bg': 'rgba(248, 113, 113, 0.16)',
  '--sg-color-warning-bg': 'rgba(251, 191, 36, 0.16)',
  '--sg-color-border': '#475569',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.16)',
  '--sg-color-text': '#f8fafc',
} as CSSProperties

export function TokensOverrideTag() {
  return (
    <div style={dark}>
      <Tag>default</Tag>
      <Tag color="processing">active</Tag>
    </div>
  )
}
