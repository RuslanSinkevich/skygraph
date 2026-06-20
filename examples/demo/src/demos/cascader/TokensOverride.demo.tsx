import { Cascader } from '@skygraph/react'
import { regionOptions } from './data'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.16)',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-border': '#475569',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-text-placeholder': '#94a3b8',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-color-text-disabled': '#64748b',
  padding: 24,
  borderRadius: 12,
  '--sg-input-bg': '#1e293b',
  '--sg-input-color': '#e2e8f0',
  '--sg-input-border': '#334155',
  '--sg-color-bg-elevated': '#1e293b',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-text': '#f8fafc',
  '--sg-color-primary': '#60a5fa',
} as CSSProperties

export function TokensOverrideCascader() {
  return (
    <div style={dark}>
      <Cascader options={regionOptions} placeholder="Select region" />
    </div>
  )
}
