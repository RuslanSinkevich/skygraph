import type React from 'react'

export interface TransferItem {
  key: string
  title: string
  description?: string
  disabled?: boolean
}

export interface TransferProps {
  dataSource: TransferItem[]
  targetKeys: string[]
  onChange?: (targetKeys: string[], direction: 'left' | 'right', moveKeys: string[]) => void
  selectedKeys?: string[]
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void
  titles?: [React.ReactNode, React.ReactNode]
  render?: (item: TransferItem) => React.ReactNode
  showSearch?: boolean
  filterOption?: (inputValue: string, item: TransferItem) => boolean
  searchPlaceholder?: string
  showSelectAll?: boolean
  disabled?: boolean
  oneWay?: boolean
  pagination?: boolean | { pageSize?: number }
  locale?: {
    itemUnit?: string
    itemsUnit?: string
    searchPlaceholder?: string
    notFoundContent?: React.ReactNode
    selectAll?: string
    deselectAll?: string
  }
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}

export interface TransferListProps {
  items: TransferItem[]
  selectedKeys: string[]
  onSelect: (keys: string[]) => void
  title?: React.ReactNode
  render?: (item: TransferItem) => React.ReactNode
  showSearch?: boolean
  filterOption?: (inputValue: string, item: TransferItem) => boolean
  searchPlaceholder?: string
  showSelectAll?: boolean
  disabled?: boolean
  pagination?: boolean | { pageSize?: number }
  locale: Required<TransferLocale>
  direction: 'left' | 'right'
  unstyled?: boolean
}

export interface TransferLocale {
  itemUnit?: string
  itemsUnit?: string
  searchPlaceholder?: string
  notFoundContent?: React.ReactNode
  selectAll?: string
  deselectAll?: string
}

export const DEFAULT_TRANSFER_LOCALE: Required<TransferLocale> = {
  itemUnit: 'item',
  itemsUnit: 'items',
  searchPlaceholder: 'Search here',
  notFoundContent: 'Not Found',
  selectAll: 'Select all',
  deselectAll: 'Deselect all',
}
