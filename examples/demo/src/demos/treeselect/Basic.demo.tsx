import { useState } from 'react'
import { TreeSelect } from '@skygraph/react'
import type { TreeKey } from '@skygraph/react'
import { orgTree } from './data'

/**
 * Single-node selection. `value` is a key (string or number). Clicking
 * a non-selectable / disabled node does nothing.
 */
export function BasicTreeSelect() {
  const [value, setValue] = useState<TreeKey | TreeKey[]>('')
  return (
    <div style={{ width: 320 }}>
      <TreeSelect
        treeData={orgTree}
        value={value}
        onChange={(next) => setValue(next)}
        placeholder="Pick a team"
        treeDefaultExpandAll
        allowClear
      />
    </div>
  )
}
