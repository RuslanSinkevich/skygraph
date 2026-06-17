import { Steps } from '@skygraph/react'
import { basicSteps } from './data'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-border': '#64748b',
  '--sg-color-border-secondary': '#475569',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-secondary': '#cbd5e1',
} as CSSProperties

export function TokensOverrideSteps() {
  return (
    <div style={dark}>
      <Steps current={1} items={basicSteps} direction="vertical" />
    </div>
  )
}
