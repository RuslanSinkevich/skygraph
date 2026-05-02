import type { AABB, Point } from './types'

/**
 * Orthogonal-routing module.
 *
 * Two strategies are exposed through one entry point — `routeOrthogonal`:
 *
 *   1. **L-route fallback** (no obstacles): a single-bend right-angle path,
 *      identical to the v0 implementation. Cheap, deterministic, and good
 *      enough for the common "two free-floating nodes" case.
 *
 *   2. **A* on a uniform grid** (with obstacles): when the caller passes
 *      `obstacles`, we discretise world space into a grid of step
 *      `gridSize` (default 10) and run a 4-connected A* with a turn
 *      penalty so the search prefers long straight runs. The result is a
 *      polyline whose interior bends are all axis-aligned right angles
 *      and which never enters the interior of any obstacle.
 *
 * The two strategies share a common output shape: a `readonly Point[]`
 * with the original `start` as the first element and the original `end`
 * as the last. Consumers (e.g. `<Diagram>`) feed it straight to
 * `pointsToPath`.
 *
 * The router is intentionally pure — no engine state, no React, no DOM —
 * so it can be tested in isolation and reused outside of `<Diagram>`
 * (e.g. server-side path pre-computation).
 */

/** Direction the previous step entered the current cell from. */
type Dir = 'h' | 'v' | null

/** Options for {@link routeOrthogonal}. */
export interface RouteOrthogonalOptions {
  /**
   * Bend preference for the no-obstacle case.
   *  - `auto` (default) picks H-then-V or V-then-H based on which leg is longer.
   *  - `hv` forces horizontal first.
   *  - `vh` forces vertical first.
   *
   * Ignored when `obstacles` is non-empty — A* picks bends from costs.
   */
  preferred?: 'auto' | 'hv' | 'vh'
  /**
   * Rectangular obstacles to avoid (in world coordinates). When omitted /
   * empty, the router takes the cheap L-route path.
   */
  obstacles?: readonly AABB[]
  /**
   * Discretisation step for A*. Smaller values give smoother paths at the
   * cost of more search nodes. Default: 10.
   */
  gridSize?: number
  /**
   * Inflate every obstacle by this margin (world units) before clipping.
   * Useful to keep edges from hugging node borders. Default: 0.
   */
  inflate?: number
  /**
   * Hard cap on A* expansions. Acts as a safety net so a pathological
   * search never hangs the renderer. Default: 5000.
   */
  maxNodes?: number
}

/**
 * Compute an orthogonal (right-angled) path between two points.
 *
 *   - With no obstacles: simple L-route, one bend at most. Picks
 *     horizontal-then-vertical (HV) or vertical-then-horizontal (VH) based
 *     on the longer leg, or honours `preferred`.
 *   - With obstacles: 4-connected A* on a grid of step `gridSize`. Uses a
 *     turn penalty so straight runs are preferred. Falls back to the
 *     L-route if A* cannot find a path within `maxNodes` expansions or
 *     either endpoint is unreachable.
 *
 * The third argument also accepts the legacy bare-string form
 * (`'auto' | 'hv' | 'vh'`) for backwards compatibility with the v0 API.
 */
export function routeOrthogonal(
  start: Point,
  end: Point,
  options?: RouteOrthogonalOptions | 'auto' | 'hv' | 'vh',
): readonly Point[] {
  const opts: RouteOrthogonalOptions =
    typeof options === 'string' ? { preferred: options } : options ?? {}

  const obstacles = opts.obstacles ?? []
  if (obstacles.length === 0) {
    return lRoute(start, end, opts.preferred ?? 'auto')
  }

  const gridSize = opts.gridSize ?? 10
  const inflate = opts.inflate ?? 0
  const maxNodes = opts.maxNodes ?? 5000

  const path = aStarRoute(start, end, obstacles, gridSize, inflate, maxNodes)
  if (path) return path
  // No path found within budget — degrade gracefully so the edge still renders.
  return lRoute(start, end, opts.preferred ?? 'auto')
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

// ─── L-route (legacy, no-obstacle path) ────────────────────────────────────

function lRoute(
  start: Point,
  end: Point,
  preferred: 'auto' | 'hv' | 'vh',
): readonly Point[] {
  const [sx, sy] = start
  const [ex, ey] = end

  if (sx === ex || sy === ey) return [start, end]

  if (preferred === 'hv') return [start, [ex, sy], end]
  if (preferred === 'vh') return [start, [sx, ey], end]

  const dx = Math.abs(ex - sx)
  const dy = Math.abs(ey - sy)
  if (dx >= dy) return [start, [ex, sy], end]
  return [start, [sx, ey], end]
}

// ─── A* on a grid (obstacle-aware path) ────────────────────────────────────

interface InflatedRect {
  x0: number
  y0: number
  x1: number
  y1: number
}

function inflateObstacles(obstacles: readonly AABB[], pad: number): InflatedRect[] {
  return obstacles.map((o) => ({
    x0: o.x - pad,
    y0: o.y - pad,
    x1: o.x + o.w + pad,
    y1: o.y + o.h + pad,
  }))
}

/**
 * Strict-interior point-in-obstacle test. Border points are considered
 * free so paths can "hug" an obstacle without snagging on it.
 */
function pointBlocked(x: number, y: number, rects: readonly InflatedRect[]): boolean {
  for (const r of rects) {
    if (x > r.x0 && x < r.x1 && y > r.y0 && y < r.y1) return true
  }
  return false
}

function snap(value: number, step: number): number {
  return Math.round(value / step) * step
}

function key(x: number, y: number): string {
  return `${x},${y}`
}

function manhattan(ax: number, ay: number, bx: number, by: number): number {
  return Math.abs(ax - bx) + Math.abs(ay - by)
}

/**
 * Reconstruct path from `cameFrom` map and compress collinear points so
 * the output polyline only has corners.
 */
function reconstruct(cameFrom: Map<string, string>, endKey: string): Point[] {
  const reversed: Point[] = []
  let cursor: string | undefined = endKey
  while (cursor !== undefined) {
    const [xs, ys] = cursor.split(',')
    reversed.push([Number(xs), Number(ys)])
    cursor = cameFrom.get(cursor)
  }
  reversed.reverse()
  // Collapse runs of collinear points.
  const out: Point[] = []
  for (let i = 0; i < reversed.length; i++) {
    const cur = reversed[i]!
    if (out.length < 2) {
      out.push(cur)
      continue
    }
    const a = out[out.length - 2]!
    const b = out[out.length - 1]!
    const dx1 = b[0] - a[0]
    const dy1 = b[1] - a[1]
    const dx2 = cur[0] - b[0]
    const dy2 = cur[1] - b[1]
    // Same direction → drop the middle point `b`.
    if (Math.sign(dx1) === Math.sign(dx2) && Math.sign(dy1) === Math.sign(dy2)) {
      out[out.length - 1] = cur
    } else {
      out.push(cur)
    }
  }
  return out
}

function aStarRoute(
  start: Point,
  end: Point,
  obstacles: readonly AABB[],
  gridSize: number,
  inflate: number,
  maxNodes: number,
): readonly Point[] | null {
  const rects = inflateObstacles(obstacles, inflate)

  // Snap endpoints to the grid. If the snapped point sits inside an
  // obstacle (e.g. the anchor is on a node border that we inflated past)
  // we cannot route — bail out and let the caller fall back.
  const sx = snap(start[0], gridSize)
  const sy = snap(start[1], gridSize)
  const ex = snap(end[0], gridSize)
  const ey = snap(end[1], gridSize)

  if (pointBlocked(sx, sy, rects) || pointBlocked(ex, ey, rects)) return null

  const startKey = key(sx, sy)
  const endKey = key(ex, ey)

  const gScore = new Map<string, number>([[startKey, 0]])
  const cameFrom = new Map<string, string>()
  const cameDir = new Map<string, Dir>([[startKey, null]])

  // Open set as a flat array; we extract min by linear scan. For graphs of
  // up to a few thousand nodes (our `maxNodes` cap) the constant factor of
  // a binary heap is not worth the complexity.
  interface OpenEntry {
    k: string
    x: number
    y: number
    f: number
  }
  const open: OpenEntry[] = [{ k: startKey, x: sx, y: sy, f: manhattan(sx, sy, ex, ey) }]
  const inOpen = new Set<string>([startKey])

  // Turn penalty — biases the search towards long straight runs. Tuned so
  // a single right-angle turn costs roughly one extra grid step.
  const TURN_PENALTY = gridSize

  let expansions = 0

  while (open.length > 0) {
    if (expansions++ > maxNodes) return null

    let bestIdx = 0
    for (let i = 1; i < open.length; i++) {
      if (open[i]!.f < open[bestIdx]!.f) bestIdx = i
    }
    const current = open.splice(bestIdx, 1)[0]!
    inOpen.delete(current.k)

    if (current.k === endKey) {
      const path = reconstruct(cameFrom, endKey)
      // Replace snapped endpoints with the originals so the rendered edge
      // actually starts/ends at the anchor points, not at a grid cell.
      if (path.length > 0) {
        path[0] = start
        path[path.length - 1] = end
      }
      return path
    }

    const neighbours: ReadonlyArray<readonly [number, number, Dir]> = [
      [gridSize, 0, 'h'],
      [-gridSize, 0, 'h'],
      [0, gridSize, 'v'],
      [0, -gridSize, 'v'],
    ]
    for (const [dx, dy, dir] of neighbours) {
      const nx = current.x + dx
      const ny = current.y + dy
      if (pointBlocked(nx, ny, rects)) continue

      const incomingDir = cameDir.get(current.k) ?? null
      const turn = incomingDir !== null && incomingDir !== dir
      const tentativeG = (gScore.get(current.k) ?? Infinity) + gridSize + (turn ? TURN_PENALTY : 0)
      const nk = key(nx, ny)
      const prevG = gScore.get(nk) ?? Infinity
      if (tentativeG < prevG) {
        cameFrom.set(nk, current.k)
        cameDir.set(nk, dir)
        gScore.set(nk, tentativeG)
        const f = tentativeG + manhattan(nx, ny, ex, ey)
        if (inOpen.has(nk)) {
          // Update existing entry's f-score. Cheaper than removing + inserting.
          for (const entry of open) {
            if (entry.k === nk) {
              entry.f = f
              break
            }
          }
        } else {
          open.push({ k: nk, x: nx, y: ny, f })
          inOpen.add(nk)
        }
      }
    }
  }

  return null
}
