import { useMemo } from 'react'
import { colorForSeries } from './types'
import type { ChartSeries } from './types'
import type { CSSProperties } from 'react'

export interface PieChartSlice {
  /** Stable id for keying / legend. */
  id: string
  /** Display label (legend / accessible description). */
  label: string
  /** Numeric value. Negative values are clamped to 0. */
  value: number
  /** Optional explicit fill colour. Falls back to default palette by index. */
  color?: string
}

export interface PieChartProps {
  data: readonly PieChartSlice[]
  /** SVG width. */
  width?: number | string
  /** SVG height. */
  height?: number | string
  /** Inner radius (donut). 0 → solid pie. @default 0 */
  innerRadius?: number
  /** Outer radius. @default 80 */
  outerRadius?: number
  /** Drop default sg-chart classes. */
  unstyled?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * Minimal SVG pie / donut chart. v0 — clockwise from 12 o'clock, no labels,
 * no legend, no animation. Theming via per-slice `color` or default palette.
 */
export function PieChart({
  data,
  width = 200,
  height = 200,
  innerRadius = 0,
  outerRadius = 80,
  unstyled = false,
  className,
  style,
}: PieChartProps) {
  const total = useMemo(
    () => data.reduce((sum, d) => sum + Math.max(0, d.value), 0),
    [data],
  )

  const cx = typeof width === 'number' ? width / 2 : 100
  const cy = typeof height === 'number' ? height / 2 : 100

  const wrapperClass = unstyled ? className : ['sg-chart', 'sg-chart-pie', className].filter(Boolean).join(' ')

  if (total === 0 || data.length === 0) {
    return (
      <svg
        className={wrapperClass}
        style={style}
        width={width}
        height={height}
        viewBox={`0 0 ${cx * 2} ${cy * 2}`}
        role="img"
        aria-label="Pie chart (empty)"
      />
    )
  }

  let cursor = -Math.PI / 2 // start at 12 o'clock

  return (
    <svg
      className={wrapperClass}
      style={style}
      width={width}
      height={height}
      viewBox={`0 0 ${cx * 2} ${cy * 2}`}
      role="img"
      aria-label="Pie chart"
    >
      {data.map((slice, i) => {
        const value = Math.max(0, slice.value)
        if (value === 0) return null
        const angle = (value / total) * 2 * Math.PI
        const startAngle = cursor
        const endAngle = cursor + angle
        cursor = endAngle

        const x0 = cx + outerRadius * Math.cos(startAngle)
        const y0 = cy + outerRadius * Math.sin(startAngle)
        const x1 = cx + outerRadius * Math.cos(endAngle)
        const y1 = cy + outerRadius * Math.sin(endAngle)
        const largeArc = angle > Math.PI ? 1 : 0

        const inner = innerRadius > 0
        const ix0 = cx + innerRadius * Math.cos(startAngle)
        const iy0 = cy + innerRadius * Math.sin(startAngle)
        const ix1 = cx + innerRadius * Math.cos(endAngle)
        const iy1 = cy + innerRadius * Math.sin(endAngle)

        const d = inner
          ? [
              `M ${x0} ${y0}`,
              `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x1} ${y1}`,
              `L ${ix1} ${iy1}`,
              `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix0} ${iy0}`,
              'Z',
            ].join(' ')
          : [
              `M ${cx} ${cy}`,
              `L ${x0} ${y0}`,
              `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x1} ${y1}`,
              'Z',
            ].join(' ')

        const fakeSeries: ChartSeries = { id: slice.id, label: slice.label, values: [], color: slice.color }
        return (
          <path
            key={slice.id}
            d={d}
            fill={colorForSeries(fakeSeries, i)}
            data-slice-id={slice.id}
          >
            <title>{`${slice.label}: ${slice.value}`}</title>
          </path>
        )
      })}
    </svg>
  )
}
