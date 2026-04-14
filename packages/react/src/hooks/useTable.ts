import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { createCore, createTable } from '@skygraph/core'
import type {
  Core,
  TableEngine,
  TableState,
  TableOptions,
  RowId,
  SortDirection,
  SortConfig,
  ColumnFilter,
} from '@skygraph/core'

export interface UseTableOptions extends TableOptions {
  data?: Array<{ id: RowId; data: Record<string, unknown> }>
}

export type FilterFn = (row: Record<string, unknown>) => boolean

export interface UseTableReturn {
  core: Core
  table: TableEngine
  visibleRows: Array<{ id: RowId; data: Record<string, unknown> }>
  tableState: TableState
  setSort: (column: string, direction: SortDirection) => void
  setSorts: (sorts: SortConfig[]) => void
  clearSort: () => void
  addFilter: (filter: ColumnFilter) => void
  removeFilter: (column: string) => void
  clearFilters: () => void
  setFilterFn: (fn: FilterFn | null) => void
  setPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  refresh: () => void
}

export function useTable(options?: UseTableOptions): UseTableReturn {
  const [{ core, table }] = useState(() => {
    const c = createCore()
    const t = createTable(c, options)
    if (options?.data) {
      t.addRows(options.data)
    }
    return { core: c, table: t }
  })

  const [visibleRows, setVisibleRows] = useState(() => table.getVisibleRows())
  const [tableState, setTableState] = useState(() => table.getTableState())

  const prevDataRef = useRef(options?.data)
  useEffect(() => {
    const newData = options?.data
    if (newData === prevDataRef.current) return
    prevDataRef.current = newData

    table.reset()
    if (newData) {
      table.addRows(newData)
    }
    setVisibleRows(table.getVisibleRows())
    setTableState(table.getTableState())
  }, [options?.data, table])

  const refresh = useCallback(() => {
    setVisibleRows(table.getVisibleRows())
    setTableState(table.getTableState())
  }, [table])

  const setSort = useCallback(
    (column: string, direction: SortDirection) => {
      table.setSort(column, direction)
      refresh()
    },
    [table, refresh]
  )

  const setSorts = useCallback(
    (sorts: SortConfig[]) => {
      table.setSorts(sorts)
      refresh()
    },
    [table, refresh]
  )

  const clearSort = useCallback(() => {
    table.clearSort()
    refresh()
  }, [table, refresh])

  const addFilter = useCallback(
    (filter: ColumnFilter) => {
      table.addFilter(filter)
      refresh()
    },
    [table, refresh]
  )

  const removeFilter = useCallback(
    (column: string) => {
      table.removeFilter(column)
      refresh()
    },
    [table, refresh]
  )

  const clearFilters = useCallback(() => {
    table.clearFilters()
    refresh()
  }, [table, refresh])

  const setFilterFn = useCallback(
    (fn: FilterFn | null) => {
      table.setFilterFn(fn)
      refresh()
    },
    [table, refresh]
  )

  const setPage = useCallback(
    (page: number) => {
      table.setPage(page)
      refresh()
    },
    [table, refresh]
  )

  const nextPage = useCallback(() => {
    table.nextPage()
    refresh()
  }, [table, refresh])

  const prevPage = useCallback(() => {
    table.prevPage()
    refresh()
  }, [table, refresh])

  return useMemo(
    () => ({
      core,
      table,
      visibleRows,
      tableState,
      setSort,
      setSorts,
      clearSort,
      addFilter,
      removeFilter,
      clearFilters,
      setFilterFn,
      setPage,
      nextPage,
      prevPage,
      refresh,
    }),
    [
      core,
      table,
      visibleRows,
      tableState,
      setSort,
      setSorts,
      clearSort,
      addFilter,
      removeFilter,
      clearFilters,
      setFilterFn,
      setPage,
      nextPage,
      prevPage,
      refresh,
    ]
  )
}
