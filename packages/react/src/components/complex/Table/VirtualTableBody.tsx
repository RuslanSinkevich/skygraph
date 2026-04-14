import React, { useRef, useState, useEffect } from 'react'
import { Checkbox } from '../../ui/Checkbox'
import type { TableColumn, RowSelectionConfig, ExpandableConfig, FlatRow, CellSpan, RowId, TableLocale } from './types'

/** Internal props for the virtualized table body. */
interface VirtualBodyProps {
  /** Visible columns. */
  columns: TableColumn[]
  /** All rows to virtualize (no group rows). */
  flatRows: FlatRow[]
  /** Fixed row height in pixels. */
  rowHeight: number
  /** Extra rows rendered above and below the viewport. */
  overscan: number
  /** Max height of the scroll container. */
  scrollHeight: number | string
  /** Row selection when enabled. */
  rowSelection?: RowSelectionConfig
  /** Expandable rows when enabled. */
  expandable?: ExpandableConfig
  /** Tree rendering on the first column. */
  isTreeMode: boolean
  /** Tree indent per depth level. */
  indentSize: number
  /** Expanded tree node keys. */
  treeExpanded: Set<RowId>
  /** Expanded detail row keys. */
  expandedKeys: Set<RowId>
  /** Total columns including utility cells. */
  totalCols: number
  /** Cell span map. */
  spanMap: Map<string, CellSpan>
  /** Hidden span-covered cells. */
  hiddenCells: Set<string>
  /** Resolved locale. */
  t: Required<TableLocale>
  /** CSS grid-template-columns for each row. */
  gridTemplate: string
  /** Row class or resolver. */
  rowClassName?: string | ((row: Record<string, unknown>, id: RowId) => string)
  /** Sticky cell styles. */
  fixedStyle: (col: TableColumn) => React.CSSProperties
  /** Row click handler. */
  onRowClick?: (id: RowId, data: Record<string, unknown>) => void
  /** Cell edit commit. */
  onCellEdit?: (id: RowId, column: string, value: unknown) => void
  /** Selection toggle. */
  onSelectRow: (id: RowId, row: Record<string, unknown>) => void
  /** Detail expand toggle. */
  onToggleExpand: (id: RowId) => void
  /** Tree expand toggle. */
  onToggleTreeExpand: (id: RowId) => void
}

/** Virtualized body: only mounts row DOM for the visible scroll window. */
export function VirtualTableBody(props: VirtualBodyProps) {
  const {
    columns, flatRows, rowHeight, overscan, scrollHeight,
    rowSelection, expandable, isTreeMode, indentSize,
    treeExpanded, expandedKeys, totalCols, spanMap, hiddenCells, t,
    gridTemplate, rowClassName, fixedStyle,
    onRowClick, onCellEdit, onSelectRow, onToggleExpand, onToggleTreeExpand,
  } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    setViewportHeight(el.clientHeight)

    const onScroll = () => setScrollTop(el.scrollTop)
    el.addEventListener('scroll', onScroll, { passive: true })

    const ro = new ResizeObserver(() => setViewportHeight(el.clientHeight))
    ro.observe(el)

    return () => {
      el.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [])

  const totalHeight = flatRows.length * rowHeight
  const startIdx = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan)
  const visibleCount = Math.ceil(viewportHeight / rowHeight) + overscan * 2
  const endIdx = Math.min(flatRows.length - 1, startIdx + visibleCount)

  const [editingCell, setEditingCell] = useState<{ rowId: RowId; col: string } | null>(null)
  const [editValue, setEditValue] = useState('')
  const editRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editingCell && editRef.current) editRef.current.focus()
  }, [editingCell])

  const handleEditStart = (rowId: RowId, col: string, val: unknown) => {
    setEditingCell({ rowId, col })
    setEditValue(String(val ?? ''))
  }

  const handleEditSave = () => {
    if (editingCell && onCellEdit) {
      onCellEdit(editingCell.rowId, editingCell.col, editValue)
    }
    setEditingCell(null)
  }

  const handleEditCancel = () => setEditingCell(null)

  const heightVal = typeof scrollHeight === 'number' ? scrollHeight : 400

  return (
    <div
      ref={containerRef}
      className="sg-table-virtual-body"
      style={{ overflowY: 'auto', maxHeight: heightVal, position: 'relative' }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {flatRows.length === 0 ? (
          <div className="sg-table-empty" style={{ gridColumn: `1 / ${totalCols + 1}`, padding: 24, textAlign: 'center' }} role="row">
            <span role="cell">{t.emptyText}</span>
          </div>
        ) : (
          Array.from({ length: endIdx - startIdx + 1 }, (_, i) => {
            const rowIdx = startIdx + i
            const row = flatRows[rowIdx]
            if (!row) return null

            const isExpanded = expandedKeys.has(row.id)
            const isSelected = rowSelection?.selectedKeys.includes(row.id)
            const canExpand = expandable?.rowExpandable ? expandable.rowExpandable(row.data) : !!expandable

            const rowCls = typeof rowClassName === 'function'
              ? rowClassName(row.data, row.id)
              : rowClassName ?? ''

            return (
              <div
                key={row.id}
                className={[
                  'sg-table-row',
                  isSelected ? 'sg-table-row-selected' : '',
                  rowCls,
                ].filter(Boolean).join(' ')}
                role="row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: gridTemplate,
                  position: 'absolute',
                  top: rowIdx * rowHeight,
                  left: 0,
                  right: 0,
                  height: rowHeight,
                  alignItems: 'center',
                }}
              >
                {rowSelection && (
                  <div
                    className="sg-table-td sg-table-cell-selection"
                    role="cell"
                    onClick={(e) => { e.stopPropagation(); onSelectRow(row.id, row.data) }}
                  >
                    {rowSelection.type === 'radio' ? (
                      <input type="radio" checked={!!isSelected} readOnly />
                    ) : (
                      <Checkbox checked={!!isSelected} onChange={() => {}} />
                    )}
                  </div>
                )}

                {expandable && (
                  <div className="sg-table-td sg-table-cell-expand" role="cell">
                    {canExpand && (
                      <button
                        className={`sg-table-expand-btn${isExpanded ? ' sg-table-expand-open' : ''}`}
                        onClick={(e) => { e.stopPropagation(); onToggleExpand(row.id) }}
                      >
                        {t.expandIcon}
                      </button>
                    )}
                  </div>
                )}

                {columns.map((col, colIndex) => {
                  const cellKey = `${row.id}:${col.key}`
                  if (hiddenCells.has(cellKey)) return null

                  const span = spanMap.get(cellKey)
                  const val = row.data[col.key]
                  const isEditing = editingCell?.rowId === row.id && editingCell?.col === col.key

                  const cellStyle: React.CSSProperties = { ...fixedStyle(col) }
                  if (span?.colSpan && span.colSpan > 1) cellStyle.gridColumn = `span ${span.colSpan}`

                  const isFirstCol = colIndex === 0
                  const treeIndent = isTreeMode && isFirstCol ? row.depth * indentSize : 0

                  return (
                    <div
                      key={col.key}
                      className={[
                        'sg-table-td',
                        col.fixed ? 'sg-table-cell-fixed' : '',
                        col.editable ? 'sg-table-td-editable' : '',
                      ].filter(Boolean).join(' ')}
                      style={cellStyle}
                      role="cell"
                      onClick={() => onRowClick?.(row.id, row.data)}
                      onDoubleClick={
                        col.editable && onCellEdit
                          ? (e) => { e.stopPropagation(); handleEditStart(row.id, col.key, val) }
                          : undefined
                      }
                    >
                      {isTreeMode && isFirstCol && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', minWidth: treeIndent + 20, flexShrink: 0 }}>
                          <span style={{ width: treeIndent }} />
                          {row.hasChildren ? (
                            <button
                              className={`sg-table-expand-btn${treeExpanded.has(row.id) ? ' sg-table-expand-open' : ''}`}
                              onClick={(e) => { e.stopPropagation(); onToggleTreeExpand(row.id) }}
                            >
                              {t.expandIcon}
                            </button>
                          ) : (
                            <span style={{ width: 20 }} />
                          )}
                        </span>
                      )}
                      {isEditing ? (
                        <input
                          ref={editRef}
                          className="sg-table-edit-input"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={handleEditSave}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleEditSave()
                            if (e.key === 'Escape') handleEditCancel()
                          }}
                        />
                      ) : col.render ? (
                        col.render(val, row.data, row.id)
                      ) : (
                        String(val ?? '')
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
