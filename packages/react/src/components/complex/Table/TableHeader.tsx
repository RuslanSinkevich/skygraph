import React from 'react'
import { Checkbox } from '../../ui/Checkbox'
import { FilterTrigger, FilterDropdownContent } from './FilterDropdown'
import type {
  TableColumn,
  HeaderCell,
  RowSelectionConfig,
  ExpandableConfig,
  TableLocale,
  SortDirection,
  SortConfig,
  FilterDropdownProps,
} from './types'
import type { ContextMenuItem, ContextMenuState } from './ContextMenu'

interface HeaderProps {
  columns: TableColumn[]
  headerRows: HeaderCell[][] | null
  hasColumnGroups: boolean
  rowSelection?: RowSelectionConfig
  expandable?: ExpandableConfig
  draggable?: boolean
  allSelected: boolean
  someSelected: boolean
  dragOver: string | null
  t: Required<TableLocale>
  fixedStyle: (col: TableColumn, isHeader?: boolean) => React.CSSProperties
  onSort: (col: TableColumn, shiftKey?: boolean) => void
  onSelectAll: () => void
  onDragStart: (e: React.DragEvent, key: string) => void
  onDragOver: (e: React.DragEvent, key: string) => void
  onDragLeave: () => void
  onDrop: (e: React.DragEvent, key: string) => void
  onDragEnd: () => void
  onResizeStart: (e: React.MouseEvent, colKey: string) => void
  filterState: {
    activeFilters: Record<string, unknown[]>
    filterSearchText: Record<string, string>
    openFilterDropdown: string | null
  }
  filterActions: {
    setOpenFilterDropdown: (key: string | null) => void
    handleFilterToggle: (colKey: string, value: unknown, multiple: boolean) => void
    handleFilterConfirm: (colKey: string) => void
    handleFilterReset: (colKey: string) => void
    handleFilterClose: (colKey: string) => void
    handleSearchFilterChange: (colKey: string, text: string) => void
    setFilterSearchText: React.Dispatch<React.SetStateAction<Record<string, string>>>
    getFilterDropdownProps: (col: TableColumn) => FilterDropdownProps
  }
  filterRef: React.RefObject<HTMLDivElement>
  // Multi-sort
  sorts: SortConfig[]
  getSortIndex: (colKey: string) => number
  getSortDirection: (colKey: string) => SortDirection | null
  // Context menu
  headerContextMenu?: (column: TableColumn) => ContextMenuItem[]
  onContextMenu: (state: ContextMenuState | null) => void
}

function SortIndicator({
  col,
  sorts,
  getSortIndex,
  getSortDirection,
  t,
}: {
  col: TableColumn
  sorts: SortConfig[]
  getSortIndex: (colKey: string) => number
  getSortDirection: (colKey: string) => SortDirection | null
  t: Required<TableLocale>
}) {
  if (!col.sortable) return null
  const dir = getSortDirection(col.key)
  const idx = getSortIndex(col.key)
  const isActive = dir !== null

  return (
    <span className={`sg-table-sort-arrows${isActive ? ' sg-table-sort-active' : ''}`}>
      <span
        className={`sg-table-sort-asc${dir === 'asc' ? ' sg-table-sort-current' : ''}`}
      >
        {t.sortAsc}
      </span>
      <span
        className={`sg-table-sort-desc${dir === 'desc' ? ' sg-table-sort-current' : ''}`}
      >
        {t.sortDesc}
      </span>
      {idx >= 0 && sorts.length > 1 && (
        <span className="sg-table-sort-index">{idx + 1}</span>
      )}
    </span>
  )
}

export function TableHeader(props: HeaderProps) {
  const {
    columns,
    headerRows,
    hasColumnGroups,
    rowSelection,
    expandable,
    draggable,
    allSelected,
    someSelected,
    dragOver,
    t,
    fixedStyle,
    onSort,
    onSelectAll,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    onResizeStart,
    filterState,
    filterActions,
    filterRef,
    sorts,
    getSortIndex,
    getSortDirection,
    headerContextMenu,
    onContextMenu,
  } = props

  const filterProps = (col: TableColumn) => ({
    col,
    t,
    state: filterState,
    actions: filterActions,
    filterRef,
  })

  const sortProps = {
    sorts,
    getSortIndex,
    getSortDirection,
    t,
  }

  const handleHeaderContext = (e: React.MouseEvent, col: TableColumn) => {
    if (!headerContextMenu) return
    e.preventDefault()
    const items = headerContextMenu(col)
    if (items.length > 0) {
      onContextMenu({ x: e.clientX, y: e.clientY, items })
    }
  }

  if (hasColumnGroups && headerRows) {
    return (
      <>
        {headerRows.map((row, ri) => (
          <div
            key={`hdr-${ri}`}
            className="sg-table-header-row"
            role="row"
            style={{ display: 'contents' }}
          >
            {ri === 0 && rowSelection && (
              <div
                className="sg-table-th sg-table-cell-selection"
                role="columnheader"
                style={{ gridRow: `span ${headerRows.length}` }}
              >
                {rowSelection.type !== 'radio' && (
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={onSelectAll}
                  />
                )}
              </div>
            )}
            {ri === 0 && expandable && (
              <div
                className="sg-table-th sg-table-cell-expand"
                role="columnheader"
                style={{ gridRow: `span ${headerRows.length}` }}
              />
            )}
            {row.map((cell, ci) => {
              const isLeaf = !cell.col.children || cell.col.children.length === 0
              return (
                <div
                  key={cell.col.key ?? `g-${ri}-${ci}`}
                  className={[
                    'sg-table-th',
                    isLeaf && cell.col.sortable ? 'sg-table-th-sortable' : '',
                    cell.col.fixed ? 'sg-table-cell-fixed' : '',
                    cell.colSpan > 1 ? 'sg-table-th-group' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={{
                    ...(isLeaf ? fixedStyle(cell.col, true) : {}),
                    gridColumn: cell.colSpan > 1 ? `span ${cell.colSpan}` : undefined,
                    gridRow: cell.rowSpan > 1 ? `span ${cell.rowSpan}` : undefined,
                    justifyContent: cell.colSpan > 1 ? 'center' : undefined,
                  }}
                  role="columnheader"
                  onClick={isLeaf ? (e) => onSort(cell.col, e.shiftKey) : undefined}
                  onContextMenu={
                    isLeaf ? (e) => handleHeaderContext(e, cell.col) : undefined
                  }
                >
                  <span className="sg-table-th-content">
                    {cell.col.title}
                    {isLeaf && <SortIndicator col={cell.col} {...sortProps} />}
                  </span>
                  {isLeaf && <FilterTrigger {...filterProps(cell.col)} />}
                  {isLeaf && <FilterDropdownContent {...filterProps(cell.col)} />}
                  {isLeaf && cell.col.resizable && (
                    <div
                      className="sg-table-resize-handle"
                      onMouseDown={(e) => onResizeStart(e, cell.col.key)}
                    />
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </>
    )
  }

  return (
    <div
      className="sg-table-header-row"
      role="row"
      style={{ display: 'contents' }}
    >
      {rowSelection && (
        <div className="sg-table-th sg-table-cell-selection" role="columnheader">
          {rowSelection.type !== 'radio' && (
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected}
              onChange={onSelectAll}
            />
          )}
        </div>
      )}
      {expandable && (
        <div className="sg-table-th sg-table-cell-expand" role="columnheader" />
      )}
      {columns.map((col) => (
        <div
          key={col.key}
          className={[
            'sg-table-th',
            col.sortable ? 'sg-table-th-sortable' : '',
            dragOver === col.key ? 'sg-table-th-drag-over' : '',
            col.fixed ? 'sg-table-cell-fixed' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={fixedStyle(col, true)}
          role="columnheader"
          onClick={(e) => onSort(col, e.shiftKey)}
          onContextMenu={(e) => handleHeaderContext(e, col)}
          draggable={draggable && !col.fixed}
          onDragStart={draggable ? (e) => onDragStart(e, col.key) : undefined}
          onDragOver={draggable ? (e) => onDragOver(e, col.key) : undefined}
          onDragLeave={draggable ? () => onDragLeave() : undefined}
          onDrop={draggable ? (e) => onDrop(e, col.key) : undefined}
          onDragEnd={draggable ? () => onDragEnd() : undefined}
        >
          <span className="sg-table-th-content">
            {col.title}
            <SortIndicator col={col} {...sortProps} />
          </span>
          <FilterTrigger {...filterProps(col)} />
          <FilterDropdownContent {...filterProps(col)} />
          {col.resizable && (
            <div
              className="sg-table-resize-handle"
              onMouseDown={(e) => onResizeStart(e, col.key)}
            />
          )}
        </div>
      ))}
    </div>
  )
}
