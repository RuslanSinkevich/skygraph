import React, { useRef, useState, useEffect } from 'react'
import { Checkbox } from '../../ui/Checkbox'
import type {
  TableColumn,
  RowSelectionConfig,
  ExpandableConfig,
  FlatRow,
  CellSpan,
  RowId,
  TableLocale,
} from './types'
import type { ContextMenuItem, ContextMenuState } from './ContextMenu'

interface BodyProps {
  columns: TableColumn[]
  flatRows: FlatRow[]
  rowSelection?: RowSelectionConfig
  expandable?: ExpandableConfig
  isTreeMode: boolean
  indentSize: number
  treeExpanded: Set<RowId>
  expandedKeys: Set<RowId>
  totalCols: number
  spanMap: Map<string, CellSpan>
  hiddenCells: Set<string>
  t: Required<TableLocale>
  rowClassName?: string | ((row: Record<string, unknown>, id: RowId) => string)
  fixedStyle: (col: TableColumn) => React.CSSProperties
  onRowClick?: (id: RowId, data: Record<string, unknown>) => void
  onCellEdit?: (id: RowId, column: string, value: unknown) => void
  onSelectRow: (id: RowId, row: Record<string, unknown>) => void
  onToggleExpand: (id: RowId) => void
  onToggleTreeExpand: (id: RowId) => void
  // Row drag
  rowDraggable?: boolean
  onRowOrderChange?: (fromIndex: number, toIndex: number) => void
  // Cell context menu
  cellContextMenu?: (
    id: RowId,
    column: string,
    data: Record<string, unknown>,
  ) => ContextMenuItem[]
  onContextMenu: (state: ContextMenuState | null) => void
  // Zebra
  striped?: boolean
}

export function TableBody(props: BodyProps) {
  const {
    columns,
    flatRows,
    rowSelection,
    expandable,
    isTreeMode,
    indentSize,
    treeExpanded,
    expandedKeys,
    totalCols,
    spanMap,
    hiddenCells,
    t,
    rowClassName,
    fixedStyle,
    onRowClick,
    onCellEdit,
    onSelectRow,
    onToggleExpand,
    onToggleTreeExpand,
    rowDraggable,
    onRowOrderChange,
    cellContextMenu,
    onContextMenu,
    striped,
  } = props

  const [editingCell, setEditingCell] = useState<{
    rowId: RowId
    col: string
  } | null>(null)
  const [editValue, setEditValue] = useState('')
  const editRef = useRef<HTMLInputElement>(null)

  const [dragRowIdx, setDragRowIdx] = useState<number | null>(null)
  const [dragOverRowIdx, setDragOverRowIdx] = useState<number | null>(null)

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

  const handleRowDragStart = (e: React.DragEvent, idx: number) => {
    setDragRowIdx(idx)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(idx))
  }

  const handleRowDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverRowIdx(idx)
  }

  const handleRowDrop = (_e: React.DragEvent, toIdx: number) => {
    if (dragRowIdx !== null && dragRowIdx !== toIdx) {
      onRowOrderChange?.(dragRowIdx, toIdx)
    }
    setDragRowIdx(null)
    setDragOverRowIdx(null)
  }

  const handleRowDragEnd = () => {
    setDragRowIdx(null)
    setDragOverRowIdx(null)
  }

  const handleCellContext = (
    e: React.MouseEvent,
    id: RowId,
    colKey: string,
    data: Record<string, unknown>,
  ) => {
    if (!cellContextMenu) return
    e.preventDefault()
    const items = cellContextMenu(id, colKey, data)
    if (items.length > 0) {
      onContextMenu({ x: e.clientX, y: e.clientY, items })
    }
  }

  if (flatRows.length === 0) {
    return (
      <div
        className="sg-table-empty"
        style={{ gridColumn: `1 / ${totalCols + 1}` }}
        role="row"
      >
        <span role="cell">{t.emptyText}</span>
      </div>
    )
  }

  return (
    <>
      {flatRows.map((row, rowIdx) => {
        const isExpanded = expandedKeys.has(row.id)
        const isSelected = rowSelection?.selectedKeys.includes(row.id)
        const canExpand = expandable?.rowExpandable
          ? expandable.rowExpandable(row.data)
          : !!expandable

        const rowCls =
          typeof rowClassName === 'function'
            ? rowClassName(row.data, row.id)
            : (rowClassName ?? '')

        const isZebra = striped && rowIdx % 2 === 1
        const isDragOver = dragOverRowIdx === rowIdx && dragRowIdx !== rowIdx

        return (
          <React.Fragment key={row.id}>
            <div
              className={[
                'sg-table-row',
                isSelected ? 'sg-table-row-selected' : '',
                onRowClick ? 'sg-table-row-clickable' : '',
                isZebra ? 'sg-table-row-striped' : '',
                isDragOver ? 'sg-table-row-drag-over' : '',
                rowCls,
              ]
                .filter(Boolean)
                .join(' ')}
              role="row"
              style={{ display: 'contents' }}
              draggable={rowDraggable}
              onDragStart={
                rowDraggable ? (e) => handleRowDragStart(e, rowIdx) : undefined
              }
              onDragOver={
                rowDraggable ? (e) => handleRowDragOver(e, rowIdx) : undefined
              }
              onDrop={rowDraggable ? (e) => handleRowDrop(e, rowIdx) : undefined}
              onDragEnd={rowDraggable ? handleRowDragEnd : undefined}
            >
              {rowDraggable && (
                <div
                  className="sg-table-td sg-table-cell-drag-handle"
                  role="cell"
                  style={{ cursor: 'grab', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  ⠿
                </div>
              )}

              {rowSelection && (
                <div
                  className="sg-table-td sg-table-cell-selection"
                  role="cell"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectRow(row.id, row.data)
                  }}
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
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleExpand(row.id)
                      }}
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
                const isEditing =
                  editingCell?.rowId === row.id && editingCell?.col === col.key

                const cellStyle: React.CSSProperties = { ...fixedStyle(col) }
                if (span?.colSpan && span.colSpan > 1)
                  cellStyle.gridColumn = `span ${span.colSpan}`
                if (span?.rowSpan && span.rowSpan > 1)
                  cellStyle.gridRow = `span ${span.rowSpan}`

                const isFirstCol = colIndex === 0
                const treeIndent =
                  isTreeMode && isFirstCol ? row.depth * indentSize : 0

                return (
                  <div
                    key={col.key}
                    className={[
                      'sg-table-td',
                      col.fixed ? 'sg-table-cell-fixed' : '',
                      col.editable ? 'sg-table-td-editable' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    style={cellStyle}
                    role="cell"
                    onClick={() => onRowClick?.(row.id, row.data)}
                    onContextMenu={(e) =>
                      handleCellContext(e, row.id, col.key, row.data)
                    }
                    onDoubleClick={
                      col.editable && onCellEdit
                        ? (e) => {
                            e.stopPropagation()
                            handleEditStart(row.id, col.key, val)
                          }
                        : undefined
                    }
                  >
                    {isTreeMode && isFirstCol && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          minWidth: treeIndent + 20,
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ width: treeIndent }} />
                        {row.hasChildren ? (
                          <button
                            className={`sg-table-expand-btn${treeExpanded.has(row.id) ? ' sg-table-expand-open' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              onToggleTreeExpand(row.id)
                            }}
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

            {expandable && isExpanded && (
              <div
                className="sg-table-expanded-row"
                style={{ gridColumn: `1 / ${totalCols + 1}` }}
                role="row"
              >
                <div role="cell">
                  {expandable.expandedRowRender(row.data, row.id)}
                </div>
              </div>
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}
