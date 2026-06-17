import { Tree } from '@skygraph/react'
import { orgTree } from './data'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-hover': '#273449',
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
