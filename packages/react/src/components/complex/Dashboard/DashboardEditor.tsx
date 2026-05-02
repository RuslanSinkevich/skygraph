import { useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import type { DashboardWidget } from './Dashboard'

/**
 * Patch describing a layout change for one widget. Only the changed fields
 * are present, so consumers can spread it onto their existing widget state.
 */
export type DashboardLayoutPatch = Partial<Pick<DashboardWidget, 'x' | 'y' | 'w' | 'h'>>

/**
 * Callback signature: receives the full updated widgets array (already
 * patched with the new `(x, y, w, h)` for the affected widget). Designed
 * for `onLayoutChange={setWidgets}`.
 *
 * The second argument is metadata describing what just changed — useful
 * if the caller needs to log / audit / persist a single widget without
 * diffing the whole array.
 */
export type DashboardLayoutChange = (
  next: DashboardWidget[],
  meta: { widgetId: string; patch: DashboardLayoutPatch },
) => void

export interface DashboardEditorProps {
  /** Widgets pinned to grid cells. */
  widgets: readonly DashboardWidget[]
  /**
   * Called whenever a widget is dragged or resized to a new cell. Receives
   * the full updated widgets array. Skipped when no actual layout change
   * occurred (drag inside the same cell).
   */
  onLayoutChange?: DashboardLayoutChange
  /** Total grid columns. @default 12 */
  columns?: number
  /** Row height in pixels (uniform). @default 80 */
  rowHeight?: number
  /** Gap between cells in pixels. @default 16 */
  gap?: number
  /**
   * When `false`, drag / resize handlers are disabled and the editor renders
   * read-only (still keeps the resize-handle DOM hidden). @default true
   */
  editable?: boolean
  /** Drop default `sg-dashboard-*` classes. */
  unstyled?: boolean
  /** Root wrapper className. */
  className?: string
  /** Root wrapper inline style. */
  style?: CSSProperties
}

const MIN_W = 1
const MIN_H = 1

interface DragState {
  kind: 'move' | 'resize'
  widgetId: string
  startClientX: number
  startClientY: number
  origX: number
  origY: number
  origW: number
  origH: number
  cellW: number
  cellH: number
  columns: number
  gap: number
  /** Last emitted (x, y, w, h) to skip duplicate `onLayoutChange` calls. */
  lastX: number
  lastY: number
  lastW: number
  lastH: number
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}

/**
 * Editable variant of `Dashboard` — drag widgets by their header to move
 * `(x, y)`, drag the bottom-right handle to resize `(w, h)`. Layout snaps
 * to the underlying CSS grid.
 *
 * Implementation notes:
 *   - Pointer events with `window` listeners (no pointer capture, no
 *     wheel-blocking, no React state during drag — we only `onLayoutChange`
 *     when the snapped cell actually changes).
 *   - Cell width is computed from `gridRef.getBoundingClientRect()` at drag
 *     start. This means responsive containers stay accurate even when the
 *     parent re-flows between drags.
 *   - Movement uses `Math.round(delta / cell)` so the widget snaps to the
 *     nearest cell while the pointer is moving (predictable, no overshoot).
 */
export function DashboardEditor({
  widgets,
  onLayoutChange,
  columns = 12,
  rowHeight = 80,
  gap = 16,
  editable = true,
  unstyled = false,
  className,
  style,
}: DashboardEditorProps) {
  const gridRef = useRef<HTMLDivElement | null>(null)
  const dragRef = useRef<DragState | null>(null)
  // Latest widgets are read inside drag handlers via this ref so that
  // re-renders during drag don't break stale-closure equality checks.
  const widgetsRef = useRef(widgets)
  widgetsRef.current = widgets
  const onChangeRef = useRef(onLayoutChange)
  onChangeRef.current = onLayoutChange

  function emitChange(widgetId: string, patch: DashboardLayoutPatch) {
    const cb = onChangeRef.current
    if (!cb) return
    const list = widgetsRef.current
    const next = list.map((w) => (w.id === widgetId ? { ...w, ...patch } : w))
    cb(next, { widgetId, patch })
  }

  function startDrag(
    e: ReactPointerEvent<HTMLElement>,
    widget: DashboardWidget,
    kind: 'move' | 'resize',
  ) {
    if (!editable || !onChangeRef.current) return
    const grid = gridRef.current
    if (!grid) return
    e.preventDefault()
    e.stopPropagation()

    const rect = grid.getBoundingClientRect()
    // Fallback to a sensible minimum if the container isn't laid out yet
    // (e.g. inside a hidden parent). Without this, division by zero would
    // make every move snap to the same cell.
    const usableW = Math.max(rect.width, columns + gap * (columns - 1))
    const totalGap = gap * Math.max(0, columns - 1)
    const cellW = Math.max(1, (usableW - totalGap) / columns)

    const origW = widget.w ?? 1
    const origH = widget.h ?? 1
    const drag: DragState = {
      kind,
      widgetId: widget.id,
      startClientX: e.clientX,
      startClientY: e.clientY,
      origX: widget.x,
      origY: widget.y,
      origW,
      origH,
      cellW,
      cellH: rowHeight,
      columns,
      gap,
      lastX: widget.x,
      lastY: widget.y,
      lastW: origW,
      lastH: origH,
    }
    dragRef.current = drag

    function onMove(ev: PointerEvent) {
      const d = dragRef.current
      if (!d) return
      const dx = ev.clientX - d.startClientX
      const dy = ev.clientY - d.startClientY
      const colUnit = d.cellW + d.gap
      const rowUnit = d.cellH + d.gap
      const dCol = Math.round(dx / colUnit)
      const dRow = Math.round(dy / rowUnit)

      if (d.kind === 'move') {
        const ww = d.origW
        const newX = clamp(d.origX + dCol, 1, Math.max(1, d.columns - ww + 1))
        const newY = Math.max(1, d.origY + dRow)
        if (newX !== d.lastX || newY !== d.lastY) {
          d.lastX = newX
          d.lastY = newY
          emitChange(d.widgetId, { x: newX, y: newY })
        }
      } else {
        const newW = clamp(d.origW + dCol, MIN_W, Math.max(MIN_W, d.columns - d.origX + 1))
        const newH = Math.max(MIN_H, d.origH + dRow)
        if (newW !== d.lastW || newH !== d.lastH) {
          d.lastW = newW
          d.lastH = newH
          emitChange(d.widgetId, { w: newW, h: newH })
        }
      }
    }

    function onUp() {
      dragRef.current = null
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
  }

  const wrapperClass = unstyled
    ? className
    : ['sg-dashboard', 'sg-dashboard-editor', className].filter(Boolean).join(' ')

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridAutoRows: `${rowHeight}px`,
    gap,
    ...style,
  }

  const headerCursor = editable ? 'grab' : undefined

  return (
    <div
      ref={gridRef}
      className={wrapperClass}
      style={gridStyle}
      role="region"
      aria-label="Dashboard editor"
      data-edit-mode={editable ? 'true' : 'false'}
    >
      {widgets.map((w) => {
        const widgetClass = unstyled
          ? w.className
          : ['sg-dashboard-widget', w.className].filter(Boolean).join(' ')
        const widgetStyle: CSSProperties = {
          gridColumn: `${w.x} / span ${w.w ?? 1}`,
          gridRow: `${w.y} / span ${w.h ?? 1}`,
          position: 'relative',
          ...w.style,
        }
        const content = w.children ?? w.render?.() ?? null
        return (
          <div
            key={w.id}
            className={widgetClass}
            style={widgetStyle}
            data-widget-id={w.id}
          >
            <div
              className={unstyled ? undefined : 'sg-dashboard-widget-header'}
              data-role="drag-handle"
              onPointerDown={editable ? (e) => startDrag(e, w, 'move') : undefined}
              style={{
                touchAction: editable ? 'none' : undefined,
                cursor: headerCursor,
                userSelect: editable ? 'none' : undefined,
              }}
            >
              {w.title ?? null}
            </div>
            <div className={unstyled ? undefined : 'sg-dashboard-widget-body'}>
              {content}
            </div>
            {editable && (
              <div
                className={unstyled ? undefined : 'sg-dashboard-editor-resize-handle'}
                data-role="resize-handle"
                role="button"
                aria-label="Resize widget"
                tabIndex={-1}
                onPointerDown={(e) => startDrag(e, w, 'resize')}
                style={{ touchAction: 'none' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
