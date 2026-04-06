import { useState, useRef, useEffect, useMemo } from 'react'
import { useTable } from '../../../hooks/useTable'
import { flattenLeafColumns, buildHeaderRows, flattenTreeRows, collectAllTreeIds, computeSpanMap, computeHiddenCells, getFixedStyle } from './helpers'
import type { TableColumn, TableProps, FlatRow, HeaderCell, FilterDropdownProps, SortDirection, RowId } from './types'
import { DEFAULT_COL_WIDTH, MIN_COL_WIDTH, SELECTION_COL_WIDTH, DEFAULT_LOCALE } from './types'

export function useTableState(props: TableProps) {
  const {
    columns: columnsProp, rowSelection, expandable, tree, draggable,
    searchable, locale, onColumnOrderChange, onCellEdit,
    ...tableOptions
  } = props

  const { visibleRows, tableState, setSort, clearSort, setPage, setFilterFn } = useTable(tableOptions)

  const t = useMemo(() => ({ ...DEFAULT_LOCALE, ...locale }), [locale])

  const hasColumnGroups = columnsProp.some((c) => c.children && c.children.length > 0)
  const leafColumns = useMemo(() => flattenLeafColumns(columnsProp), [columnsProp])
  const headerRows = useMemo<HeaderCell[][] | null>(
    () => hasColumnGroups ? buildHeaderRows(columnsProp) : null,
    [columnsProp, hasColumnGroups],
  )

  const [sortCol, setSortCol] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<SortDirection>('asc')

  const [colWidths, setColWidths] = useState<Record<string, number>>(() => {
    const w: Record<string, number> = {}
    for (const c of leafColumns) w[c.key] = c.width ?? DEFAULT_COL_WIDTH
    return w
  })

  const [colOrder, setColOrder] = useState<string[]>(() => leafColumns.map((c) => c.key))
  const [dragCol, setDragCol] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState<string | null>(null)

  const [internalExpanded, setInternalExpanded] = useState<Set<RowId>>(() => {
    if (tree?.defaultExpandAllRows) {
      const childrenKey = tree.childrenColumnName ?? 'children'
      return new Set(collectAllTreeIds(visibleRows, childrenKey))
    }
    return new Set()
  })
  const expandedKeys = expandable?.expandedKeys
    ? new Set(expandable.expandedKeys)
    : internalExpanded

  const [treeExpanded, setTreeExpanded] = useState<Set<RowId>>(() => {
    if (tree?.defaultExpandAllRows) {
      const childrenKey = tree.childrenColumnName ?? 'children'
      return new Set(collectAllTreeIds(visibleRows, childrenKey))
    }
    return new Set()
  })

  const [searchText, setSearchText] = useState('')

  const [activeFilters, setActiveFilters] = useState<Record<string, unknown[]>>(() => {
    const init: Record<string, unknown[]> = {}
    for (const col of leafColumns) {
      if (col.filteredValue) {
        init[col.key] = [...col.filteredValue]
      } else if (col.defaultFilteredValue) {
        init[col.key] = [...col.defaultFilteredValue]
      }
    }
    return init
  })
  const [filterSearchText, setFilterSearchText] = useState<Record<string, string>>({})
  const [openFilterDropdown, setOpenFilterDropdown] = useState<string | null>(null)
  const filterRef = useRef<HTMLDivElement>(null)

  const resizeRef = useRef<{ col: string; startX: number; startW: number } | null>(null)

  const columns = useMemo(() => {
    if (hasColumnGroups) return leafColumns
    const map = new Map(leafColumns.map((c) => [c.key, c]))
    return colOrder.filter((k) => map.has(k)).map((k) => map.get(k)!)
  }, [leafColumns, colOrder, hasColumnGroups])

  // Sync column order
  useEffect(() => {
    const keys = leafColumns.map((c) => c.key)
    setColOrder((prev) => {
      const prevSet = new Set(prev)
      const added = keys.filter((k) => !prevSet.has(k))
      const valid = prev.filter((k) => keys.includes(k))
      return [...valid, ...added]
    })
  }, [leafColumns])

  // Sync controlled filteredValue
  useEffect(() => {
    for (const col of leafColumns) {
      if (col.filteredValue !== undefined) {
        setActiveFilters((prev) => {
          if (JSON.stringify(prev[col.key]) === JSON.stringify(col.filteredValue)) return prev
          return { ...prev, [col.key]: [...col.filteredValue!] }
        })
      }
    }
  }, [leafColumns])

  // Combined filter function
  useEffect(() => {
    const colFilters = columns.filter((c) => c.onFilter && activeFilters[c.key]?.length)
    const hasSearch = searchable && searchText.length > 0

    if (colFilters.length === 0 && !hasSearch) {
      setFilterFn(null)
      return
    }

    const lower = hasSearch ? searchText.toLowerCase() : ''

    setFilterFn((row) => {
      for (const col of colFilters) {
        const vals = activeFilters[col.key]
        const fn = col.onFilter!
        if (!vals.some((v) => fn(v, row))) return false
      }
      if (hasSearch) {
        const match = Object.values(row).some(
          (v) => v != null && String(v).toLowerCase().includes(lower),
        )
        if (!match) return false
      }
      return true
    })
  }, [activeFilters, searchText, searchable, setFilterFn, columns])

  // Close filter dropdown on outside click
  useEffect(() => {
    if (!openFilterDropdown) return
    const handle = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setOpenFilterDropdown(null)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [openFilterDropdown])

  // ---- Handlers ----

  const handleSort = (col: TableColumn) => {
    if (!col.sortable) return
    if (sortCol !== col.key) {
      setSortCol(col.key)
      setSortDir('asc')
      setSort(col.key, 'asc')
    } else if (sortDir === 'asc') {
      setSortDir('desc')
      setSort(col.key, 'desc')
    } else {
      setSortCol(null)
      setSortDir('asc')
      clearSort()
    }
  }

  const handleToggleExpand = (id: RowId) => {
    const open = expandedKeys.has(id)
    if (expandable?.onExpand) {
      expandable.onExpand(!open, id)
    } else {
      setInternalExpanded((prev) => {
        const next = new Set(prev)
        open ? next.delete(id) : next.add(id)
        return next
      })
    }
  }

  const handleToggleTreeExpand = (id: RowId) => {
    setTreeExpanded((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleSelectRow = (id: RowId, row: Record<string, unknown>) => {
    if (!rowSelection) return
    const { selectedKeys, onChange, type = 'checkbox' } = rowSelection
    if (type === 'radio') {
      onChange([id], [row])
      return
    }
    const next = selectedKeys.includes(id)
      ? selectedKeys.filter((k) => k !== id)
      : [...selectedKeys, id]
    onChange(next, visibleRows.filter((r) => next.includes(r.id)).map((r) => r.data))
  }

  const handleSelectAll = () => {
    if (!rowSelection) return
    const ids = visibleRows.map((r) => r.id)
    const all = ids.every((id) => rowSelection.selectedKeys.includes(id))
    rowSelection.onChange(
      all ? [] : ids,
      all ? [] : visibleRows.map((r) => r.data),
    )
  }

  const handleFilterToggle = (colKey: string, value: unknown, multiple: boolean) => {
    setActiveFilters((prev) => {
      const current = prev[colKey] ?? []
      if (!multiple) return { ...prev, [colKey]: [value] }
      const idx = current.indexOf(value)
      const next = idx >= 0 ? current.filter((_, i) => i !== idx) : [...current, value]
      return { ...prev, [colKey]: next }
    })
  }

  const handleFilterConfirm = (colKey: string) => {
    setOpenFilterDropdown(null)
    setFilterSearchText((prev) => ({ ...prev, [colKey]: '' }))
  }

  const handleFilterReset = (colKey: string) => {
    setActiveFilters((prev) => ({ ...prev, [colKey]: [] }))
    setFilterSearchText((prev) => ({ ...prev, [colKey]: '' }))
  }

  const handleFilterClose = (colKey: string) => {
    setOpenFilterDropdown(null)
    setFilterSearchText((prev) => ({ ...prev, [colKey]: '' }))
  }

  const handleSearchFilterChange = (colKey: string, text: string) => {
    setActiveFilters((prev) => ({ ...prev, [colKey]: text ? [text] : [] }))
  }

  const getFilterDropdownProps = (col: TableColumn): FilterDropdownProps => ({
    selectedKeys: activeFilters[col.key] ?? [],
    setSelectedKeys: (keys) => setActiveFilters((prev) => ({ ...prev, [col.key]: keys })),
    confirm: () => handleFilterConfirm(col.key),
    clearFilters: () => handleFilterReset(col.key),
    close: () => handleFilterClose(col.key),
  })

  const handleResizeStart = (e: React.MouseEvent, colKey: string) => {
    e.preventDefault()
    e.stopPropagation()
    resizeRef.current = { col: colKey, startX: e.clientX, startW: colWidths[colKey] ?? DEFAULT_COL_WIDTH }

    const onMove = (ev: MouseEvent) => {
      if (!resizeRef.current) return
      const diff = ev.clientX - resizeRef.current.startX
      const min = leafColumns.find((c) => c.key === resizeRef.current!.col)?.minWidth ?? MIN_COL_WIDTH
      setColWidths((prev) => ({
        ...prev,
        [resizeRef.current!.col]: Math.max(min, resizeRef.current!.startW + diff),
      }))
    }
    const onUp = () => {
      resizeRef.current = null
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  const handleDragStart = (e: React.DragEvent, key: string) => {
    setDragCol(key)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', key)
  }

  const handleDragOver = (e: React.DragEvent, key: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOver(key)
  }

  const handleDrop = (e: React.DragEvent, targetKey: string) => {
    e.preventDefault()
    if (!dragCol || dragCol === targetKey) {
      setDragCol(null)
      setDragOver(null)
      return
    }
    setColOrder((prev) => {
      const next = prev.filter((k) => k !== dragCol)
      const idx = next.indexOf(targetKey)
      next.splice(idx, 0, dragCol)
      onColumnOrderChange?.(next)
      return next
    })
    setDragCol(null)
    setDragOver(null)
  }

  const handleDragEnd = () => {
    setDragCol(null)
    setDragOver(null)
  }

  // ---- Tree data ----

  const isTreeMode = !!tree
  const childrenKey = tree?.childrenColumnName ?? 'children'
  const indentSize = tree?.indentSize ?? 20

  const flatRows: FlatRow[] = useMemo(() => {
    if (!isTreeMode) {
      return visibleRows.map((r) => ({ id: r.id, data: r.data, depth: 0, hasChildren: false }))
    }
    return flattenTreeRows(visibleRows, childrenKey, treeExpanded)
  }, [visibleRows, isTreeMode, childrenKey, treeExpanded])

  // ---- Grid ----

  const extraBefore: string[] = []
  if (rowSelection) extraBefore.push(SELECTION_COL_WIDTH)
  if (expandable) extraBefore.push(SELECTION_COL_WIDTH)

  const colTemplates = columns.map((c) => `${colWidths[c.key] ?? c.width ?? DEFAULT_COL_WIDTH}px`)
  const gridTemplate = [...extraBefore, ...colTemplates].join(' ')
  const totalCols = extraBefore.length + columns.length

  // ---- Fixed offsets ----

  const fixedLeftOffsets = useMemo(() => {
    const o: Record<string, number> = {}
    const selW = parseInt(SELECTION_COL_WIDTH)
    let left = (rowSelection ? selW : 0) + (expandable ? selW : 0)
    for (const col of columns) {
      if (col.fixed === 'left') {
        o[col.key] = left
        left += colWidths[col.key] ?? col.width ?? DEFAULT_COL_WIDTH
      }
    }
    return o
  }, [columns, colWidths, rowSelection, expandable])

  const fixedRightOffsets = useMemo(() => {
    const o: Record<string, number> = {}
    let right = 0
    for (let i = columns.length - 1; i >= 0; i--) {
      if (columns[i].fixed === 'right') {
        o[columns[i].key] = right
        right += colWidths[columns[i].key] ?? columns[i].width ?? DEFAULT_COL_WIDTH
      }
    }
    return o
  }, [columns, colWidths])

  const fixedStyle = (col: TableColumn, isHeader?: boolean): React.CSSProperties =>
    getFixedStyle(col, fixedLeftOffsets, fixedRightOffsets, isHeader)

  // Selection helpers
  const allSelected = rowSelection
    ? visibleRows.length > 0 && visibleRows.every((r) => rowSelection.selectedKeys.includes(r.id))
    : false
  const someSelected = rowSelection
    ? visibleRows.some((r) => rowSelection.selectedKeys.includes(r.id)) && !allSelected
    : false

  // ---- Span maps ----

  const spanMap = useMemo(() => computeSpanMap(columns, flatRows), [columns, flatRows])
  const hiddenCells = useMemo(() => computeHiddenCells(columns, flatRows, spanMap), [columns, flatRows, spanMap])

  return {
    // Data
    visibleRows, tableState, columns, leafColumns, flatRows,
    headerRows, hasColumnGroups, t,
    // Sort
    sortCol, sortDir, handleSort,
    // Selection
    allSelected, someSelected, handleSelectAll, handleSelectRow,
    // Expand
    expandedKeys, handleToggleExpand,
    // Tree
    isTreeMode, indentSize, treeExpanded, handleToggleTreeExpand,
    // Filters
    filterState: { activeFilters, filterSearchText, openFilterDropdown },
    filterActions: {
      setOpenFilterDropdown, handleFilterToggle, handleFilterConfirm,
      handleFilterReset, handleFilterClose, handleSearchFilterChange,
      setFilterSearchText, getFilterDropdownProps,
    },
    filterRef,
    // Drag
    dragOver, handleDragStart, handleDragOver, handleDragEnd, handleDrop,
    setDragOver: () => setDragOver(null),
    // Resize
    colWidths, handleResizeStart,
    // Grid
    gridTemplate, totalCols,
    // Fixed
    fixedStyle,
    // Span
    spanMap, hiddenCells,
    // Search
    searchText, setSearchText,
    // Pagination
    setPage,
  }
}
