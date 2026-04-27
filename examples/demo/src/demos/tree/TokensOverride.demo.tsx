import { Tree } from '@skygraph/react'
import { orgTree } from './data'

/**
 * Tree inherits *all* its colors from the global tokens — there are no
 * Tree-specific CSS variables. Scope tokens to skin one tree, or
 * `data-sg-theme="dark"` to dark-ify just this subtree.
 */
export function TokensOverrideTree() {
  return (
    <div
      style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}
    >
      <div
        style={
          {
            '--sg-color-primary': '#e11d48',
            '--sg-color-primary-bg': '#ffe4e6',
          } as React.CSSProperties
        }
      >
        <Tree treeData={orgTree} defaultExpandAll />
      </div>
      <div
        data-sg-theme="dark"
        style={{
          padding: 10,
          background: 'var(--sg-color-bg-container)',
          borderRadius: 'var(--sg-border-radius)',
        }}
      >
        <Tree treeData={orgTree} defaultExpandAll showLine />
      </div>
    </div>
  )
}
