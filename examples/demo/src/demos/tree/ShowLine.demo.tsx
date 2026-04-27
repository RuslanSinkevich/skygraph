import { Tree } from '@skygraph/react'
import { orgTree } from './data'

/**
 * `showLine` renders guide lines between levels — helps orient the eye
 * on deep hierarchies.
 */
export function ShowLineTree() {
  return <Tree treeData={orgTree} showLine defaultExpandAll />
}
