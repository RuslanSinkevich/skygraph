import type React from 'react'
import type { UseTableOptions } from '../../../hooks/useTable'
import type { RowId, SortDirection } from '@skygraph/core'

export type { RowId, SortDirection }

export interface CellSpan {
  rowSpan?: number
  colSpan?: number
}

export interface FilterDropdownProps {
  selectedKeys: unknown[]
  setSelectedKeys: (keys: unknown[]) => void
  confirm: () => void
  clearFilters: () => void
  close: () => void
}

export interface TableColumn {
  key: string
  title: React.ReactNode
  width?: number
  minWidth?: number
  sortable?: boolean
  resizable?: boolean
  editable?: boolean
  fixed?: 'left' | 'right'
  ellipsis?: boolean
  align?: 'left' | 'center' | 'right'
  filters?: Array<{ text: string; value: unknown }>
  onFilter?: (value: unknown, row: Record<string, unknown>) => boolean
  filterDropdown?: React.ReactNode | ((props: FilterDropdownProps) => React.ReactNode)
  filterIcon?: React.ReactNode | ((filtered: boolean) => React.ReactNode)
  filterMultiple?: boolean
  filterSearch?: boolean | ((input: string, record: { text: string; value: unknown }) => boolean)
  filterMode?: 'menu' | 'search'
  filteredValue?: unknown[]
  defaultFilteredValue?: unknown[]
  render?: (value: unknown, row: Record<string, unknown>, id: RowId) => React.ReactNode
  onCell?: (row: Record<string, unknown>, rowIndex: number) => CellSpan
  children?: TableColumn[]
}

export interface RowSelectionConfig {
  selectedKeys: RowId[]
  onChange: (keys: RowId[], rows: Array<Record<string, unknown>>) => void
  type?: 'checkbox' | 'radio'
}

export interface ExpandableConfig {
  expandedRowRender: (row: Record<string, unknown>, id: RowId) => React.ReactNode
  expandedKeys?: RowId[]
  onExpand?: (expanded: boolean, id: RowId) => void
  rowExpandable?: (row: Record<string, unknown>) => boolean
}

export interface TreeConfig {
  childrenColumnName?: string
  indentSize?: number
  defaultExpandAllRows?: boolean
}

export interface SummaryCell {
  content: React.ReactNode
  colSpan?: number
  align?: 'left' | 'center' | 'right'
}

export interface TableLocale {
  emptyText?: React.ReactNode
  filterReset?: string
  filterConfirm?: string
  filterSearchPlaceholder?: string
  filterEmptyText?: string
  searchPlaceholder?: string
  sortAsc?: React.ReactNode
  sortDesc?: React.ReactNode
  expandIcon?: React.ReactNode
  filterIcon?: React.ReactNode
  searchIcon?: React.ReactNode
  totalRows?: (count: number) => string
}

export const DEFAULT_LOCALE: Required<TableLocale> = {
  emptyText: 'No data',
  filterReset: 'Reset',
  filterConfirm: 'OK',
  filterSearchPlaceholder: 'Search filters...',
  filterEmptyText: 'No filters',
  searchPlaceholder: 'Search...',
  sortAsc: '▲',
  sortDesc: '▼',
  expandIcon: '›',
  filterIcon: '▾',
  searchIcon: '🔍',
  totalRows: (count) => `${count} rows`,
}

export const DEFAULT_COL_WIDTH = 150
export const MIN_COL_WIDTH = 50
export const SELECTION_COL_WIDTH = '40px'

export interface TableProps extends Omit<UseTableOptions, 'columns'> {
  columns: TableColumn[]
  rowSelection?: RowSelectionConfig
  expandable?: ExpandableConfig
  tree?: TreeConfig
  sticky?: boolean
  draggable?: boolean
  searchable?: boolean
  showPagination?: boolean
  bordered?: boolean
  size?: 'small' | 'middle' | 'large'
  scroll?: { x?: number | string; y?: number | string }
  summary?: (data: Array<{ id: RowId; data: Record<string, unknown> }>) => SummaryCell[][]
  onRowClick?: (id: RowId, data: Record<string, unknown>) => void
  onCellEdit?: (id: RowId, column: string, value: unknown) => void
  onColumnOrderChange?: (order: string[]) => void
  loading?: boolean
  rowClassName?: string | ((row: Record<string, unknown>, id: RowId) => string)
  locale?: TableLocale
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}

export interface HeaderCell {
  col: TableColumn
  colSpan: number
  rowSpan: number
}

export interface FlatRow {
  id: RowId
  data: Record<string, unknown>
  depth: number
  hasChildren: boolean
}
