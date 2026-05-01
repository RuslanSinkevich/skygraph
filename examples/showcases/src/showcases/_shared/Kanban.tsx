import { useCallback, useState } from 'react'
import type { ReactNode, DragEvent } from 'react'

/**
 * Lightweight Kanban board (HTML5 drag-and-drop, no extra deps).
 * Used by CRM Pipeline and Project Tracker.
 */

export interface KanbanColumn<T> {
  key: string
  title: ReactNode
  color?: string
  items: T[]
  /** Optional sub-line / count displayed in the header. */
  meta?: ReactNode
}

export interface KanbanProps<T extends { id: string | number }> {
  columns: KanbanColumn<T>[]
  /** Render a single card. */
  renderCard: (item: T, columnKey: string) => ReactNode
  /** Called when an item is dropped on another column. */
  onDrop: (itemId: string | number, fromColumn: string, toColumn: string) => void
  /** Min column width. */
  minColumnWidth?: number
  /** Optional click handler on cards. */
  onCardClick?: (item: T) => void
}

interface DragData {
  itemId: string | number
  fromColumn: string
}

export function Kanban<T extends { id: string | number }>({
  columns,
  renderCard,
  onDrop,
  minColumnWidth = 240,
  onCardClick,
}: KanbanProps<T>) {
  const [dragOver, setDragOver] = useState<string | null>(null)
  const [dragging, setDragging] = useState<DragData | null>(null)

  const handleDragStart = useCallback(
    (e: DragEvent<HTMLDivElement>, itemId: string | number, fromColumn: string) => {
      const data: DragData = { itemId, fromColumn }
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('application/json', JSON.stringify(data))
      setDragging(data)
    },
    [],
  )

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>, key: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOver(key)
  }, [])

  const handleDragLeave = useCallback(() => setDragOver(null), [])

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>, toColumn: string) => {
      e.preventDefault()
      setDragOver(null)
      let data: DragData | null = dragging
      try {
        const raw = e.dataTransfer.getData('application/json')
        if (raw) data = JSON.parse(raw) as DragData
      } catch {
        // fall back to in-memory state
      }
      setDragging(null)
      if (!data) return
      if (data.fromColumn === toColumn) return
      onDrop(data.itemId, data.fromColumn, toColumn)
    },
    [dragging, onDrop],
  )

  return (
    <div
      className="kanban-board"
      style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(${minColumnWidth}px, 1fr))` }}
    >
      {columns.map((col) => (
        <div
          key={col.key}
          className={['kanban-col', dragOver === col.key ? 'kanban-col--over' : ''].filter(Boolean).join(' ')}
          onDragOver={(e) => handleDragOver(e, col.key)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, col.key)}
        >
          <div className="kanban-col-header" style={col.color ? { borderTop: `3px solid ${col.color}` } : undefined}>
            <div className="kanban-col-title">{col.title}</div>
            <div className="kanban-col-meta">{col.meta ?? `${col.items.length}`}</div>
          </div>
          <div className="kanban-col-body">
            {col.items.map((item) => (
              <div
                key={item.id}
                className="kanban-card"
                draggable
                onDragStart={(e) => handleDragStart(e, item.id, col.key)}
                onClick={() => onCardClick?.(item)}
              >
                {renderCard(item, col.key)}
              </div>
            ))}
            {col.items.length === 0 && (
              <div className="kanban-col-empty">Drop items here</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
