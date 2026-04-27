import { TreeSelect } from '@skygraph/react'
import { orgTree } from './data'

/** Three sizes track the rest of SkyGraph's controls. */
export function SizesTreeSelect() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <div style={{ width: 260 }}>
        <TreeSelect size="small" treeData={orgTree} placeholder="Small" allowClear />
      </div>
      <div style={{ width: 300 }}>
        <TreeSelect treeData={orgTree} placeholder="Default" allowClear />
      </div>
      <div style={{ width: 340 }}>
        <TreeSelect size="large" treeData={orgTree} placeholder="Large" allowClear />
      </div>
    </div>
  )
}
