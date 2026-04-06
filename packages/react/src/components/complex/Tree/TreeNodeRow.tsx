import React from 'react'
import { Checkbox } from '../../ui/Checkbox'
import { Spin } from '../../ui/Spin'
import type { TreeKey, TreeNodeData, TreeLocale } from './types'

interface TreeNodeRowProps {
  node: TreeNodeData
  nodeKey: TreeKey
  depth: number
  isLeaf: boolean
  indentSize: number

  // State
  expanded: boolean
  checked: boolean
  halfChecked: boolean
  selected: boolean
  loading: boolean
  disabled: boolean

  // Features
  checkable: boolean
  selectable: boolean
  showLine: boolean
  showLeafIcon: boolean | React.ReactNode
  showIcon: boolean
  blockNode: boolean
  directory: boolean

  // Icons
  globalIcon?: React.ReactNode | ((props: { expanded: boolean; selected: boolean }) => React.ReactNode)
  nodeIcon?: React.ReactNode | ((props: { expanded: boolean; selected: boolean }) => React.ReactNode)
  switcherIcon?: React.ReactNode | ((props: { expanded: boolean; loading: boolean; isLeaf: boolean }) => React.ReactNode)

  // Drag
  draggable: boolean
  dropPosition: -1 | 0 | 1 | null

  // Locale
  t: Required<TreeLocale>

  // Handlers
  onExpand: (key: TreeKey) => void
  onCheck: (key: TreeKey) => void
  onSelect: (key: TreeKey) => void
  onDragStart: (e: React.DragEvent, key: TreeKey) => void
  onDragOver: (e: React.DragEvent, key: TreeKey) => void
  onDragLeave: (e: React.DragEvent, key: TreeKey) => void
  onDragEnd: (e: React.DragEvent, key: TreeKey) => void
  onDrop: (e: React.DragEvent, key: TreeKey) => void
  onRightClick?: (e: React.MouseEvent, node: TreeNodeData) => void
  onLoadData?: (node: TreeNodeData) => void

  unstyled?: boolean
  nodeClassName?: string
  nodeStyle?: React.CSSProperties
}

export function TreeNodeRow(props: TreeNodeRowProps) {
  const {
    node, nodeKey, depth, isLeaf, indentSize,
    expanded, checked, halfChecked, selected, loading, disabled,
    checkable, selectable, showLine, showLeafIcon, showIcon, blockNode, directory,
    globalIcon, nodeIcon, switcherIcon,
    draggable, dropPosition,
    onExpand, onCheck, onSelect,
    onDragStart, onDragOver, onDragLeave, onDragEnd, onDrop,
    onRightClick, onLoadData,
    unstyled, nodeClassName, nodeStyle,
  } = props

  const handleSwitcherClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isLeaf) return
    if (!expanded && loading) return
    onExpand(nodeKey)
    if (!expanded && !isLeaf && onLoadData) {
      onLoadData(node)
    }
  }

  const handleCheckChange = () => {
    if (disabled || node.disableCheckbox) return
    onCheck(nodeKey)
  }

  const handleSelect = () => {
    if (disabled || (node.selectable === false)) return
    if (!selectable) return
    onSelect(nodeKey)
    if (directory && !isLeaf) {
      onExpand(nodeKey)
    }
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    if (onRightClick) {
      e.preventDefault()
      onRightClick(e, node)
    }
  }

  // Switcher icon
  const renderSwitcher = () => {
    if (isLeaf) {
      if (showLine) {
        if (showLeafIcon === false) return <span className="sg-tree-switcher sg-tree-switcher-noop" />
        if (showLeafIcon && typeof showLeafIcon !== 'boolean') {
          return <span className="sg-tree-switcher sg-tree-switcher-leaf-icon">{showLeafIcon}</span>
        }
        return <span className="sg-tree-switcher sg-tree-switcher-leaf">—</span>
      }
      return <span className="sg-tree-switcher sg-tree-switcher-noop" />
    }

    if (loading) {
      return <span className="sg-tree-switcher sg-tree-switcher-loading"><Spin size="small" /></span>
    }

    let iconContent: React.ReactNode
    if (switcherIcon) {
      iconContent = typeof switcherIcon === 'function'
        ? switcherIcon({ expanded, loading, isLeaf })
        : switcherIcon
    } else {
      iconContent = expanded ? '▾' : '▸'
    }

    return (
      <span
        className={`sg-tree-switcher${expanded ? ' sg-tree-switcher-open' : ' sg-tree-switcher-close'}`}
        onClick={handleSwitcherClick}
      >
        {iconContent}
      </span>
    )
  }

  // Node icon
  const renderIcon = () => {
    if (!showIcon && !directory) return null
    const iconSource = nodeIcon ?? globalIcon
    let iconContent: React.ReactNode = null

    if (iconSource) {
      iconContent = typeof iconSource === 'function'
        ? iconSource({ expanded, selected })
        : iconSource
    } else if (directory) {
      iconContent = expanded ? '📂' : '📁'
    }

    if (!iconContent) return null
    return <span className="sg-tree-icon">{iconContent}</span>
  }

  if (unstyled) {
    return (
      <div
        role="treeitem"
        aria-expanded={isLeaf ? undefined : expanded}
        aria-selected={selected}
        aria-checked={checkable ? checked : undefined}
        aria-level={depth + 1}
        data-key={nodeKey}
      >
        {checkable && (
          <Checkbox
            checked={checked}
            indeterminate={halfChecked}
            disabled={disabled || node.disableCheckbox}
            onChange={handleCheckChange}
            unstyled
          />
        )}
        <span onClick={handleSelect}>{node.title ?? String(nodeKey)}</span>
      </div>
    )
  }

  const rowCls = [
    'sg-tree-node',
    selected ? 'sg-tree-node-selected' : '',
    disabled ? 'sg-tree-node-disabled' : '',
    isLeaf ? 'sg-tree-node-leaf' : '',
    expanded ? 'sg-tree-node-expanded' : '',
    draggable ? 'sg-tree-node-draggable' : '',
    dropPosition === 0 ? 'sg-tree-node-drop-inner' : '',
    dropPosition === -1 ? 'sg-tree-node-drop-before' : '',
    dropPosition === 1 ? 'sg-tree-node-drop-after' : '',
    showLine ? 'sg-tree-node-show-line' : '',
    blockNode ? 'sg-tree-node-block' : '',
    directory ? 'sg-tree-node-directory' : '',
    nodeClassName,
  ].filter(Boolean).join(' ')

  return (
    <div
      className={rowCls}
      style={{ ...nodeStyle, paddingLeft: depth * indentSize }}
      role="treeitem"
      aria-expanded={isLeaf ? undefined : expanded}
      aria-selected={selected}
      aria-checked={checkable ? checked : undefined}
      aria-level={depth + 1}
      draggable={draggable}
      onDragStart={draggable ? (e) => onDragStart(e, nodeKey) : undefined}
      onDragOver={draggable ? (e) => { e.preventDefault(); onDragOver(e, nodeKey) } : undefined}
      onDragLeave={draggable ? (e) => onDragLeave(e, nodeKey) : undefined}
      onDragEnd={draggable ? (e) => onDragEnd(e, nodeKey) : undefined}
      onDrop={draggable ? (e) => { e.preventDefault(); onDrop(e, nodeKey) } : undefined}
      onContextMenu={handleContextMenu}
    >
      {renderSwitcher()}

      {checkable && node.checkable !== false && (
        <Checkbox
          checked={checked}
          indeterminate={halfChecked}
          disabled={disabled || node.disableCheckbox}
          onChange={handleCheckChange}
        />
      )}

      {renderIcon()}

      <span
        className={`sg-tree-title${selectable ? ' sg-tree-title-selectable' : ''}`}
        onClick={handleSelect}
      >
        {node.title ?? String(nodeKey)}
      </span>
    </div>
  )
}
