import type { CSSProperties } from 'react'
import { colorForSeries } from './types'
import type { ChartSeries } from './types'

export interface ChartLegendProps {
  series: readonly ChartSeries[]
  className?: string
  style?: CSSProperties
}

/**
 * Minimal horizontal legend for charts. Renders below the SVG with one
 * `<span>` per series (colored swatch + label).
 */
export function ChartLegend({ series, className, style }: ChartLegendProps) {
  return (
    <div
      className={['sg-chart-legend', className].filter(Boolean).join(' ')}
      role="list"
      aria-label="Chart legend"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        marginTop: 8,
        fontSize: 12,
        color: 'var(--sg-color-text-secondary)',
        ...style,
      }}
    >
      {series.map((s, i) => (
        <span
          key={s.id}
          role="listitem"
          className="sg-chart-legend-item"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          <span
            aria-hidden="true"
            className="sg-chart-legend-swatch"
            style={{
              display: 'inline-block',
              width: 10,
              height: 10,
              borderRadius: 2,
              background: colorForSeries(s, i),
            }}
          />
          {s.label}
        </span>
      ))}
    </div>
  )
}
