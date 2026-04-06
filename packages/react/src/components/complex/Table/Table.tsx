import React from 'react'
import { Input } from '../../ui/Input'
import { Pagination } from '../../ui/Pagination'
import { Spin } from '../../ui/Spin'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import { useTableState } from './useTableState'
import type { TableProps } from './types'

export function Table(props: TableProps) {
  const {
    rowSelection, expandable, sticky, draggable, searchable,
    showPagination = true, bordered, size = 'middle', scroll, summary,
    onRowClick, onCellEdit, loading, rowClassName, className, style, unstyled,
  } = props

  const state = useTableState(props)

  // ---- Unstyled ----
  if (unstyled) {
    return (
      <div className={className} style={style} role="table">
        <div role="rowgroup">
          <div role="row">
            {state.columns.map((col) => (
              <span key={col.key} role="columnheader" onClick={() => state.handleSort(col)}>
                {col.title}
              </span>
            ))}
          </div>
        </div>
        <div role="rowgroup">
          {state.flatRows.map((row) => (
            <div key={row.id} role="row">
              {state.columns.map((col) => (
                <span key={col.key} role="cell">
                  {col.render ? col.render(row.data[col.key], row.data, row.id) : String(row.data[col.key] ?? '')}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ---- Styled ----

  const wrapperCls = [
    'sg-table-wrapper',
    `sg-table-${size}`,
    bordered ? 'sg-table-bordered' : '',
    sticky ? 'sg-table-sticky' : '',
    loading ? 'sg-table-loading' : '',
    className,
  ].filter(Boolean).join(' ')

  const scrollStyle: React.CSSProperties = {}
  if (scroll?.x) scrollStyle.overflowX = 'auto'
  if (scroll?.y) { scrollStyle.overflowY = 'auto'; scrollStyle.maxHeight = scroll.y }

  return (
    <div className={wrapperCls} style={style}>
      {searchable && (
        <div className="sg-table-toolbar">
          <Input
            placeholder={state.t.searchPlaceholder}
            size="small"
            value={state.searchText}
            onChange={state.setSearchText}
            style={{ maxWidth: 240 }}
          />
        </div>
      )}

      <div className="sg-table-scroll" style={Object.keys(scrollStyle).length > 0 ? scrollStyle : undefined}>
        <div
          className="sg-table-grid"
          style={{ gridTemplateColumns: state.gridTemplate, minWidth: scroll?.x }}
          role="table"
        >
          <TableHeader
            columns={state.columns}
            headerRows={state.headerRows}
            hasColumnGroups={state.hasColumnGroups}
            rowSelection={rowSelection}
            expandable={expandable}
            draggable={draggable}
            sortCol={state.sortCol}
            sortDir={state.sortDir}
            allSelected={state.allSelected}
            someSelected={state.someSelected}
            dragOver={state.dragOver}
            t={state.t}
            fixedStyle={state.fixedStyle}
            onSort={state.handleSort}
            onSelectAll={state.handleSelectAll}
            onDragStart={state.handleDragStart}
            onDragOver={state.handleDragOver}
            onDragLeave={state.setDragOver}
            onDrop={state.handleDrop}
            onDragEnd={state.handleDragEnd}
            onResizeStart={state.handleResizeStart}
            filterState={state.filterState}
            filterActions={state.filterActions}
            filterRef={state.filterRef}
          />

          <TableBody
            columns={state.columns}
            flatRows={state.flatRows}
            rowSelection={rowSelection}
            expandable={expandable}
            isTreeMode={state.isTreeMode}
            indentSize={state.indentSize}
            treeExpanded={state.treeExpanded}
            expandedKeys={state.expandedKeys}
            totalCols={state.totalCols}
            spanMap={state.spanMap}
            hiddenCells={state.hiddenCells}
            t={state.t}
            rowClassName={rowClassName}
            fixedStyle={state.fixedStyle}
            onRowClick={onRowClick}
            onCellEdit={onCellEdit}
            onSelectRow={state.handleSelectRow}
            onToggleExpand={state.handleToggleExpand}
            onToggleTreeExpand={state.handleToggleTreeExpand}
          />

          {summary && state.visibleRows && summary(state.visibleRows).map((cells, ri) => (
            <div key={`sum-${ri}`} className="sg-table-summary-row" role="row" style={{ display: 'contents' }}>
              {cells.map((cell, ci) => (
                <div
                  key={ci}
                  className="sg-table-td sg-table-summary-cell"
                  role="cell"
                  style={{
                    gridColumn: cell.colSpan ? `span ${cell.colSpan}` : undefined,
                    textAlign: cell.align,
                  }}
                >
                  {cell.content}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {loading && (
        <div className="sg-table-loading-mask">
          <Spin size="large" />
        </div>
      )}

      {showPagination && state.tableState.totalPages > 1 && (
        <div className="sg-table-pagination">
          <span className="sg-table-pagination-total">{state.t.totalRows(state.tableState.filteredRows)}</span>
          <Pagination
            current={state.tableState.page}
            total={state.tableState.filteredRows}
            pageSize={state.tableState.pageSize}
            onChange={state.setPage}
          />
        </div>
      )}
    </div>
  )
}
