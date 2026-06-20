import { useState } from 'react'
import { Transfer } from '@skygraph/react'
import { mockData } from './data'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  '--sg-color-bg': '#0f172a',
  '--sg-color-bg-disabled': '#1e293b',
  '--sg-color-text-placeholder': '#94a3b8',
  '--sg-color-error-bg': 'rgba(248, 113, 113, 0.16)',
  '--sg-color-warning-bg': 'rgba(251, 191, 36, 0.16)',
  '--sg-color-fill-tertiary': 'rgba(255, 255, 255, 0.08)',
  '--sg-color-fill': 'rgba(255, 255, 255, 0.16)',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-text-disabled': '#64748b',
  '--sg-color-text-tertiary': '#94a3b8',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-border': '#475569',
  '--sg-color-text': '#f8fafc',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.16)',
} as CSSProperties

export function TokensOverrideTransfer() {
  const [targetKeys, setTargetKeys] = useState<string[]>(['1', '3'])
  return (
    <div style={dark}>
      <Transfer
        dataSource={mockData}
        targetKeys={targetKeys}
        onChange={(keys) => setTargetKeys(keys)}
      />
    </div>
  )
}
