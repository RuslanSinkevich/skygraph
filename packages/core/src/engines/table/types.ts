export type RowId = string

export type SortDirection = 'asc' | 'desc'

export interface SortConfig {
  column: string
  direction: SortDirection
}

export type FilterFn = (row: Record<string, unknown>) => boolean

export interface ColumnFilter {
  column: string
  value: unknown
  operator?: 'eq' | 'contains' | 'gt' | 'lt' | 'gte' | 'lte'
}

export interface ExportOptions {
  allRows?: boolean
  columns?: string[]
  headers?: boolean
}

export interface TableState {
  totalRows: number
  filteredRows: number
  page: number
  pageSize: number
  totalPages: number
  sorts: SortConfig[]
  filters: ColumnFilter[]
  /** @deprecated Use sorts[0] instead */
  sort: SortConfig | null
}

export interface TableOptions {
  pageSize?: number
  columns?: string[]
}

export interface TableEngine {
  addRow(id: RowId, data: Record<string, unknown>): void
  addRows(rows: Array<{ id: RowId; data: Record<string, unknown> }>): void
  removeRow(id: RowId): void
  updateCell(id: RowId, column: string, value: unknown): void
  getRow(id: RowId): Record<string, unknown> | undefined
  getCell(id: RowId, column: string): unknown

  getVisibleRows(): Array<{ id: RowId; data: Record<string, unknown> }>
  getAllRowIds(): RowId[]
  getAllRows(): Array<{ id: RowId; data: Record<string, unknown> }>

  setSort(column: string, direction: SortDirection, append?: boolean): void
  setSorts(sorts: SortConfig[]): void
  clearSort(): void

  addFilter(filter: ColumnFilter): void
  removeFilter(column: string): void
  clearFilters(): void
  setFilterFn(fn: FilterFn | null): void

  setPage(page: number): void
  setPageSize(size: number): void
  nextPage(): void
  prevPage(): void

  moveRow(fromIndex: number, toIndex: number): void
  moveRows(ids: RowId[], toIndex: number): void

  /** Pin a column to a side, or unpin (`side = null`). */
  pinColumn(column: string, side: 'left' | 'right' | null): void
  /** Snapshot of currently pinned columns. */
  getPinnedColumns(): { left: string[]; right: string[] }
  /** Drop all pin assignments. */
  clearPinned(): void

  /**
   * Persist a column's pixel width. Mirrored into the Core store under
   * `$table.<id>.state.columnWidths`, so React adapters can react via
   * `core.subscribe` and so widths survive re-mounts that recreate the
   * engine from a snapshot.
   */
  setColumnWidth(column: string, width: number): void
  /** Get the persisted width for a column, or `undefined` when unset. */
  getColumnWidth(column: string): number | undefined
  /** Snapshot of all persisted column widths (key → px). */
  getColumnWidths(): Record<string, number>
  /** Drop all persisted widths. */
  clearColumnWidths(): void

  getExportData(options?: ExportOptions): string[][]

  getTableState(): TableState

  reset(): void
}
