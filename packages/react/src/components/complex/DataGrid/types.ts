import React from 'react'

export type CellValue = string | number | boolean | null | undefined

export interface DataGridColumn<R = Record<string, unknown>> {
  key: string
  title: React.ReactNode
  width?: number
  minWidth?: number
  maxWidth?: number
  frozen?: 'left' | 'right'
  resizable?: boolean
  sortable?: boolean
  editable?: boolean | ((row: R, rowIndex: number) => boolean)
  align?: 'left' | 'center' | 'right'
  render?: (value: CellValue, row: R, rowIndex: number) => React.ReactNode
  editor?: (props: CellEditorProps<R>) => React.ReactNode
  formula?: (row: R) => CellValue
  className?: string
  headerClassName?: string
}

export interface CellEditorProps<R = Record<string, unknown>> {
  value: CellValue
  row: R
  rowIndex: number
  column: DataGridColumn<R>
  onChange: (value: CellValue) => void
  onCommit: () => void
  onCancel: () => void
}

export interface CellPosition {
  row: number
  col: number
}

export interface CellRange {
  start: CellPosition
  end: CellPosition
}

export interface DataGridProps<R = Record<string, unknown>> {
  columns: DataGridColumn<R>[]
  data: R[]
  rowKey: keyof R | ((row: R, index: number) => React.Key)
  rowHeight?: number
  headerHeight?: number
  width?: number | string
  height?: number | string
  className?: string
  style?: React.CSSProperties

  /** Selection */
  selectedRows?: Set<React.Key>
  onSelectedRowsChange?: (keys: Set<React.Key>) => void

  /** Editing */
  onCellEdit?: (rowIndex: number, columnKey: string, value: CellValue) => void

  /** Sorting */
  sortColumn?: string
  sortDirection?: 'asc' | 'desc'
  onSort?: (column: string, direction: 'asc' | 'desc') => void

  /** Clipboard */
  onCopy?: (data: string) => void
  onPaste?: (data: string, target: CellPosition) => void

  /** Keyboard */
  onCellKeyDown?: (e: React.KeyboardEvent, cell: CellPosition) => void

  /** Virtual scroll */
  overscan?: number

  locale?: DataGridLocale
}

export interface DataGridLocale {
  noData?: string
  selectAll?: string
}

export interface DataGridRef {
  scrollToRow: (index: number, align?: 'start' | 'center' | 'end') => void
  scrollToColumn: (index: number) => void
  getActiveCell: () => CellPosition | null
  setActiveCell: (pos: CellPosition | null) => void
}
