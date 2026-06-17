import { Descriptions } from '@skygraph/react'
import { userItems } from './data'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-border-secondary': '#475569',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-secondary': '#cbd5e1',
} as CSSProperties

export function TokensOverrideDescriptions() {
  return (
    <div style={dark}>
      <Descriptions bordered items={userItems} />
    </div>
  )
}
