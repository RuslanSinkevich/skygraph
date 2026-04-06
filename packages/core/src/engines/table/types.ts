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

export interface TableState {
  totalRows: number
  filteredRows: number
  page: number
  pageSize: number
  totalPages: number
  sort: SortConfig | null
  filters: ColumnFilter[]
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

  setSort(column: string, direction: SortDirection): void
  clearSort(): void

  addFilter(filter: ColumnFilter): void
  removeFilter(column: string): void
  clearFilters(): void
  setFilterFn(fn: FilterFn | null): void

  setPage(page: number): void
  setPageSize(size: number): void
  nextPage(): void
  prevPage(): void

  getTableState(): TableState

  reset(): void
}
