import { useState } from 'react'
import { TreeSelect } from '@skygraph/react'
import type { TreeKey } from '@skygraph/react'
import { orgTree } from './data'

/**
 * `multiple` toggles the key on click. `value` becomes an array of keys.
 * Selected nodes render as tags inside the control.
 */
export function MultipleTreeSelect() {
  const [value, setValue] = useState<TreeKey | TreeKey[]>([])
  return (
    <div style={{ width: 380 }}>
      <TreeSelect
        treeData={orgTree}
        multiple
        value={value}
        onChange={(next) => setValue(next)}
        treeDefaultExpandAll
        placeholder="Pick multiple teams"
        allowClear
      />
    </div>
  )
}
