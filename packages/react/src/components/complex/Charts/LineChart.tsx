import { useMemo } from 'react'
import {
  chartBounds,
  colorForSeries,
  normalizePadding,
} from './types'
import type { BaseChartProps } from './types'

export interface LineChartProps extends BaseChartProps {
  /** Show small dot markers at each data point. @default true */
  markers?: boolean
  /** Stroke width in pixels. @default 2 */
  strokeWidth?: number
}

/**
 * Minimal SVG line chart. v0 — straight segments between points, no axes,
 * no tooltip, no animation. Theming via `--sg-color-*` tokens.
 */
export function LineChart({
  categories,
  series,
  width = '100%',
  height = 200,
  className,
  style,
  unstyled = false,
  padding,
  markers = true,
  strokeWidth = 2,
}: LineChartProps) {
  const [pt, pr, pb, pl] = normalizePadding(padding)
  const viewW = 600
  const viewH = height
  const plotW = viewW - pl - pr
  const plotH = viewH - pt - pb

  const { min, max } = useMemo(
    () => chartBounds(series.map((s) => s.values)),
    [series],
  )

  const range = max - min || 1
  const xStep = categories.length > 1 ? plotW / (categories.length - 1) : 0

  function xFor(i: number) {
    return pl + i * xStep
  }
  function yFor(v: number) {
    return pt + (1 - (v - min) / range) * plotH
  }

  const wrapperClass = unstyled ? className : ['sg-chart', 'sg-chart-line', className].filter(Boolean).join(' ')

  return (
    <svg
      className={wrapperClass}
      style={style}
      width={width}
      height={height}
      viewBox={`0 0 ${viewW} ${viewH}`}
      preserveAspectRatio="none"
      role="img"
      aria-label="Line chart"
    >
      {series.map((s, sIdx) => {
        const stroke = colorForSeries(s, sIdx)
        const segments: { from: [number, number]; to: [number, number] }[] = []
        let prev: [number, number] | null = null
        s.values.forEach((v, i) => {
          if (v === null || v === undefined) {
            prev = null
            return
          }
          const point: [number, number] = [xFor(i), yFor(v)]
          if (prev) segments.push({ from: prev, to: point })
          prev = point
        })
        return (
          <g key={s.id}>
            {segments.map((seg, segIdx) => (
              <line
                key={segIdx}
                x1={seg.from[0]}
                y1={seg.from[1]}
                x2={seg.to[0]}
                y2={seg.to[1]}
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            ))}
            {markers && s.values.map((v, i) => {
              if (v === null || v === undefined) return null
              return (
                <circle
                  key={i}
                  cx={xFor(i)}
                  cy={yFor(v)}
                  r={Math.max(2, strokeWidth)}
                  fill={stroke}
                />
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}
