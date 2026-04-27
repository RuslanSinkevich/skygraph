import { useState } from 'react'
import { Tree } from '@skygraph/react'
import type { TreeKey } from '@skygraph/react'
import { orgTree } from './data'

/**
 * `checkable` turns on node checkboxes. By default checks cascade to the
 * whole subtree — set `checkStrictly` if you want parents and children
 * to stay independent.
 */
export function CheckableTree() {
  const [checked, setChecked] = useState<TreeKey[]>([])
  return (
    <div>
      <Tree
        checkable
        defaultExpandAll
        treeData={orgTree}
        checkedKeys={checked}
        onCheck={(keys) => setChecked(keys)}
      />
      <div
        style={{
          marginTop: 10,
          fontSize: 13,
          color: 'var(--sg-color-text-secondary)',
        }}
      >
        Checked: <code>{checked.length ? checked.join(', ') : '(none)'}</code>
      </div>
    </div>
  )
}
