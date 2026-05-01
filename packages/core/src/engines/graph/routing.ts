import type { Point } from './types'

/**
 * Compute an orthogonal (right-angled) path between two points.
 *
 * v0 strategy: simple L-route — one bend at most. Picks horizontal-then-
 * vertical (HV) or vertical-then-horizontal (VH) based on which side of
 * the bbox the points sit. No obstacle avoidance — that's a follow-up
 * stream (will need a spatial index over node bounds).
 *
 * Returns the polyline as an array of points, including endpoints.
 *
 *   - Same x → straight vertical, 2 points.
 *   - Same y → straight horizontal, 2 points.
 *   - Otherwise → 3 points (start, corner, end).
 *
 * Public, intentionally pure. Consumed by `<Diagram>` when an edge has
 * `routing: 'orthogonal'`.
 */
export function routeOrthogonal(
  start: Point,
  end: Point,
  preferred: 'auto' | 'hv' | 'vh' = 'auto',
): readonly Point[] {
  const [sx, sy] = start
  const [ex, ey] = end

  if (sx === ex || sy === ey) {
    return [start, end]
  }

  if (preferred === 'hv') {
    return [start, [ex, sy], end] as const
  }
  if (preferred === 'vh') {
    return [start, [sx, ey], end] as const
  }

  // 'auto' — pick the longer leg first so the bend lands closer to the target.
  // Heuristic: if dx >= dy, run horizontal first (HV); else vertical first (VH).
  const dx = Math.abs(ex - sx)
  const dy = Math.abs(ey - sy)
  if (dx >= dy) {
    return [start, [ex, sy], end] as const
  }
  return [start, [sx, ey], end] as const
}

/**
 * Build an SVG path `d` attribute from a polyline.
 *
 *   pointsToPath([[0,0], [10,0], [10,5]]) → "M 0 0 L 10 0 L 10 5"
 */
export function pointsToPath(points: readonly Point[]): string {
  if (points.length === 0) return ''
  const [head, ...rest] = points
  return `M ${head[0]} ${head[1]} ${rest.map((p) => `L ${p[0]} ${p[1]}`).join(' ')}`
}
