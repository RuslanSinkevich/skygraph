import type { CSSProperties } from 'react'

/** A single category along the X axis. */
export type ChartCategory = string | number

/** Numeric value for a series at a specific category. */
export type ChartValue = number | null

/** One series — a logical line / bar / pie slice with a label and values. */
export interface ChartSeries {
  /** Unique identifier (used for keying React lists and color resolution). */
  id: string
  /** Human-readable label used in legend / tooltip. */
  label: string
  /** Optional explicit colour (CSS value). Defaults to a deterministic palette by index. */
  color?: string
  /**
   * Per-category values. Index N corresponds to `categories[N]`.
   * Use `null` to mark a gap (line will be split, bar will be hidden).
   */
  values: readonly ChartValue[]
}

/** Common shape for chart props. */
export interface BaseChartProps {
  /** Categories along the X axis. */
  categories: readonly ChartCategory[]
  /** One or more data series. */
  series: readonly ChartSeries[]
  /** Width of the chart in CSS units. Defaults to `'100%'`. */
  width?: number | string
  /** Height of the chart in pixels. Defaults to `200`. */
  height?: number
  /** Optional class name on the root SVG. */
  className?: string
  /** Optional inline style on the root SVG. */
  style?: CSSProperties
  /** Drop default `sg-chart-*` classes (headless mode). */
  unstyled?: boolean
  /** Padding around the plot area in pixels (number or [top, right, bottom, left]). */
  padding?: number | readonly [number, number, number, number]
}

/** Default colour palette — uses tokens so charts re-theme without code changes. */
export const DEFAULT_PALETTE = [
  'var(--sg-color-primary)',
  'var(--sg-color-success)',
  'var(--sg-color-warning)',
  'var(--sg-color-error)',
  'var(--sg-blue-4)',
  'var(--sg-orange-5)',
  'var(--sg-green-5)',
  'var(--sg-red-5)',
] as const

export function colorForSeries(series: ChartSeries, index: number): string {
  return series.color ?? DEFAULT_PALETTE[index % DEFAULT_PALETTE.length]!
}

export function normalizePadding(p: BaseChartProps['padding']): [number, number, number, number] {
  if (p === undefined) return [16, 16, 24, 32]
  if (typeof p === 'number') return [p, p, p, p]
  return [...p]
}

export function chartBounds(values: readonly (readonly ChartValue[])[]): { min: number; max: number } {
  let min = Infinity
  let max = -Infinity
  for (const row of values) {
    for (const v of row) {
      if (v === null || v === undefined) continue
      if (v < min) min = v
      if (v > max) max = v
    }
  }
  if (!Number.isFinite(min)) min = 0
  if (!Number.isFinite(max)) max = 0
  if (min === max) {
    if (min === 0) max = 1
    else {
      min = Math.min(0, min)
    }
  }
  return { min, max }
}
