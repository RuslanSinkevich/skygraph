import { Tree } from '@skygraph/react'
import { orgTree } from './data'

/**
 * Default tree — click a node's title to select, its arrow to expand.
 * `defaultExpandAll` is convenient for demos; prefer controlled
 * `expandedKeys` in production so state survives re-renders.
 */
export function BasicTree() {
  return <Tree treeData={orgTree} defaultExpandAll />
}
