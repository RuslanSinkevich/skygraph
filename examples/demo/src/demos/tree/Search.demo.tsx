import { Tree } from '@skygraph/react'
import { orgTree } from './data'

/**
 * `showSearch` renders a built-in filter field. Parents stay visible
 * while any descendant matches; matched substrings are highlighted.
 */
export function SearchTree() {
  return (
    <Tree
      showSearch
      defaultExpandAll
      autoExpandParent
      treeData={orgTree}
    />
  )
}
