import { Tree } from '@skygraph/react'
import { fileTree } from './data'

/**
 * `directory` mode renders the selected node with a filled background
 * (filesystem explorer style). Clicking a folder also expands it.
 */
export function DirectoryTree() {
  return (
    <Tree
      directory
      defaultExpandAll
      treeData={fileTree}
      defaultSelectedKeys={['src-components-button']}
    />
  )
}
