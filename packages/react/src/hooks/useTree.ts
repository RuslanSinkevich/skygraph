import { useState, useCallback, useMemo } from 'react'
import { createCore, createTree } from '@skygraph/core'
import type {
  Core,
  TreeEngine,
  TreeState,
  TreeEngineOptions,
  TreeKey,
  TreeNodeData,
} from '@skygraph/core'

export interface UseTreeOptions extends TreeEngineOptions {
  data?: TreeNodeData[]
}

export interface UseTreeReturn {
  core: Core
  tree: TreeEngine
  treeState: TreeState
  flatNodes: ReturnType<TreeEngine['getFlatNodes']>
  expand: (key: TreeKey) => void
  collapse: (key: TreeKey) => void
  toggleExpand: (key: TreeKey) => void
  setExpandedKeys: (keys: TreeKey[]) => void
  expandAll: () => void
  collapseAll: () => void
  check: (key: TreeKey) => void
  uncheck: (key: TreeKey) => void
  toggleCheck: (key: TreeKey) => void
  setCheckedKeys: (keys: TreeKey[]) => void
  select: (key: TreeKey, multiple?: boolean) => void
  deselect: (key: TreeKey) => void
  setSelectedKeys: (keys: TreeKey[]) => void
  markLoading: (key: TreeKey) => void
  markLoaded: (key: TreeKey) => void
  addChildren: (parentKey: TreeKey, children: TreeNodeData[]) => void
  moveNode: (dragKey: TreeKey, dropKey: TreeKey, position: -1 | 0 | 1) => TreeNodeData[] | null
  filterNodes: (predicate: ((node: TreeNodeData) => boolean) | null) => void
  refresh: () => void
}

export function useTree(options?: UseTreeOptions): UseTreeReturn {
  const [{ core, tree }] = useState(() => {
    const c = createCore()
    const t = createTree(c, options)
    if (options?.data) {
      t.setData(options.data)
    }
    return { core: c, tree: t }
  })

  const [treeState, setTreeState] = useState(() => tree.getState())
  const [flatNodes, setFlatNodes] = useState(() => tree.getFlatNodes())

  const refresh = useCallback(() => {
    setTreeState(tree.getState())
    setFlatNodes(tree.getFlatNodes())
  }, [tree])

  const expand = useCallback((key: TreeKey) => { tree.expand(key); refresh() }, [tree, refresh])
  const collapse = useCallback((key: TreeKey) => { tree.collapse(key); refresh() }, [tree, refresh])
  const toggleExpand = useCallback((key: TreeKey) => { tree.toggleExpand(key); refresh() }, [tree, refresh])
  const setExpandedKeys = useCallback((keys: TreeKey[]) => { tree.setExpandedKeys(keys); refresh() }, [tree, refresh])
  const expandAll = useCallback(() => { tree.expandAll(); refresh() }, [tree, refresh])
  const collapseAll = useCallback(() => { tree.collapseAll(); refresh() }, [tree, refresh])

  const check = useCallback((key: TreeKey) => { tree.check(key); refresh() }, [tree, refresh])
  const uncheck = useCallback((key: TreeKey) => { tree.uncheck(key); refresh() }, [tree, refresh])
  const toggleCheck = useCallback((key: TreeKey) => { tree.toggleCheck(key); refresh() }, [tree, refresh])
  const setCheckedKeys = useCallback((keys: TreeKey[]) => { tree.setCheckedKeys(keys); refresh() }, [tree, refresh])

  const select = useCallback((key: TreeKey, multiple?: boolean) => { tree.select(key, multiple); refresh() }, [tree, refresh])
  const deselect = useCallback((key: TreeKey) => { tree.deselect(key); refresh() }, [tree, refresh])
  const setSelectedKeys = useCallback((keys: TreeKey[]) => { tree.setSelectedKeys(keys); refresh() }, [tree, refresh])

  const markLoading = useCallback((key: TreeKey) => { tree.markLoading(key); refresh() }, [tree, refresh])
  const markLoaded = useCallback((key: TreeKey) => { tree.markLoaded(key); refresh() }, [tree, refresh])
  const addChildren = useCallback((parentKey: TreeKey, children: TreeNodeData[]) => { tree.addChildren(parentKey, children); refresh() }, [tree, refresh])

  const moveNode = useCallback((dragKey: TreeKey, dropKey: TreeKey, position: -1 | 0 | 1) => {
    const result = tree.moveNode(dragKey, dropKey, position)
    refresh()
    return result
  }, [tree, refresh])

  const filterNodes = useCallback((predicate: ((node: TreeNodeData) => boolean) | null) => {
    tree.filterNodes(predicate)
    refresh()
  }, [tree, refresh])

  return useMemo(() => ({
    core, tree, treeState, flatNodes,
    expand, collapse, toggleExpand, setExpandedKeys, expandAll, collapseAll,
    check, uncheck, toggleCheck, setCheckedKeys,
    select, deselect, setSelectedKeys,
    markLoading, markLoaded, addChildren,
    moveNode, filterNodes, refresh,
  }), [
    core, tree, treeState, flatNodes,
    expand, collapse, toggleExpand, setExpandedKeys, expandAll, collapseAll,
    check, uncheck, toggleCheck, setCheckedKeys,
    select, deselect, setSelectedKeys,
    markLoading, markLoaded, addChildren,
    moveNode, filterNodes, refresh,
  ])
}
