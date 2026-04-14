import React, { useCallback, useMemo } from 'react'
import { Input } from '../../ui/Input'
import { Pagination } from '../../ui/Pagination'
import { Spin } from '../../ui/Spin'
import { Checkbox } from '../../ui/Checkbox'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import { VirtualTableBody } from './VirtualTableBody'
import { ContextMenu } from './ContextMenu'
import { useTableState } from './useTableState'
import { useConfig } from '../../ConfigProvider'
import { toCSVString, downloadCSV, toTSVString, copyToClipboard } from './export'
import type { TableProps } from './types'

const DRAG_HANDLE_WIDTH = '32px'

export function Table(props: TableProps) {
  const {
    rowSelection,
    expandable,
    sticky,
    draggable,
    searchable,
    showPagination = true,
    bordered: borderedProp,
    size: sizeProp,
    scroll,
    summary,
    onRowClick,
    onCellEdit,
    loading: loadingProp,
    rowClassName,
    className,
    style,
    unstyled,
    // New props
    rowDraggable,
    onRowOrderChange,
    headerContextMenu,
    cellContextMenu,
    columnVisibility,
    virtual: virtualProp,
    exportable,
    onExport,
    selectionSummary,
    selectionActions,
    striped,
    showSizeChanger,
    pageSizeOptions,
    showQuickJumper,
    showTotal,
    onPageSizeChange,
  } = props

  const config = useConfig()
  const size = sizeProp ?? config.size ?? 'middle'
  const bordered = borderedProp ?? config.bordered ?? false
  const loading = loadingProp ?? false

  const state = useTableState(props)

  const handleExport = useCallback(() => {
    const cols = state.columns.map((c) => c.key)
    const headers = state.columns.map((c) =>
      typeof c.title === 'string' ? c.title : c.key,
    )
    const rows = state.flatRows.map((row) =>
      cols.map((k) => {
        const v = row.data[k]
        return v == null ? '' : String(v)
      }),
    )
    const data = [headers, ...rows]
    if (onExport) {
      onExport(data)
    } else {
      downloadCSV(toCSVString(data))
    }
  }, [state.columns, state.flatRows, onExport])

  const handleCopy = useCallback(async () => {
    const cols = state.columns.map((c) => c.key)
    const headers = state.columns.map((c) =>
      typeof c.title === 'string' ? c.title : c.key,
    )
    const rows = state.flatRows.map((row) =>
      cols.map((k) => {
        const v = row.data[k]
        return v == null ? '' : String(v)
      }),
    )
    await copyToClipboard(toTSVString([headers, ...rows]))
  }, [state.columns, state.flatRows])

  // Grid template (include drag handle column if rowDraggable)
  const gridTemplate = useMemo(() => {
    if (rowDraggable) {
      return `${DRAG_HANDLE_WIDTH} ${state.gridTemplate}`
    }
    return state.gridTemplate
  }, [rowDraggable, state.gridTemplate])

  const totalCols = state.totalCols + (rowDraggable ? 1 : 0)

  // Virtual scroll config
  const virtualConfig = virtualProp
    ? {
        rowHeight: typeof virtualProp === 'object' ? virtualProp.rowHeight ?? 40 : 40,
        overscan: typeof virtualProp === 'object' ? virtualProp.overscan ?? 5 : 5,
      }
    : null

  // ---- Unstyled ----
  if (unstyled) {
    return (
      <div className={className} style={style} role="table">
        <div role="rowgroup">
          <div role="row">
            {state.columns.map((col) => (
              <span
                key={col.key}
                role="columnheader"
                onClick={(e) => state.handleSort(col, e.shiftKey)}
              >
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
                  {col.render
                    ? col.render(row.data[col.key], row.data, row.id)
                    : String(row.data[col.key] ?? '')}
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
    striped ? 'sg-table-striped' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const scrollStyle: React.CSSProperties = {}
  if (scroll?.x) scrollStyle.overflowX = 'auto'
  if (scroll?.y) {
    scrollStyle.overflowY = 'auto'
    scrollStyle.maxHeight = scroll.y
  }

  const selectedCount = rowSelection?.selectedKeys.length ?? 0

  return (
    <div className={wrapperCls} style={style}>
      {/* Toolbar */}
      {(searchable || columnVisibility || exportable) && (
        <div className="sg-table-toolbar">
          {searchable && (
            <Input
              placeholder={state.t.searchPlaceholder}
              size="small"
              value={state.searchText}
              onChange={state.setSearchText}
              style={{ maxWidth: 240 }}
            />
          )}
          <div className="sg-table-toolbar-right" style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
            {columnVisibility && (
              <ColumnVisibilityDropdown
                leafColumns={state.leafColumns}
                hiddenSet={state.hiddenSet}
                onToggle={state.toggleColumnVisibility}
                label={state.t.showColumns}
              />
            )}
            {exportable && (
              <>
                <button className="sg-table-toolbar-btn" onClick={handleExport}>
                  {state.t.exportCSV}
                </button>
                <button className="sg-table-toolbar-btn" onClick={handleCopy}>
                  {state.t.copyTable}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Selection Summary Bar */}
      {selectionSummary && selectedCount > 0 && (
        <div className="sg-table-selection-bar">
          <span className="sg-table-selection-count">
            {state.t.selectedRows(selectedCount)}
          </span>
          {selectionActions?.map((action) => (
            <button
              key={action.key}
              className={`sg-table-selection-action${action.danger ? ' sg-table-selection-action-danger' : ''}`}
              onClick={() =>
                action.onClick(
                  rowSelection!.selectedKeys,
                  state.visibleRows
                    .filter((r) => rowSelection!.selectedKeys.includes(r.id))
                    .map((r) => r.data),
                )
              }
            >
              {action.label}
            </button>
          ))}
          <button
            className="sg-table-selection-clear"
            onClick={() => rowSelection?.onChange([], [])}
          >
            ✕
          </button>
        </div>
      )}

      <div
        className="sg-table-scroll"
        style={Object.keys(scrollStyle).length > 0 ? scrollStyle : undefined}
      >
        <div
          className="sg-table-grid"
          style={{
            gridTemplateColumns: gridTemplate,
            minWidth: scroll?.x,
          }}
          role="table"
        >
          <TableHeader
            columns={state.columns}
            headerRows={state.headerRows}
            hasColumnGroups={state.hasColumnGroups}
            rowSelection={rowSelection}
            expandable={expandable}
            draggable={draggable}
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
            sorts={state.sorts}
            getSortIndex={state.getSortIndex}
            getSortDirection={state.getSortDirection}
            headerContextMenu={headerContextMenu}
            onContextMenu={state.setContextMenu}
          />

          {virtualConfig ? (
            <VirtualTableBody
              columns={state.columns}
              flatRows={state.flatRows}
              rowHeight={virtualConfig.rowHeight}
              overscan={virtualConfig.overscan}
              scrollHeight={scroll?.y ?? 400}
              rowSelection={rowSelection}
              expandable={expandable}
              isTreeMode={state.isTreeMode}
              indentSize={state.indentSize}
              treeExpanded={state.treeExpanded}
              expandedKeys={state.expandedKeys}
              totalCols={totalCols}
              spanMap={state.spanMap}
              hiddenCells={state.hiddenCells}
              t={state.t}
              gridTemplate={gridTemplate}
              rowClassName={rowClassName}
              fixedStyle={state.fixedStyle}
              onRowClick={onRowClick}
              onCellEdit={onCellEdit}
              onSelectRow={state.handleSelectRow}
              onToggleExpand={state.handleToggleExpand}
              onToggleTreeExpand={state.handleToggleTreeExpand}
            />
          ) : (
            <TableBody
              columns={state.columns}
              flatRows={state.flatRows}
              rowSelection={rowSelection}
              expandable={expandable}
              isTreeMode={state.isTreeMode}
              indentSize={state.indentSize}
              treeExpanded={state.treeExpanded}
              expandedKeys={state.expandedKeys}
              totalCols={totalCols}
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
              rowDraggable={rowDraggable}
              onRowOrderChange={onRowOrderChange}
              cellContextMenu={cellContextMenu}
              onContextMenu={state.setContextMenu}
              striped={striped}
            />
          )}

          {summary &&
            state.visibleRows &&
            summary(state.visibleRows).map((cells, ri) => (
              <div
                key={`sum-${ri}`}
                className="sg-table-summary-row"
                role="row"
                style={{ display: 'contents' }}
              >
                {cells.map((cell, ci) => (
                  <div
                    key={ci}
                    className="sg-table-td sg-table-summary-cell"
                    role="cell"
                    style={{
                      gridColumn: cell.colSpan
                        ? `span ${cell.colSpan}`
                        : undefined,
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

      {/* Context Menu */}
      <ContextMenu
        state={state.contextMenu}
        onClose={() => state.setContextMenu(null)}
      />

      {loading && (
        <div className="sg-table-loading-mask">
          <Spin size="large" />
        </div>
      )}

      {showPagination && state.tableState.totalPages > 1 && (
        <div className="sg-table-pagination">
          <span className="sg-table-pagination-total">
            {state.t.totalRows(state.tableState.filteredRows)}
          </span>
          <Pagination
            current={state.tableState.page}
            total={state.tableState.filteredRows}
            pageSize={state.tableState.pageSize}
            onChange={state.setPage}
            showSizeChanger={showSizeChanger}
            pageSizeOptions={pageSizeOptions}
            showQuickJumper={showQuickJumper}
            showTotal={showTotal}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      )}
    </div>
  )
}

// Column Visibility dropdown
function ColumnVisibilityDropdown({
  leafColumns,
  hiddenSet,
  onToggle,
  label,
}: {
  leafColumns: { key: string; title: React.ReactNode }[]
  hiddenSet: Set<string>
  onToggle: (key: string) => void
  label: string
}) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [open])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button className="sg-table-toolbar-btn" onClick={() => setOpen(!open)}>
        {label}
      </button>
      {open && (
        <div
          className="sg-table-col-visibility-dropdown"
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            zIndex: 1040,
            background: 'var(--sg-bg-elevated, #fff)',
            border: '1px solid var(--sg-border, #d9d9d9)',
            borderRadius: 'var(--sg-radius, 6px)',
            boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
            padding: '8px 0',
            minWidth: 160,
          }}
        >
          {leafColumns.map((col) => (
            <label
              key={col.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 12px',
                cursor: 'pointer',
              }}
            >
              <Checkbox
                checked={!hiddenSet.has(col.key)}
                onChange={() => onToggle(col.key)}
              />
              <span>{typeof col.title === 'string' ? col.title : col.key}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
