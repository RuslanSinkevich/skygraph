import type { CSSProperties, ReactNode } from 'react'

/** A single widget pinned to a CSS-grid cell range. */
export interface DashboardWidget {
  /** Stable id (used as React key + data-widget-id). */
  id: string
  /** Display title (rendered in the widget header by default). */
  title?: ReactNode
  /** 1-based column index (`gridColumnStart`). */
  x: number
  /** 1-based row index (`gridRowStart`). */
  y: number
  /** Column span. @default 1 */
  w?: number
  /** Row span. @default 1 */
  h?: number
  /** Widget content. Either `children` or a `render` callback. */
  children?: ReactNode
  /** Optional renderer (alternative to `children`). */
  render?: () => ReactNode
  /** Optional className applied to the widget wrapper. */
  className?: string
  /** Optional inline style for the widget wrapper. */
  style?: CSSProperties
}

export interface DashboardProps {
  /** Widgets pinned to grid cells. */
  widgets: readonly DashboardWidget[]
  /** Total grid columns. @default 12 */
  columns?: number
  /** Row height in pixels (uniform). @default 80 */
  rowHeight?: number
  /** Gap between cells in pixels. @default 16 */
  gap?: number
  /** Drop default `sg-dashboard-*` classes. */
  unstyled?: boolean
  /** Root wrapper className. */
  className?: string
  /** Root wrapper inline style. */
  style?: CSSProperties
}

/**
 * Minimal static-layout dashboard. v0:
 *   - CSS Grid with `columns` columns and a uniform `rowHeight`.
 *   - Each widget pins to its `(x, y, w, h)` cell range.
 *   - No drag, no resize, no auto-pack — that's `Dashboard.Editor` in a
 *     follow-up stream.
 *
 * Use as a primitive for read-only dashboards or as the rendering layer for
 * a richer editor built on top of `GraphEngine` / a future `LayoutEngine`.
 */
export function Dashboard({
  widgets,
  columns = 12,
  rowHeight = 80,
  gap = 16,
  unstyled = false,
  className,
  style,
}: DashboardProps) {
  const wrapperClass = unstyled
    ? className
    : ['sg-dashboard', className].filter(Boolean).join(' ')

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridAutoRows: `${rowHeight}px`,
    gap,
    ...style,
  }

  return (
    <div className={wrapperClass} style={gridStyle} role="region" aria-label="Dashboard">
      {widgets.map((w) => {
        const widgetClass = unstyled ? w.className : ['sg-dashboard-widget', w.className].filter(Boolean).join(' ')
        const widgetStyle: CSSProperties = {
          gridColumn: `${w.x} / span ${w.w ?? 1}`,
          gridRow: `${w.y} / span ${w.h ?? 1}`,
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
            {w.title !== undefined && (
              <div className={unstyled ? undefined : 'sg-dashboard-widget-header'}>
                {w.title}
              </div>
            )}
            <div className={unstyled ? undefined : 'sg-dashboard-widget-body'}>
              {content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
