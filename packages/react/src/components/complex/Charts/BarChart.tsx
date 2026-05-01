import { useMemo } from 'react'
import {
  chartBounds,
  colorForSeries,
  normalizePadding,
} from './types'
import type { BaseChartProps } from './types'

export interface BarChartProps extends BaseChartProps {
  /** Gap between groups in [0..1] of category step. @default 0.2 */
  groupGap?: number
  /** Gap between bars within a group in [0..1] of bar slot. @default 0.1 */
  barGap?: number
}

/**
 * Minimal SVG bar chart. v0 — grouped bars per category (one bar per series),
 * no axes, no tooltip. Theming via `--sg-color-*` tokens.
 */
export function BarChart({
  categories,
  series,
  width = '100%',
  height = 200,
  className,
  style,
  unstyled = false,
  padding,
  groupGap = 0.2,
  barGap = 0.1,
}: BarChartProps) {
  const [pt, pr, pb, pl] = normalizePadding(padding)
  const viewW = 600
  const viewH = height
  const plotW = viewW - pl - pr
  const plotH = viewH - pt - pb

  const { min, max } = useMemo(
    () => chartBounds(series.map((s) => s.values)),
    [series],
  )

  // Always include zero in the range so positive bars rest on the baseline.
  const baseline = Math.min(0, min)
  const top = Math.max(0, max)
  const span = top - baseline || 1
  const yZero = pt + (top / span) * plotH

  const groupCount = categories.length
  const groupWidth = groupCount > 0 ? plotW / groupCount : 0
  const groupInner = groupWidth * (1 - groupGap)
  const seriesCount = series.length
  const barSlot = seriesCount > 0 ? groupInner / seriesCount : 0
  const barWidth = barSlot * (1 - barGap)

  const wrapperClass = unstyled ? className : ['sg-chart', 'sg-chart-bar', className].filter(Boolean).join(' ')

  return (
    <svg
      className={wrapperClass}
      style={style}
      width={width}
      height={height}
      viewBox={`0 0 ${viewW} ${viewH}`}
      preserveAspectRatio="none"
      role="img"
      aria-label="Bar chart"
    >
      {/* baseline */}
      <line
        x1={pl}
        x2={pl + plotW}
        y1={yZero}
        y2={yZero}
        stroke="var(--sg-color-border)"
        strokeWidth={1}
      />
      {categories.map((_, gi) => {
        const groupStart = pl + gi * groupWidth + (groupWidth - groupInner) / 2
        return series.map((s, si) => {
          const v = s.values[gi]
          if (v === null || v === undefined) return null
          const x = groupStart + si * barSlot + (barSlot - barWidth) / 2
          const yTop = pt + ((top - Math.max(v, 0)) / span) * plotH
          const yBottom = pt + ((top - Math.min(v, 0)) / span) * plotH
          const h = Math.max(0, yBottom - yTop)
          return (
            <rect
              key={`${s.id}-${gi}`}
              x={x}
              y={yTop}
              width={Math.max(1, barWidth)}
              height={h}
              fill={colorForSeries(s, si)}
              rx={2}
            />
          )
        })
      })}
    </svg>
  )
}
