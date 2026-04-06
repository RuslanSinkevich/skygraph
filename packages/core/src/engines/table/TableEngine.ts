import type { Core } from '../../types'
import type {
  ColumnFilter,
  FilterFn,
  RowId,
  SortConfig,
  SortDirection,
  TableEngine,
  TableOptions,
  TableState,
} from './types'

const TABLE_PREFIX = '$table.'

function rowPath(tableId: string, rowId: RowId, column: string): string {
  return `${TABLE_PREFIX}${tableId}.byId.${rowId}.${column}`
}

function statePath(tableId: string, key: string): string {
  return `${TABLE_PREFIX}${tableId}.state.${key}`
}

let tableCounter = 0

export function createTable(core: Core, options?: TableOptions): TableEngine {
  const tableId = `t${tableCounter++}`
  const pageSize = options?.pageSize ?? 50

  let order: RowId[] = []
  let filteredOrder: RowId[] = []
  let sort: SortConfig | null = null
  let filters: ColumnFilter[] = []
  let customFilterFn: FilterFn | null = null
  let page = 1

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
          if (typeof val !== 'number' || val <= (f.value as number))
            return false
          break
        case 'lt':
          if (typeof val !== 'number' || val >= (f.value as number))
            return false
          break
        case 'gte':
          if (typeof val !== 'number' || val < (f.value as number))
            return false
          break
        case 'lte':
          if (typeof val !== 'number' || val > (f.value as number))
            return false
          break
      }
    }
    return true
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

    if (sort) {
      const { column, direction } = sort
      filteredOrder.sort((a, b) => {
        const aData = getRowData(a)
        const bData = getRowData(b)
        const aVal = aData?.[column]
        const bVal = bData?.[column]

        if (aVal === bVal) return 0
        if (aVal === undefined || aVal === null) return 1
        if (bVal === undefined || bVal === null) return -1

        const cmp = aVal < bVal ? -1 : 1
        return direction === 'asc' ? cmp : -cmp
      })
    }

    const totalPages = Math.max(1, Math.ceil(filteredOrder.length / pageSize))
    if (page > totalPages) page = totalPages

    publishState()
  }

  function publishState(): void {
    const totalPages = Math.max(
      1,
      Math.ceil(filteredOrder.length / pageSize)
    )
    core.set(statePath(tableId, 'totalRows'), order.length)
    core.set(statePath(tableId, 'filteredRows'), filteredOrder.length)
    core.set(statePath(tableId, 'page'), page)
    core.set(statePath(tableId, 'pageSize'), pageSize)
    core.set(statePath(tableId, 'totalPages'), totalPages)
  }

  const table: TableEngine = {
    addRow(id: RowId, data: Record<string, unknown>): void {
      const keys = Object.keys(data)
      core.batch(() => {
        core.set(
          `${TABLE_PREFIX}${tableId}.byId.${id}.__keys`,
          keys
        )
        for (const [col, val] of Object.entries(data)) {
          core.set(rowPath(tableId, id, col), val)
        }
      })
      order.push(id)
      recomputeFiltered()
    },

    addRows(
      rows: Array<{ id: RowId; data: Record<string, unknown> }>
    ): void {
      core.batch(() => {
        for (const row of rows) {
          const keys = Object.keys(row.data)
          core.set(
            `${TABLE_PREFIX}${tableId}.byId.${row.id}.__keys`,
            keys
          )
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
      const start = (page - 1) * pageSize
      const end = start + pageSize
      const slice = filteredOrder.slice(start, end)

      return slice.map((id) => ({
        id,
        data: getRowData(id) ?? {},
      }))
    },

    getAllRowIds(): RowId[] {
      return [...order]
    },

    setSort(column: string, direction: SortDirection): void {
      sort = { column, direction }
      recomputeFiltered()
    },

    clearSort(): void {
      sort = null
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
      const totalPages = Math.max(
        1,
        Math.ceil(filteredOrder.length / pageSize)
      )
      page = Math.max(1, Math.min(p, totalPages))
      publishState()
    },

    setPageSize(_size: number): void {
      page = 1
      recomputeFiltered()
    },

    nextPage(): void {
      table.setPage(page + 1)
    },

    prevPage(): void {
      table.setPage(page - 1)
    },

    getTableState(): TableState {
      const totalPages = Math.max(
        1,
        Math.ceil(filteredOrder.length / pageSize)
      )
      return {
        totalRows: order.length,
        filteredRows: filteredOrder.length,
        page,
        pageSize,
        totalPages,
        sort,
        filters: [...filters],
      }
    },

    reset(): void {
      order = []
      filteredOrder = []
      sort = null
      filters = []
      customFilterFn = null
      page = 1
      publishState()
    },
  }

  publishState()
  return table
}
