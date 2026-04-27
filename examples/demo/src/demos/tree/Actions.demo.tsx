import { Tree } from '@skygraph/react'
import type { TreeNodeAction } from '@skygraph/react'
import { orgTree } from './data'

/**
 * Per-row actions render on hover. Use `danger` for destructive ops and
 * `visible(node)` / `disabled(node)` for conditional logic.
 */
export function ActionsTree() {
  const actions: TreeNodeAction[] = [
    {
      key: 'edit',
      icon: '✏',
      title: 'Rename',
      onClick: (node) => alert(`Rename "${node.title as string}"`),
    },
    {
      key: 'delete',
      icon: '✕',
      title: 'Delete',
      danger: true,
      disabled: (node) => !!node.disabled,
      onClick: (node) => alert(`Delete "${node.title as string}"`),
    },
  ]
  return <Tree treeData={orgTree} defaultExpandAll actions={actions} />
}
