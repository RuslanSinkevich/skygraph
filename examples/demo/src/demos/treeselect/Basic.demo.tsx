import { useState } from 'react'
import { TreeSelect } from '@skygraph/react'
import { orgTree } from './data'

/**
 * Single-node selection. `value` is a string (the node's `key`). Clicking
 * a non-selectable / disabled node does nothing.
 */
export function BasicTreeSelect() {
  const [value, setValue] = useState<string | string[]>('')
  return (
    <div style={{ width: 320 }}>
      <TreeSelect
        treeData={orgTree}
        value={value}
        onChange={setValue}
        placeholder="Pick a team"
        treeDefaultExpandAll
        allowClear
      />
    </div>
  )
}
