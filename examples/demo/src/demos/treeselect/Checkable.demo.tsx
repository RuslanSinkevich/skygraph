import { useState } from 'react'
import { TreeSelect } from '@skygraph/react'
import type { TreeKey } from '@skygraph/react'
import { orgTree } from './data'

/**
 * `treeCheckable` renders checkboxes on every node and auto-selects the
 * whole subtree when you tick a parent. Use when you need to target
 * hierarchical groups rather than individual leaves.
 */
export function CheckableTreeSelect() {
  const [value, setValue] = useState<TreeKey | TreeKey[]>([])
  return (
    <div style={{ width: 380 }}>
      <TreeSelect
        treeData={orgTree}
        treeCheckable
        value={value}
        onChange={(next) => setValue(next)}
        treeDefaultExpandAll
        placeholder="Tick subtrees"
        allowClear
      />
    </div>
  )
}
