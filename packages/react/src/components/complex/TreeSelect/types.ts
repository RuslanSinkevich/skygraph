import type React from 'react'
import type { TreeNodeData, TreeFieldNames, TreeKey } from '@skygraph/core'

export type { TreeNodeData, TreeFieldNames, TreeKey }

export interface TreeSelectProps {
  treeData: TreeNodeData[]
  value?: TreeKey | TreeKey[]
  defaultValue?: TreeKey | TreeKey[]
  onChange?: (value: TreeKey | TreeKey[], label: React.ReactNode[], extra: { triggerNode: TreeNodeData }) => void
  fieldNames?: TreeFieldNames
  multiple?: boolean
  treeCheckable?: boolean
  treeCheckStrictly?: boolean
  treeDefaultExpandAll?: boolean
  treeDefaultExpandedKeys?: TreeKey[]
  showSearch?: boolean
  filterTreeNode?: (inputValue: string, treeNode: TreeNodeData) => boolean
  placeholder?: string
  allowClear?: boolean
  disabled?: boolean
  size?: 'small' | 'middle' | 'large'
  maxTagCount?: number
  dropdownStyle?: React.CSSProperties
  treeLine?: boolean
  showCheckedStrategy?: 'SHOW_ALL' | 'SHOW_PARENT' | 'SHOW_CHILD'
  onSearch?: (value: string) => void
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}
