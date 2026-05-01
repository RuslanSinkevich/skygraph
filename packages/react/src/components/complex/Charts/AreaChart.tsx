import { useMemo } from 'react'
import {
  chartBounds,
  colorForSeries,
  normalizePadding,
} from './types'
import type { BaseChartProps } from './types'

export interface AreaChartProps extends BaseChartProps {
  /** Stack series on top of each other (cumulative). @default false */
  stacked?: boolean
  /** Stroke width on the top edge. @default 2 */
  strokeWidth?: number
  /** Fill opacity (0..1). @default 0.25 */
  fillOpacity?: number
}

/**
 * Minimal SVG area chart. v0 — straight segments between points, optional
 * stacking, no axes / tooltip / animation.
 */
export function AreaChart({
  categories,
  series,
  width = '100%',
  height = 200,
  className,
  style,
  unstyled = false,
  padding,
  stacked = false,
  strokeWidth = 2,
  fillOpacity = 0.25,
}: AreaChartProps) {
  const [pt, pr, pb, pl] = normalizePadding(padding)
  const viewW = 600
  const viewH = height
  const plotW = viewW - pl - pr
  const plotH = viewH - pt - pb

  // Effective values per series — for stacked, each series adds to the
  // running total (treating null as 0 for the stack base).
  const stackedValues = useMemo(() => {
    if (!stacked) return series.map((s) => [...s.values])
    const totals = new Array(categories.length).fill(0)
    return series.map((s) => {
      const out: (number | null)[] = []
      s.values.forEach((v, i) => {
        if (v === null || v === undefined) {
          out.push(null)
          return
        }
        totals[i] += v
        out.push(totals[i])
      })
      return out
    })
  }, [series, stacked, categories.length])

  const { min, max } = useMemo(
    () => chartBounds(stackedValues),
    [stackedValues],
  )

  const baseline = Math.min(0, min)
  const top = Math.max(0, max)
  const span = top - baseline || 1

  const xStep = categories.length > 1 ? plotW / (categories.length - 1) : 0
  function xFor(i: number) {
    return pl + i * xStep
  }
  function yFor(v: number) {
    return pt + ((top - v) / span) * plotH
  }
  const yBase = yFor(0)

  const wrapperClass = unstyled ? className : ['sg-chart', 'sg-chart-area', className].filter(Boolean).join(' ')

  return (
    <svg
      className={wrapperClass}
      style={style}
      width={width}
      height={height}
      viewBox={`0 0 ${viewW} ${viewH}`}
      preserveAspectRatio="none"
      role="img"
      aria-label="Area chart"
    >
      {series.map((s, sIdx) => {
        const color = colorForSeries(s, sIdx)
        const vals = stackedValues[sIdx]!
        // Build "area" polygon: top line forward, then close along baseline backward.
        const topPoints: [number, number][] = []
        vals.forEach((v, i) => {
          if (v === null || v === undefined) return
          topPoints.push([xFor(i), yFor(v)])
        })
        if (topPoints.length === 0) return null
        const first = topPoints[0]!
        const last = topPoints[topPoints.length - 1]!
        const areaPath = [
          `M ${first[0]} ${yBase}`,
          ...topPoints.map((p) => `L ${p[0]} ${p[1]}`),
          `L ${last[0]} ${yBase}`,
          'Z',
        ].join(' ')
        const linePath = topPoints
          .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
          .join(' ')
        return (
          <g key={s.id}>
            <path d={areaPath} fill={color} fillOpacity={fillOpacity} stroke="none" />
            <path d={linePath} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )
      })}
    </svg>
  )
}
