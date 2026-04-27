import { Tree } from '@skygraph/react'
import { orgTree } from './data'

/**
 * `showToolbar` adds Expand / Collapse / Check All / Uncheck All
 * controls above the tree. Use `toolbarExtra` to inject your own nodes.
 */
export function ToolbarTree() {
  return (
    <Tree
      showToolbar
      checkable
      defaultExpandAll
      treeData={orgTree}
    />
  )
}
