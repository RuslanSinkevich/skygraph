import type React from 'react'
import type { TreeKey, TreeNodeData, TreeFieldNames } from '@skygraph/core'

export type { TreeKey, TreeNodeData, TreeFieldNames }

export interface CheckInfo {
  checked: boolean
  node: TreeNodeData
  checkedNodes: TreeNodeData[]
  halfCheckedKeys: TreeKey[]
}

export interface SelectInfo {
  selected: boolean
  node: TreeNodeData
  selectedNodes: TreeNodeData[]
}

export interface ExpandInfo {
  expanded: boolean
  node: TreeNodeData
}

export interface DragInfo {
  event: React.DragEvent
  node: TreeNodeData
}

export interface DropInfo {
  event: React.DragEvent
  node: TreeNodeData
  dragNode: TreeNodeData
  dropPosition: -1 | 0 | 1
}

export interface TreeLocale {
  emptyText?: React.ReactNode
  loadingText?: string
}

export const DEFAULT_TREE_LOCALE: Required<TreeLocale> = {
  emptyText: 'No data',
  loadingText: 'Loading...',
}

export const DEFAULT_INDENT = 24

export interface TreeProps {
  treeData: TreeNodeData[]
  fieldNames?: TreeFieldNames

  // Checkable
  checkable?: boolean
  checkStrictly?: boolean
  checkedKeys?: TreeKey[]
  defaultCheckedKeys?: TreeKey[]
  onCheck?: (checkedKeys: TreeKey[], info: CheckInfo) => void

  // Selectable
  selectable?: boolean
  multiple?: boolean
  selectedKeys?: TreeKey[]
  defaultSelectedKeys?: TreeKey[]
  onSelect?: (selectedKeys: TreeKey[], info: SelectInfo) => void

  // Expandable
  expandedKeys?: TreeKey[]
  defaultExpandedKeys?: TreeKey[]
  defaultExpandAll?: boolean
  autoExpandParent?: boolean
  onExpand?: (expandedKeys: TreeKey[], info: ExpandInfo) => void

  // Drag & drop
  draggable?: boolean | ((node: TreeNodeData) => boolean)
  allowDrop?: (info: { dragNode: TreeNodeData; dropNode: TreeNodeData; dropPosition: -1 | 0 | 1 }) => boolean
  onDragStart?: (info: DragInfo) => void
  onDragEnter?: (info: DragInfo) => void
  onDragOver?: (info: DragInfo) => void
  onDragLeave?: (info: DragInfo) => void
  onDragEnd?: (info: DragInfo) => void
  onDrop?: (info: DropInfo) => void

  // Async loading
  loadData?: (node: TreeNodeData) => Promise<void>
  loadedKeys?: TreeKey[]

  // Display
  showLine?: boolean | { showLeafIcon?: boolean | React.ReactNode }
  showIcon?: boolean
  icon?: React.ReactNode | ((props: { expanded: boolean; selected: boolean }) => React.ReactNode)
  switcherIcon?: React.ReactNode | ((props: { expanded: boolean; loading: boolean; isLeaf: boolean }) => React.ReactNode)
  blockNode?: boolean
  height?: number
  virtual?: boolean
  disabled?: boolean
  indentSize?: number

  // Directory mode
  directory?: boolean

  // Right-click
  onRightClick?: (info: { event: React.MouseEvent; node: TreeNodeData }) => void

  // Locale
  locale?: TreeLocale

  // Style
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}
