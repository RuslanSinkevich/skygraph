import { Tree } from '@skygraph/react'
import { orgTree } from './data'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Tree inherits all of its colours from the global tokens — there are no
 * Tree-specific CSS variables. Three scoped recipes — branded green, dark
 * field, glass pick — skin one tree.
 */
export function TokensOverrideTree() {
  return <TokenScopeCards render={() => <Tree treeData={orgTree} defaultExpandAll />} />
}
