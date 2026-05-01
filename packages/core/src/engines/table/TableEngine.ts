import type { Core } from '../../types'
import type {
  ColumnFilter,
  ExportOptions,
  FilterFn,
  RowId,
  SortConfig,
  SortDirection,
  TableEngine,
  TableOptions,
  TableState,
} from './types'

import { TABLE_PREFIX } from '../namespaces'

function rowPath(tableId: string, rowId: RowId, column: string): string {
  return `${TABLE_PREFIX}${tableId}.byId.${rowId}.${column}`
}

function statePath(tableId: string, key: string): string {
  return `${TABLE_PREFIX}${tableId}.state.${key}`
}

let tableCounter = 0

export function createTable(core: Core, options?: TableOptions): TableEngine {
  const tableId = `t${tableCounter++}`
  let currentPageSize = options?.pageSize ?? 50

  let order: RowId[] = []
  let filteredOrder: RowId[] = []
  let sorts: SortConfig[] = []
  let filters: ColumnFilter[] = []
  let customFilterFn: FilterFn | null = null
  let page = 1
  let pinnedLeft: string[] = []
  let pinnedRight: string[] = []

  function getRowData(id: RowId): Record<string, unknown> | undefined {
    const prefix = `${TABLE_PREFIX}${tableId}.byId.${id}.`
    const data: Record<string, unknown> = {}
    let found = false

    if (options?.columns) {
      for (const col of options.columns) {
        const val = core.get(`${prefix}${col}`)
        if (val !== undefined) found = true
        data[col] = val
      }
    } else {
      const stored = core.get(`${TABLE_PREFIX}${tableId}.byId.${id}.__keys`) as
        | string[]
        | undefined
      if (!stored) return undefined
      found = true
      for (const col of stored) {
        data[col] = core.get(`${prefix}${col}`)
      }
    }

    return found ? data : undefined
  }

  function matchesFilters(rowData: Record<string, unknown>): boolean {
    if (customFilterFn && !customFilterFn(rowData)) return false

    for (const f of filters) {
      const val = rowData[f.column]
      const op = f.operator ?? 'eq'

      switch (op) {
        case 'eq':
          if (val !== f.value) return false
          break
        case 'contains':
          if (
            typeof val !== 'string' ||
            !val.toLowerCase().includes(String(f.value).toLowerCase())
          )
            return false
          break
        case 'gt':
          if (typeof val !== 'number' || typeof f.value !== 'number' || val <= f.value) return false
          break
        case 'lt':
          if (typeof val !== 'number' || typeof f.value !== 'number' || val >= f.value) return false
          break
        case 'gte':
          if (typeof val !== 'number' || typeof f.value !== 'number' || val < f.value) return false
          break
        case 'lte':
          if (typeof val !== 'number' || typeof f.value !== 'number' || val > f.value) return false
          break
      }
    }
    return true
  }

  function compareBySort(a: RowId, b: RowId): number {
    const aData = getRowData(a)
    const bData = getRowData(b)

    for (const s of sorts) {
      const aVal = aData?.[s.column]
      const bVal = bData?.[s.column]

      if (aVal === bVal) continue
      if (aVal === undefined || aVal === null) return 1
      if (bVal === undefined || bVal === null) return -1

      const cmp = aVal < bVal ? -1 : 1
      return s.direction === 'asc' ? cmp : -cmp
    }
    return 0
  }

  function recomputeFiltered(): void {
    if (filters.length === 0 && !customFilterFn) {
      filteredOrder = [...order]
    } else {
      filteredOrder = order.filter((id) => {
        const data = getRowData(id)
        return data ? matchesFilters(data) : false
      })
    }

    if (sorts.length > 0) {
      filteredOrder.sort(compareBySort)
    }

    const totalPages = Math.max(1, Math.ceil(filteredOrder.length / currentPageSize))
    if (page > totalPages) page = totalPages

    publishState()
  }

  function publishState(): void {
    const totalPages = Math.max(1, Math.ceil(filteredOrder.length / currentPageSize))
    core.set(statePath(tableId, 'totalRows'), order.length)
    core.set(statePath(tableId, 'filteredRows'), filteredOrder.length)
    core.set(statePath(tableId, 'page'), page)
    core.set(statePath(tableId, 'pageSize'), currentPageSize)
    core.set(statePath(tableId, 'totalPages'), totalPages)
  }

  function getColumnKeys(): string[] {
    if (options?.columns) return options.columns
    if (order.length === 0) return []
    const first = getRowData(order[0])
    return first ? Object.keys(first) : []
  }

  const table: TableEngine = {
    addRow(id: RowId, data: Record<string, unknown>): void {
      const keys = Object.keys(data)
      core.batch(() => {
        core.set(`${TABLE_PREFIX}${tableId}.byId.${id}.__keys`, keys)
        for (const [col, val] of Object.entries(data)) {
          core.set(rowPath(tableId, id, col), val)
        }
      })
      order.push(id)
      recomputeFiltered()
    },

    addRows(rows: Array<{ id: RowId; data: Record<string, unknown> }>): void {
      core.batch(() => {
        for (const row of rows) {
          const keys = Object.keys(row.data)
          core.set(`${TABLE_PREFIX}${tableId}.byId.${row.id}.__keys`, keys)
          for (const [col, val] of Object.entries(row.data)) {
            core.set(rowPath(tableId, row.id, col), val)
          }
          order.push(row.id)
        }
      })
      recomputeFiltered()
    },

    removeRow(id: RowId): void {
      const idx = order.indexOf(id)
      if (idx === -1) return
      order.splice(idx, 1)
      recomputeFiltered()
    },

    updateCell(id: RowId, column: string, value: unknown): void {
      core.set(rowPath(tableId, id, column), value)
      recomputeFiltered()
    },

    getRow(id: RowId): Record<string, unknown> | undefined {
      return getRowData(id)
    },

    getCell(id: RowId, column: string): unknown {
      return core.get(rowPath(tableId, id, column))
    },

    getVisibleRows(): Array<{ id: RowId; data: Record<string, unknown> }> {
      const start = (page - 1) * currentPageSize
      const end = start + currentPageSize
      const slice = filteredOrder.slice(start, end)
      return slice.map((id) => ({ id, data: getRowData(id) ?? {} }))
    },

    getAllRowIds(): RowId[] {
      return [...order]
    },

    getAllRows(): Array<{ id: RowId; data: Record<string, unknown> }> {
      return filteredOrder.map((id) => ({ id, data: getRowData(id) ?? {} }))
    },

    setSort(column: string, direction: SortDirection, append?: boolean): void {
      if (append) {
        sorts = sorts.filter((s) => s.column !== column)
        sorts.push({ column, direction })
      } else {
        sorts = [{ column, direction }]
      }
      recomputeFiltered()
    },

    setSorts(newSorts: SortConfig[]): void {
      sorts = [...newSorts]
      recomputeFiltered()
    },

    clearSort(): void {
      sorts = []
      recomputeFiltered()
    },

    addFilter(filter: ColumnFilter): void {
      filters = filters.filter((f) => f.column !== filter.column)
      filters.push(filter)
      page = 1
      recomputeFiltered()
    },

    removeFilter(column: string): void {
      filters = filters.filter((f) => f.column !== column)
      recomputeFiltered()
    },

    clearFilters(): void {
      filters = []
      customFilterFn = null
      recomputeFiltered()
    },

    setFilterFn(fn: FilterFn | null): void {
      customFilterFn = fn
      recomputeFiltered()
    },

    setPage(p: number): void {
      const totalPages = Math.max(1, Math.ceil(filteredOrder.length / currentPageSize))
      page = Math.max(1, Math.min(p, totalPages))
      publishState()
    },

    setPageSize(size: number): void {
      currentPageSize = size
      page = 1
      recomputeFiltered()
    },

    nextPage(): void {
      table.setPage(page + 1)
    },

    prevPage(): void {
      table.setPage(page - 1)
    },

    moveRow(fromIndex: number, toIndex: number): void {
      if (fromIndex < 0 || fromIndex >= order.length) return
      if (toIndex < 0 || toIndex >= order.length) return
      if (fromIndex === toIndex) return

      const [item] = order.splice(fromIndex, 1)
      order.splice(toIndex, 0, item)
      recomputeFiltered()
    },

    pinColumn(column: string, side: 'left' | 'right' | null): void {
      pinnedLeft = pinnedLeft.filter((c) => c !== column)
      pinnedRight = pinnedRight.filter((c) => c !== column)
      if (side === 'left') pinnedLeft.push(column)
      else if (side === 'right') pinnedRight.push(column)
      core.set(statePath(tableId, 'pinnedLeft'), [...pinnedLeft])
      core.set(statePath(tableId, 'pinnedRight'), [...pinnedRight])
    },

    getPinnedColumns(): { left: string[]; right: string[] } {
      return { left: [...pinnedLeft], right: [...pinnedRight] }
    },

    clearPinned(): void {
      pinnedLeft = []
      pinnedRight = []
      core.set(statePath(tableId, 'pinnedLeft'), [])
      core.set(statePath(tableId, 'pinnedRight'), [])
    },

    moveRows(ids: RowId[], toIndex: number): void {
      const items = ids.map((id) => {
        const idx = order.indexOf(id)
        return { id, idx }
      }).filter((x) => x.idx !== -1)

      if (items.length === 0) return

      const idsSet = new Set(ids)
      const remaining = order.filter((id) => !idsSet.has(id))
      const clamped = Math.max(0, Math.min(toIndex, remaining.length))
      remaining.splice(clamped, 0, ...items.map((x) => x.id))
      order = remaining
      recomputeFiltered()
    },

    getExportData(exportOptions?: ExportOptions): string[][] {
      const cols = exportOptions?.columns ?? getColumnKeys()
      const result: string[][] = []

      if (exportOptions?.headers !== false) {
        result.push(cols)
      }

      const sourceIds = exportOptions?.allRows ? filteredOrder : filteredOrder.slice(
        (page - 1) * currentPageSize,
        (page - 1) * currentPageSize + currentPageSize,
      )

      for (const id of sourceIds) {
        const data = getRowData(id)
        if (!data) continue
        result.push(cols.map((col) => {
          const v = data[col]
          return v == null ? '' : String(v)
        }))
      }

      return result
    },

    getTableState(): TableState {
      const totalPages = Math.max(1, Math.ceil(filteredOrder.length / currentPageSize))
      return {
        totalRows: order.length,
        filteredRows: filteredOrder.length,
        page,
        pageSize: currentPageSize,
        totalPages,
        sorts: [...sorts],
        sort: sorts.length > 0 ? sorts[0] : null,
        filters: [...filters],
      }
    },

    reset(): void {
      order = []
      filteredOrder = []
      sorts = []
      filters = []
      customFilterFn = null
      page = 1
      pinnedLeft = []
      pinnedRight = []
      publishState()
    },
  }

  publishState()
  return table
}
