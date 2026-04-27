import { useState } from 'react'
import { TreeSelect } from '@skygraph/react'
import { orgTree } from './data'

/**
 * `multiple` toggles the key on click. `value` becomes `string[]`.
 * Selected nodes render as tags inside the control.
 */
export function MultipleTreeSelect() {
  const [value, setValue] = useState<string | string[]>([])
  return (
    <div style={{ width: 380 }}>
      <TreeSelect
        treeData={orgTree}
        multiple
        value={value}
        onChange={setValue}
        treeDefaultExpandAll
        placeholder="Pick multiple teams"
        allowClear
      />
    </div>
  )
}
