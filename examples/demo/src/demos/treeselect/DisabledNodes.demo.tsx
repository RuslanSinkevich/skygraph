import { TreeSelect } from '@skygraph/react'
import { orgTree } from './data'

/**
 * Per-node `disabled` greys a node out but keeps it visible for context —
 * `Operations → Finance` can't be picked in this demo.
 */
export function DisabledNodesTreeSelect() {
  return (
    <div style={{ width: 340 }}>
      <TreeSelect
        treeData={orgTree}
        treeDefaultExpandAll
        placeholder="Finance is disabled"
        allowClear
      />
    </div>
  )
}
