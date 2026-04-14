import type React from 'react'
import type { UseTableOptions } from '../../../hooks/useTable'
import type { RowId, SortConfig, SortDirection } from '@skygraph/core'
import type { BaseComponentProps, InteractiveProps, SizableProps } from '../../../types'
import type { ContextMenuItem } from './ContextMenu'

export type { RowId, SortDirection, SortConfig }

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
  hidden?: boolean
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
  selectedRows?: (count: number) => string
  exportCSV?: string
  copyTable?: string
  pinLeft?: string
  pinRight?: string
  unpin?: string
  showColumns?: string
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
  selectedRows: (count) => `${count} selected`,
  exportCSV: 'Export CSV',
  copyTable: 'Copy',
  pinLeft: 'Pin Left',
  pinRight: 'Pin Right',
  unpin: 'Unpin',
  showColumns: 'Show Columns',
}

export const DEFAULT_COL_WIDTH = 150
export const MIN_COL_WIDTH = 50
export const SELECTION_COL_WIDTH = '40px'

export interface SelectionSummaryAction {
  key: string
  label: React.ReactNode
  onClick: (selectedKeys: RowId[], selectedRows: Array<Record<string, unknown>>) => void
  danger?: boolean
}

export interface TableProps extends Omit<UseTableOptions, 'columns'>, BaseComponentProps, InteractiveProps, SizableProps {
  columns: TableColumn[]
  rowSelection?: RowSelectionConfig
  expandable?: ExpandableConfig
  tree?: TreeConfig
  sticky?: boolean
  draggable?: boolean
  searchable?: boolean
  showPagination?: boolean
  bordered?: boolean

  scroll?: { x?: number | string; y?: number | string }
  summary?: (data: Array<{ id: RowId; data: Record<string, unknown> }>) => SummaryCell[][]
  onRowClick?: (id: RowId, data: Record<string, unknown>) => void
  onCellEdit?: (id: RowId, column: string, value: unknown) => void
  onColumnOrderChange?: (order: string[]) => void
  rowClassName?: string | ((row: Record<string, unknown>, id: RowId) => string)
  locale?: TableLocale

  // Multi-sort
  multiSort?: boolean
  sorts?: SortConfig[]
  onSortsChange?: (sorts: SortConfig[]) => void

  // Row drag & drop
  rowDraggable?: boolean
  onRowOrderChange?: (fromIndex: number, toIndex: number) => void

  // Context menu
  headerContextMenu?: (column: TableColumn) => ContextMenuItem[]
  cellContextMenu?: (id: RowId, column: string, data: Record<string, unknown>) => ContextMenuItem[]

  // Column visibility
  columnVisibility?: boolean
  hiddenColumns?: string[]
  onHiddenColumnsChange?: (keys: string[]) => void

  // Column pinning
  columnPinning?: boolean
  onColumnPinChange?: (key: string, fixed: 'left' | 'right' | undefined) => void

  // Virtual scroll
  virtual?: boolean | { rowHeight?: number; overscan?: number }

  // Export
  exportable?: boolean
  onExport?: (data: string[][]) => void

  // Selection summary bar
  selectionSummary?: boolean
  selectionActions?: SelectionSummaryAction[]

  // Zebra striping
  striped?: boolean

  // Advanced pagination
  showSizeChanger?: boolean
  pageSizeOptions?: number[]
  showQuickJumper?: boolean
  showTotal?: boolean | ((total: number, range: [number, number]) => React.ReactNode)
  onPageSizeChange?: (size: number) => void
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
