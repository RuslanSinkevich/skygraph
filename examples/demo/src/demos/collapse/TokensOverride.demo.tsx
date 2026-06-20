import { Collapse } from '@skygraph/react'
import { sampleItems } from './data'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  '--sg-color-bg-hover': '#334155',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-border-secondary': '#334155',
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
