import { Tree } from '@skygraph/react'
import { orgTree } from './data'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.16)',
  '--sg-color-warning-bg': 'rgba(251, 191, 36, 0.16)',
  '--sg-color-border': '#475569',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-text-disabled': '#64748b',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-text': '#f8fafc',
  '--sg-color-primary': '#60a5fa',
} as CSSProperties

export function TokensOverrideTree() {
  return (
    <div style={dark}>
      <Tree treeData={orgTree} defaultExpandAll />
    </div>
  )
}
