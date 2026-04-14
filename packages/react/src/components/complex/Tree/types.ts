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

export interface EditInfo {
  key: TreeKey
  node: TreeNodeData
  value: string
  oldValue: string
}

export type TreeNodeStatus = 'default' | 'success' | 'warning' | 'error' | 'info'

export interface TreeNodeAction {
  key: string
  icon?: React.ReactNode
  title?: string
  onClick: (node: TreeNodeData, key: TreeKey) => void
  visible?: (node: TreeNodeData) => boolean
  disabled?: (node: TreeNodeData) => boolean
  danger?: boolean
}

export interface TreeLocale {
  emptyText?: React.ReactNode
  loadingText?: string
  searchPlaceholder?: string
  expandAllText?: string
  collapseAllText?: string
  checkAllText?: string
  uncheckAllText?: string
}

export const DEFAULT_TREE_LOCALE: Required<TreeLocale> = {
  emptyText: 'No data',
  loadingText: 'Loading...',
  searchPlaceholder: 'Search...',
  expandAllText: 'Expand All',
  collapseAllText: 'Collapse All',
  checkAllText: 'Check All',
  uncheckAllText: 'Uncheck All',
}

export const DEFAULT_INDENT = 24
export const NODE_HEIGHT = 28

export interface TreeProps {
  treeData: TreeNodeData[]
  fieldNames?: TreeFieldNames

  // --- Checkable ---
  checkable?: boolean
  checkStrictly?: boolean
  checkedKeys?: TreeKey[]
  defaultCheckedKeys?: TreeKey[]
  onCheck?: (checkedKeys: TreeKey[], info: CheckInfo) => void

  // --- Selectable ---
  selectable?: boolean
  multiple?: boolean
  selectedKeys?: TreeKey[]
  defaultSelectedKeys?: TreeKey[]
  onSelect?: (selectedKeys: TreeKey[], info: SelectInfo) => void

  // --- Expandable ---
  expandedKeys?: TreeKey[]
  defaultExpandedKeys?: TreeKey[]
  defaultExpandAll?: boolean
  autoExpandParent?: boolean
  onExpand?: (expandedKeys: TreeKey[], info: ExpandInfo) => void

  // --- Drag & drop ---
  draggable?: boolean | ((node: TreeNodeData) => boolean)
  allowDrop?: (info: { dragNode: TreeNodeData; dropNode: TreeNodeData; dropPosition: -1 | 0 | 1 }) => boolean
  onDragStart?: (info: DragInfo) => void
  onDragEnter?: (info: DragInfo) => void
  onDragOver?: (info: DragInfo) => void
  onDragLeave?: (info: DragInfo) => void
  onDragEnd?: (info: DragInfo) => void
  onDrop?: (info: DropInfo) => void

  // --- Async loading ---
  loadData?: (node: TreeNodeData) => Promise<void>
  loadedKeys?: TreeKey[]

  // --- Display ---
  showLine?: boolean | { showLeafIcon?: boolean | React.ReactNode }
  showIcon?: boolean
  icon?: React.ReactNode | ((props: { expanded: boolean; selected: boolean }) => React.ReactNode)
  switcherIcon?: React.ReactNode | ((props: { expanded: boolean; loading: boolean; isLeaf: boolean }) => React.ReactNode)
  blockNode?: boolean
  height?: number
  virtual?: boolean
  disabled?: boolean
  indentSize?: number

  // --- Directory mode ---
  directory?: boolean

  // --- Right-click ---
  onRightClick?: (info: { event: React.MouseEvent; node: TreeNodeData }) => void

  // --- Search / filter ---
  showSearch?: boolean
  searchValue?: string
  defaultSearchValue?: string
  onSearch?: (value: string) => void
  filterTreeNode?: (node: TreeNodeData, searchValue: string) => boolean
  highlightSearch?: boolean

  // --- Keyboard navigation ---
  keyboard?: boolean

  // --- Editable nodes ---
  editable?: boolean | ((node: TreeNodeData) => boolean)
  onEdit?: (info: EditInfo) => void
  onEditCancel?: (key: TreeKey) => void

  // --- Custom render ---
  titleRender?: (node: TreeNodeData, info: { expanded: boolean; selected: boolean; checked: boolean; halfChecked: boolean }) => React.ReactNode

  // --- Node actions (hover buttons) ---
  actions?: TreeNodeAction[]

  // --- Toolbar ---
  showToolbar?: boolean
  toolbarExtra?: React.ReactNode

  // --- Animation ---
  animated?: boolean

  // --- Focus ---
  autoFocus?: boolean
  focusedKey?: TreeKey
  onFocus?: (key: TreeKey) => void

  // --- Scroll ---
  scrollToKey?: TreeKey

  // --- Status ---
  nodeStatus?: (node: TreeNodeData) => TreeNodeStatus

  // --- Locale ---
  locale?: TreeLocale

  // --- Style ---
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}
