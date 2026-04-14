import React, { forwardRef, useImperativeHandle, useCallback, useRef, useMemo } from 'react'
import { useVirtualScroll } from '../../../hooks/useVirtualScroll'
import { useDataGridState } from './useDataGridState'
import type {
  DataGridProps,
  DataGridRef,
  CellPosition,
  CellValue,
  DataGridColumn,
  CellEditorProps,
} from './types'

const cls = {
  root: 'sg-datagrid',
  header: 'sg-datagrid-header',
  headerCell: 'sg-datagrid-header-cell',
  body: 'sg-datagrid-body',
  row: 'sg-datagrid-row',
  cell: 'sg-datagrid-cell',
  cellActive: 'sg-datagrid-cell--active',
  cellEditing: 'sg-datagrid-cell--editing',
  cellSelected: 'sg-datagrid-cell--selected',
  frozen: 'sg-datagrid-cell--frozen',
  sortable: 'sg-datagrid-header-cell--sortable',
  sortAsc: 'sg-datagrid-header-cell--asc',
  sortDesc: 'sg-datagrid-header-cell--desc',
  resizer: 'sg-datagrid-resizer',
  empty: 'sg-datagrid-empty',
}

function DefaultEditor({ value, onChange, onCommit, onCancel }: CellEditorProps) {
  return (
    <input
      autoFocus
      defaultValue={value == null ? '' : String(value)}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onCommit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onCommit()
        if (e.key === 'Escape') onCancel()
      }}
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        outline: 'none',
        padding: '0 8px',
        background: 'transparent',
        font: 'inherit',
      }}
    />
  )
}

function isCellInRange(row: number, col: number, range: { start: CellPosition; end: CellPosition } | null): boolean {
  if (!range) return false
  const minRow = Math.min(range.start.row, range.end.row)
  const maxRow = Math.max(range.start.row, range.end.row)
  const minCol = Math.min(range.start.col, range.end.col)
  const maxCol = Math.max(range.start.col, range.end.col)
  return row >= minRow && row <= maxRow && col >= minCol && col <= maxCol
}

function DataGridInner<R extends Record<string, unknown>>(
  props: DataGridProps<R>,
  ref: React.ForwardedRef<DataGridRef>,
) {
  const {
    columns,
    data,
    rowKey,
    rowHeight = 36,
    headerHeight = 40,
    width = '100%',
    height = 400,
    className,
    style,
    onCellEdit,
    sortColumn,
    sortDirection,
    onSort,
    onCopy,
    onPaste,
    overscan = 5,
    locale,
  } = props

  const containerRef = useRef<HTMLDivElement>(null)

  const state = useDataGridState(columns, data)
  const {
    activeCell,
    setActiveCell,
    editingCell,
    startEditing,
    stopEditing,
    editValueRef,
    selection,
    navigate,
    resizeColumn,
    getColumnWidth,
  } = state

  const { range, containerRef: scrollRef, scrollToIndex } = useVirtualScroll({
    itemCount: data.length,
    itemHeight: rowHeight,
    overscan,
  })

  const getRowKey = useCallback(
    (row: R, index: number): React.Key => {
      if (typeof rowKey === 'function') return rowKey(row, index)
      return row[rowKey] as React.Key
    },
    [rowKey],
  )

  const totalWidth = useMemo(
    () => columns.reduce((sum, col) => sum + getColumnWidth(col.key), 0),
    [columns, getColumnWidth],
  )

  const frozenLeft = useMemo(
    () => columns.filter((c) => c.frozen === 'left'),
    [columns],
  )
  const frozenRight = useMemo(
    () => columns.filter((c) => c.frozen === 'right'),
    [columns],
  )
  const scrollable = useMemo(
    () => columns.filter((c) => !c.frozen),
    [columns],
  )

  const orderedColumns = useMemo(
    () => [...frozenLeft, ...scrollable, ...frozenRight],
    [frozenLeft, scrollable, frozenRight],
  )

  const handleCellClick = useCallback(
    (rowIndex: number, colIndex: number) => {
      if (editingCell) {
        if (onCellEdit && editValueRef.current !== undefined) {
          onCellEdit(editingCell.row, columns[editingCell.col].key, editValueRef.current)
        }
        stopEditing()
      }
      setActiveCell({ row: rowIndex, col: colIndex })
    },
    [editingCell, onCellEdit, editValueRef, columns, stopEditing, setActiveCell],
  )

  const handleCellDoubleClick = useCallback(
    (rowIndex: number, colIndex: number) => {
      startEditing({ row: rowIndex, col: colIndex })
    },
    [startEditing],
  )

  const handleCommitEdit = useCallback(() => {
    if (editingCell && onCellEdit && editValueRef.current !== undefined) {
      onCellEdit(editingCell.row, orderedColumns[editingCell.col].key, editValueRef.current)
    }
    stopEditing()
  }, [editingCell, onCellEdit, editValueRef, orderedColumns, stopEditing])

  const handleCancelEdit = useCallback(() => {
    stopEditing()
  }, [stopEditing])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!activeCell) return

      if (editingCell) return

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          navigate(activeCell, 'up', e.shiftKey)
          break
        case 'ArrowDown':
          e.preventDefault()
          navigate(activeCell, 'down', e.shiftKey)
          break
        case 'ArrowLeft':
          e.preventDefault()
          navigate(activeCell, 'left', e.shiftKey)
          break
        case 'ArrowRight':
          e.preventDefault()
          navigate(activeCell, 'right', e.shiftKey)
          break
        case 'Enter':
          e.preventDefault()
          startEditing(activeCell)
          break
        case 'Tab':
          e.preventDefault()
          navigate(activeCell, e.shiftKey ? 'left' : 'right')
          break
        case 'Escape':
          setActiveCell(null)
          break
        case 'c':
          if ((e.ctrlKey || e.metaKey) && onCopy) {
            e.preventDefault()
            const col = orderedColumns[activeCell.col]
            const val = data[activeCell.row]?.[col.key]
            onCopy(val == null ? '' : String(val))
          }
          break
        case 'v':
          if ((e.ctrlKey || e.metaKey) && onPaste) {
            e.preventDefault()
            navigator.clipboard?.readText().then((text) => {
              onPaste(text, activeCell)
            })
          }
          break
      }
    },
    [activeCell, editingCell, navigate, startEditing, setActiveCell, onCopy, onPaste, orderedColumns, data],
  )

  const handleSort = useCallback(
    (col: DataGridColumn<R>) => {
      if (!col.sortable || !onSort) return
      const dir = sortColumn === col.key && sortDirection === 'asc' ? 'desc' : 'asc'
      onSort(col.key, dir)
    },
    [sortColumn, sortDirection, onSort],
  )

  useImperativeHandle(
    ref,
    () => ({
      scrollToRow: scrollToIndex,
      scrollToColumn: () => {},
      getActiveCell: () => activeCell,
      setActiveCell,
    }),
    [scrollToIndex, activeCell, setActiveCell],
  )

  const handleResizeStart = useCallback(
    (colKey: string, startX: number) => {
      const startWidth = getColumnWidth(colKey)

      const onMouseMove = (e: MouseEvent) => {
        const delta = e.clientX - startX
        resizeColumn(colKey, startWidth + delta)
      }
      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    },
    [getColumnWidth, resizeColumn],
  )

  const renderCell = useCallback(
    (row: R, rowIndex: number, col: DataGridColumn<R>, colIndex: number) => {
      const isActive = activeCell?.row === rowIndex && activeCell?.col === colIndex
      const isEditing = editingCell?.row === rowIndex && editingCell?.col === colIndex
      const isSelected = isCellInRange(rowIndex, colIndex, selection)

      let rawValue = col.formula
        ? col.formula(row)
        : (row[col.key] as CellValue)

      const cellClassNames = [
        cls.cell,
        isActive ? cls.cellActive : '',
        isEditing ? cls.cellEditing : '',
        isSelected ? cls.cellSelected : '',
        col.frozen ? cls.frozen : '',
        col.className ?? '',
      ]
        .filter(Boolean)
        .join(' ')

      const cellStyle: React.CSSProperties = {
        width: getColumnWidth(col.key),
        minWidth: getColumnWidth(col.key),
        textAlign: col.align ?? 'left',
      }

      return (
        <div
          key={col.key}
          className={cellClassNames}
          style={cellStyle}
          onClick={() => handleCellClick(rowIndex, colIndex)}
          onDoubleClick={() => handleCellDoubleClick(rowIndex, colIndex)}
          role="gridcell"
          aria-colindex={colIndex + 1}
          aria-selected={isActive || isSelected}
        >
          {isEditing ? (
            (col.editor ?? (DefaultEditor as (props: CellEditorProps<R>) => React.ReactNode))({
              value: rawValue,
              row,
              rowIndex,
              column: col,
              onChange: (v) => {
                editValueRef.current = v
              },
              onCommit: handleCommitEdit,
              onCancel: handleCancelEdit,
            })
          ) : col.render ? (
            col.render(rawValue, row, rowIndex)
          ) : (
            <span>{rawValue == null ? '' : String(rawValue)}</span>
          )}
        </div>
      )
    },
    [
      activeCell,
      editingCell,
      selection,
      getColumnWidth,
      handleCellClick,
      handleCellDoubleClick,
      handleCommitEdit,
      handleCancelEdit,
      editValueRef,
    ],
  )

  const heightValue = typeof height === 'number' ? height : undefined
  const bodyHeight = heightValue ? heightValue - headerHeight : undefined

  return (
    <div
      ref={containerRef}
      className={`${cls.root} ${className ?? ''}`}
      style={{ width, height, display: 'flex', flexDirection: 'column', ...style }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="grid"
      aria-rowcount={data.length}
      aria-colcount={columns.length}
    >
      {/* Header */}
      <div
        className={cls.header}
        style={{
          display: 'flex',
          height: headerHeight,
          minHeight: headerHeight,
          minWidth: totalWidth,
        }}
        role="row"
      >
        {orderedColumns.map((col) => {
          const isSorted = sortColumn === col.key
          const headerCls = [
            cls.headerCell,
            col.sortable ? cls.sortable : '',
            isSorted && sortDirection === 'asc' ? cls.sortAsc : '',
            isSorted && sortDirection === 'desc' ? cls.sortDesc : '',
            col.headerClassName ?? '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <div
              key={col.key}
              className={headerCls}
              style={{
                width: getColumnWidth(col.key),
                minWidth: getColumnWidth(col.key),
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '0 8px',
                cursor: col.sortable ? 'pointer' : 'default',
                userSelect: 'none',
              }}
              onClick={() => handleSort(col)}
              role="columnheader"
            >
              {col.title}
              {isSorted && (
                <span style={{ marginLeft: 4, fontSize: 10 }}>
                  {sortDirection === 'asc' ? '▲' : '▼'}
                </span>
              )}
              {col.resizable !== false && (
                <div
                  className={cls.resizer}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    cursor: 'col-resize',
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation()
                    handleResizeStart(col.key, e.clientX)
                  }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Body */}
      <div
        ref={scrollRef as React.RefObject<HTMLDivElement>}
        className={cls.body}
        style={{
          flex: 1,
          overflow: 'auto',
          position: 'relative',
          height: bodyHeight,
        }}
      >
        {data.length === 0 ? (
          <div className={cls.empty} style={{ padding: 24, textAlign: 'center' }}>
            {locale?.noData ?? 'No data'}
          </div>
        ) : (
          <div style={{ height: range.totalHeight, position: 'relative', minWidth: totalWidth }}>
            {range.visibleItems.map((vi) => {
              const row = data[vi.index]
              if (!row) return null
              return (
                <div
                  key={getRowKey(row, vi.index)}
                  className={cls.row}
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    top: vi.offsetTop,
                    height: vi.height,
                    width: '100%',
                  }}
                  role="row"
                  aria-rowindex={vi.index + 1}
                >
                  {orderedColumns.map((col, ci) => renderCell(row, vi.index, col, ci))}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Virtualized table grid with sortable headers, resizable columns, inline editing, and clipboard hooks.
 */
export const DataGrid = forwardRef(DataGridInner) as <R extends Record<string, unknown>>(
  props: DataGridProps<R> & { ref?: React.Ref<DataGridRef> },
) => React.ReactElement
