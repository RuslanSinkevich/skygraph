import { Calendar } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-container': '#111827',
  '--sg-color-bg-hover': '#273449',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-text': '#f8fafc',
  '--sg-color-primary': '#60a5fa',
} as CSSProperties

export function TokensOverrideCalendar() {
  return (
    <div style={dark}>
      <Calendar fullscreen={false} style={{ width: '100%' }} />
    </div>
  )
}
