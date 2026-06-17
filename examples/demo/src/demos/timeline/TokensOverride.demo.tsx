import { Timeline } from '@skygraph/react'
import { releaseItems } from './data'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-primary': '#60a5fa',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-tertiary': '#94a3b8',
} as CSSProperties

export function TokensOverrideTimeline() {
  return (
    <div style={dark}>
      <Timeline items={releaseItems} pending="Awaiting…" />
    </div>
  )
}
