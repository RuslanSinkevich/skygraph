import { useState } from 'react'
import { Tree } from '@skygraph/react'
import type { TreeNodeData } from '@skygraph/react'
import { fileTree } from './data'

/**
 * `draggable` enables HTML5 drag & drop on every node. `allowDrop` can
 * gate specific targets (e.g., no dropping a folder into a file).
 * Handle `onDrop` and update your data source — SkyGraph only reports
 * the intent, not the mutation itself.
 */
export function DraggableTree() {
  const [data, setData] = useState<TreeNodeData[]>(fileTree)
  return (
    <Tree
      treeData={data}
      draggable
      defaultExpandAll
      onDrop={(info) => {
        console.log('Drop', info.dragNode.key, '→', info.node.key, info.dropPosition)
        // In a real app: mutate the tree based on dropPosition (-1 before, 0 inside, 1 after)
        setData((d) => d) // no-op placeholder — the demo just logs
      }}
    />
  )
}
