import { Tree } from '@skygraph/react'
import type { TreeNodeData, TreeNodeStatus } from '@skygraph/react'
import { orgTree } from './data'

/**
 * `nodeStatus(node)` returns one of `success | warning | error | info |
 * default` — the library paints a status dot + left border accordingly.
 * Useful for build trees, deployment environments, or health dashboards.
 */
export function NodeStatusTree() {
  const status = (node: TreeNodeData): TreeNodeStatus => {
    const k = String(node.key)
    if (k === 'eng-web-fe') return 'success'
    if (k === 'eng-web-be') return 'warning'
    if (k === 'eng-mobile-ios') return 'error'
    if (k === 'ops-finance') return 'info'
    return 'default'
  }
  return <Tree treeData={orgTree} defaultExpandAll nodeStatus={status} />
}
