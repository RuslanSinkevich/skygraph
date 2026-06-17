import { Tag } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.22)',
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
