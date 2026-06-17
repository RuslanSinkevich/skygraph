import { TreeSelect } from '@skygraph/react'
import { orgTree } from './data'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-input-bg': '#1e293b',
  '--sg-input-color': '#e2e8f0',
  '--sg-input-border': '#334155',
  '--sg-color-bg-elevated': '#1f2937',
  '--sg-color-bg-hover': '#273449',
  '--sg-color-text': '#f8fafc',
  '--sg-color-primary': '#60a5fa',
} as CSSProperties

export function TokensOverrideTreeSelect() {
  return (
    <div style={dark}>
      <TreeSelect treeData={orgTree} treeDefaultExpandAll placeholder="Select team" allowClear />
    </div>
  )
}
