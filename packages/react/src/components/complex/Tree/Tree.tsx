import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useTree } from '../../../hooks/useTree'
import { TreeNodeRow } from './TreeNodeRow'
import type { TreeProps, TreeKey, TreeNodeData } from './types'
import { DEFAULT_TREE_LOCALE, DEFAULT_INDENT } from './types'

export function Tree(props: TreeProps) {
  const {
    treeData, fieldNames,
    checkable = false, checkStrictly = false,
    checkedKeys: controlledCheckedKeys, defaultCheckedKeys,
    onCheck,
    selectable = true, multiple = false,
    selectedKeys: controlledSelectedKeys, defaultSelectedKeys,
    onSelect,
    expandedKeys: controlledExpandedKeys, defaultExpandedKeys,
    defaultExpandAll = false,
    onExpand,
    draggable = false, allowDrop, onDragStart, onDragOver, onDragLeave, onDragEnd, onDrop,
    loadData,
    showLine = false, showIcon = false,
    icon: globalIcon, switcherIcon, blockNode = false,
    height, virtual = true, disabled = false, indentSize = DEFAULT_INDENT,
    directory = false,
    onRightClick,
    locale, className, style, unstyled,
  } = props

  const t = useMemo(() => ({ ...DEFAULT_TREE_LOCALE, ...locale }), [locale])

  const showLineConfig = typeof showLine === 'object' ? showLine : { showLeafIcon: false }
  const isShowLine = !!showLine

  const {
    tree, treeState, flatNodes,
    toggleExpand, setExpandedKeys,
    toggleCheck, setCheckedKeys,
    select, setSelectedKeys,
    markLoading, markLoaded,
    moveNode,
    refresh,
  } = useTree({
    data: treeData,
    fieldNames,
    checkStrictly,
    defaultExpandAll,
    defaultExpandedKeys,
    defaultCheckedKeys,
    defaultSelectedKeys,
  })

  // Sync data changes
  const prevDataRef = useRef(treeData)
  useEffect(() => {
    if (prevDataRef.current !== treeData) {
      prevDataRef.current = treeData
      tree.setData(treeData)
      refresh()
    }
  }, [treeData, tree, refresh])

  // Controlled expandedKeys
  useEffect(() => {
    if (controlledExpandedKeys !== undefined) {
      setExpandedKeys(controlledExpandedKeys)
    }
  }, [controlledExpandedKeys, setExpandedKeys])

  // Controlled checkedKeys
  useEffect(() => {
    if (controlledCheckedKeys !== undefined) {
      setCheckedKeys(controlledCheckedKeys)
    }
  }, [controlledCheckedKeys, setCheckedKeys])

  // Controlled selectedKeys
  useEffect(() => {
    if (controlledSelectedKeys !== undefined) {
      setSelectedKeys(controlledSelectedKeys)
    }
  }, [controlledSelectedKeys, setSelectedKeys])

  // Drag state
  const [dragKey, setDragKey] = useState<TreeKey | null>(null)
  const [dropKey, setDropKey] = useState<TreeKey | null>(null)
  const [dropPosition, setDropPosition] = useState<-1 | 0 | 1>(0)

  const handleExpand = useCallback((key: TreeKey) => {
    toggleExpand(key)
    const node = tree.getNode(key)
    if (node && onExpand) {
      const newState = tree.getState()
      const expanded = newState.expandedKeys.includes(key)
      onExpand(newState.expandedKeys, { expanded, node })
    }
  }, [toggleExpand, tree, onExpand])

  const handleCheck = useCallback((key: TreeKey) => {
    toggleCheck(key)
    if (onCheck) {
      const newState = tree.getState()
      const node = tree.getNode(key)!
      const checkedNodes = newState.checkedKeys
        .map((ck: TreeKey) => tree.getNode(ck))
        .filter(Boolean) as TreeNodeData[]
      onCheck(newState.checkedKeys, {
        checked: newState.checkedKeys.includes(key),
        node,
        checkedNodes,
        halfCheckedKeys: newState.halfCheckedKeys,
      })
    }
  }, [toggleCheck, tree, onCheck])

  const handleSelect = useCallback((key: TreeKey) => {
    select(key, multiple)
    if (onSelect) {
      const newState = tree.getState()
      const node = tree.getNode(key)!
      const selectedNodes = newState.selectedKeys
        .map((sk: TreeKey) => tree.getNode(sk))
        .filter(Boolean) as TreeNodeData[]
      onSelect(newState.selectedKeys, {
        selected: newState.selectedKeys.includes(key),
        node,
        selectedNodes,
      })
    }
  }, [select, multiple, tree, onSelect])

  const handleLoadData = useCallback((node: TreeNodeData) => {
    if (!loadData) return
    const key = node.key
    if (treeState.loadedKeys.includes(key) || treeState.loadingKeys.includes(key)) return
    markLoading(key)
    loadData(node).then(() => {
      markLoaded(key)
    })
  }, [loadData, treeState.loadedKeys, treeState.loadingKeys, markLoading, markLoaded])

  // Drag handlers
  const handleDragStart = useCallback((e: React.DragEvent, key: TreeKey) => {
    setDragKey(key)
    e.dataTransfer.effectAllowed = 'move'
    const node = tree.getNode(key)
    if (node) onDragStart?.({ event: e, node })
  }, [tree, onDragStart])

  const handleDragOver = useCallback((e: React.DragEvent, key: TreeKey) => {
    e.preventDefault()
    setDropKey(key)
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const y = e.clientY - rect.top
    const h = rect.height
    let pos: -1 | 0 | 1 = 0
    if (y < h * 0.25) pos = -1
    else if (y > h * 0.75) pos = 1
    setDropPosition(pos)
    const node = tree.getNode(key)
    if (node) onDragOver?.({ event: e, node })
  }, [tree, onDragOver])

  const handleDragLeave = useCallback((e: React.DragEvent, key: TreeKey) => {
    setDropKey(null)
    const node = tree.getNode(key)
    if (node) onDragLeave?.({ event: e, node })
  }, [tree, onDragLeave])

  const handleDragEnd = useCallback((e: React.DragEvent, key: TreeKey) => {
    setDragKey(null)
    setDropKey(null)
    const node = tree.getNode(key)
    if (node) onDragEnd?.({ event: e, node })
  }, [tree, onDragEnd])

  const handleDrop = useCallback((e: React.DragEvent, key: TreeKey) => {
    e.preventDefault()
    if (dragKey === null || dragKey === key) {
      setDragKey(null)
      setDropKey(null)
      return
    }

    const dragNode = tree.getNode(dragKey)
    const dropNode = tree.getNode(key)
    if (!dragNode || !dropNode) return

    if (allowDrop && !allowDrop({ dragNode, dropNode, dropPosition })) {
      setDragKey(null)
      setDropKey(null)
      return
    }

    moveNode(dragKey, key, dropPosition)

    if (onDrop) {
      onDrop({ event: e, node: dropNode, dragNode, dropPosition })
    }

    setDragKey(null)
    setDropKey(null)
  }, [dragKey, dropPosition, tree, allowDrop, moveNode, onDrop])

  const handleRightClick = useCallback((e: React.MouseEvent, node: TreeNodeData) => {
    onRightClick?.({ event: e, node })
  }, [onRightClick])

  const isDraggable = (node: TreeNodeData): boolean => {
    if (typeof draggable === 'function') return draggable(node)
    return !!draggable
  }

  // Virtual scroll
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const itemHeight = 28

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop)
    }
  }, [])

  const useVirtual = virtual && height !== undefined && flatNodes.length > 50

  const visibleNodes = useMemo(() => {
    if (!useVirtual || !height) return flatNodes
    const start = Math.floor(scrollTop / itemHeight)
    const visibleCount = Math.ceil(height / itemHeight) + 2
    return flatNodes.slice(Math.max(0, start - 1), start + visibleCount)
  }, [flatNodes, useVirtual, height, scrollTop, itemHeight])

  const virtualOffset = useMemo(() => {
    if (!useVirtual || !height) return 0
    const start = Math.floor(scrollTop / itemHeight)
    return Math.max(0, start - 1) * itemHeight
  }, [useVirtual, height, scrollTop, itemHeight])

  const totalHeight = flatNodes.length * itemHeight

  // Render
  if (unstyled) {
    return (
      <div className={className} style={style} role="tree">
        {flatNodes.map((item: { node: TreeNodeData; key: TreeKey; depth: number; isLeaf: boolean }) => (
          <TreeNodeRow
            key={item.key}
            node={item.node}
            nodeKey={item.key}
            depth={item.depth}
            isLeaf={item.isLeaf}
            indentSize={indentSize}
            expanded={treeState.expandedKeys.includes(item.key)}
            checked={treeState.checkedKeys.includes(item.key)}
            halfChecked={treeState.halfCheckedKeys.includes(item.key)}
            selected={treeState.selectedKeys.includes(item.key)}
            loading={treeState.loadingKeys.includes(item.key)}
            disabled={disabled || !!item.node.disabled}
            checkable={checkable}
            selectable={selectable}
            showLine={false}
            showLeafIcon={false}
            showIcon={false}
            blockNode={false}
            directory={false}
            draggable={false}
            dropPosition={null}
            t={t}
            onExpand={handleExpand}
            onCheck={handleCheck}
            onSelect={handleSelect}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
            unstyled
          />
        ))}
      </div>
    )
  }

  const wrapperCls = [
    'sg-tree',
    isShowLine ? 'sg-tree-show-line' : '',
    blockNode ? 'sg-tree-block-node' : '',
    directory ? 'sg-tree-directory' : '',
    disabled ? 'sg-tree-disabled' : '',
    className,
  ].filter(Boolean).join(' ')

  const renderNodes = (list: typeof visibleNodes) =>
    list.map((item: { node: TreeNodeData; key: TreeKey; depth: number; isLeaf: boolean }) => (
      <TreeNodeRow
        key={item.key}
        node={item.node}
        nodeKey={item.key}
        depth={item.depth}
        isLeaf={item.isLeaf}
        indentSize={indentSize}
        expanded={treeState.expandedKeys.includes(item.key)}
        checked={treeState.checkedKeys.includes(item.key)}
        halfChecked={treeState.halfCheckedKeys.includes(item.key)}
        selected={treeState.selectedKeys.includes(item.key)}
        loading={treeState.loadingKeys.includes(item.key)}
        disabled={disabled || !!item.node.disabled}
        checkable={checkable}
        selectable={selectable}
        showLine={isShowLine}
        showLeafIcon={showLineConfig.showLeafIcon ?? false}
        showIcon={showIcon || directory}
        blockNode={blockNode}
        directory={directory}
        globalIcon={globalIcon}
        nodeIcon={item.node.icon as React.ReactNode | ((props: { expanded: boolean; selected: boolean }) => React.ReactNode) | undefined}
        switcherIcon={switcherIcon}
        draggable={isDraggable(item.node)}
        dropPosition={dropKey === item.key ? dropPosition : null}
        t={t}
        onExpand={handleExpand}
        onCheck={handleCheck}
        onSelect={handleSelect}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
        onRightClick={onRightClick ? handleRightClick : undefined}
        onLoadData={loadData ? handleLoadData : undefined}
        nodeClassName={item.node.className as string | undefined}
        nodeStyle={item.node.style as React.CSSProperties | undefined}
      />
    ))

  if (flatNodes.length === 0) {
    return (
      <div className={wrapperCls} style={style} role="tree">
        <div className="sg-tree-empty">{t.emptyText}</div>
      </div>
    )
  }

  if (useVirtual && height) {
    return (
      <div className={wrapperCls} style={style}>
        <div
          ref={containerRef}
          className="sg-tree-virtual-container"
          style={{ height, overflow: 'auto' }}
          onScroll={handleScroll}
          role="tree"
        >
          <div style={{ height: totalHeight, position: 'relative' }}>
            <div style={{ position: 'absolute', top: virtualOffset, left: 0, right: 0 }}>
              {renderNodes(visibleNodes)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={wrapperCls} style={style} role="tree">
      {renderNodes(visibleNodes)}
    </div>
  )
}
