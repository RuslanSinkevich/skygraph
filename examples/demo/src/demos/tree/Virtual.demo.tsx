import { useMemo } from 'react'
import { Tree } from '@skygraph/react'
import type { TreeNodeData } from '@skygraph/react'

/** Generates a 1 000-row flat-ish tree to demo the virtual scroller. */
function makeBigTree(): TreeNodeData[] {
  const roots: TreeNodeData[] = []
  for (let i = 0; i < 20; i++) {
    const children: TreeNodeData[] = []
    for (let j = 0; j < 50; j++) {
      children.push({ key: `r${i}-c${j}`, title: `Item ${i}.${j}` })
    }
    roots.push({ key: `r${i}`, title: `Root ${i}`, children })
  }
  return roots
}

/**
 * Setting `height` turns on windowed rendering — only visible rows are
 * in the DOM, so 1 000+ nodes stay fluid.
 */
export function VirtualTree() {
  const data = useMemo(makeBigTree, [])
  return (
    <div
      style={{
        border: '1px solid var(--sg-color-border)',
        borderRadius: 'var(--sg-border-radius)',
        padding: 8,
      }}
    >
      <Tree treeData={data} defaultExpandAll height={320} />
    </div>
  )
}
