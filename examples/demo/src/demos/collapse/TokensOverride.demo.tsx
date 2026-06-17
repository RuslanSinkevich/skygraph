import { Collapse } from '@skygraph/react'
import { sampleItems } from './data'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-container': '#111827',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-border-secondary': '#475569',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-secondary': '#cbd5e1',
} as CSSProperties

export function TokensOverrideCollapse() {
  return (
    <div style={dark}>
      <Collapse items={sampleItems} defaultActiveKey={['1']} />
    </div>
  )
}
