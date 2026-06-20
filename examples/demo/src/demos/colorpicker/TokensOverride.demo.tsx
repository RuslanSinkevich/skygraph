import { ColorPicker } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.16)',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-text-tertiary': '#94a3b8',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-border': '#475569',
  '--sg-color-bg-elevated': '#1e293b',
  '--sg-color-text': '#f8fafc',
  '--sg-color-primary': '#60a5fa',
} as CSSProperties

export function TokensOverrideColorPicker() {
  return (
    <div style={dark}>
      <ColorPicker defaultValue="#10b981" showText />
    </div>
  )
}
