import { Tree } from '@skygraph/react'
import { fileTree } from './data'

/**
 * `editable` lets the user rename a node inline — double-click the
 * title, type, press Enter to commit or Esc to cancel. `onEdit` gets
 * the new + old text; update your data source from there.
 */
export function EditableTree() {
  return (
    <Tree
      treeData={fileTree}
      editable
      defaultExpandAll
      onEdit={(info) =>
        console.log('Renamed', info.key, ':', info.oldValue, '→', info.value)
      }
    />
  )
}
