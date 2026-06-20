import { Segmented } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-text-disabled': '#64748b',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-text': '#f8fafc',
} as CSSProperties

export function TokensOverrideSegmented() {
  return (
    <div style={dark}>
      <Segmented defaultValue="B" options={['A', 'B', 'C', 'D']} />
    </div>
  )
}
