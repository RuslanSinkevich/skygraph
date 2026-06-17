import { useState } from 'react'
import { Transfer } from '@skygraph/react'
import { mockData } from './data'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-container': '#111827',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-bg-hover': '#273449',
  '--sg-color-border': '#475569',
  '--sg-color-text': '#f8fafc',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.28)',
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
