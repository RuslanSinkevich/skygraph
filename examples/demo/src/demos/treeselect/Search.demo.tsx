import { TreeSelect } from '@skygraph/react'
import { orgTree } from './data'

/**
 * `showSearch` adds a filter field inside the dropdown that matches the
 * node `title` text. Parents stay visible while any descendant matches.
 */
export function SearchTreeSelect() {
  return (
    <div style={{ width: 340 }}>
      <TreeSelect
        showSearch
        treeData={orgTree}
        treeDefaultExpandAll
        placeholder="Start typing a team name…"
        allowClear
      />
    </div>
  )
}
