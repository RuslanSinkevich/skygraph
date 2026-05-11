import type { AABB, Point } from './types'

/**
 * Orthogonal-routing module.
 *
 * Two strategies share one entry point — `routeOrthogonal`:
 *
 *   1. **L-route fallback** (no obstacles): a single-bend right-angle path.
 *      Cheap, deterministic, and good enough for the "two free-floating
 *      nodes" case.
 *
 *   2. **A* on a uniform grid** (with obstacles): when the caller passes
 *      `obstacles`, the router discretises world space into a grid of step
 *      `gridSize` (default 10) and runs a 4-connected A* with a turn
 *      penalty so the search prefers long straight runs. The result is a
 *      polyline whose interior bends are all axis-aligned right angles
 *      and which never enters the interior of any obstacle.
 *
 * Both strategies share a common output shape: a `readonly Point[]`
 * with the original `start` as the first element and the original `end`
 * as the last. Consumers (e.g. `<Diagram>`) feed it straight to
 * `pointsToPath`.
 *
 * **`sourceBounds` / `targetBounds` (since 3.3c).** When the caller knows
 * which axis-aligned rectangle each endpoint sits on, the router will
 * pick the side of the rectangle nearest to the *other* endpoint and
 * extend a short perpendicular stub away from the node. That keeps edges
 * from sliding diagonally out of corner-anchors (`s = 0.25` / `s = 0.75`)
 * and from immediately re-entering the node they just exited — both of
 * which were visible in the Workflow Editor showcase prior to 3.3c.
 *
 * The router is intentionally pure — no engine state, no React, no DOM —
 * so it can be tested in isolation and reused outside of `<Diagram>`
 * (e.g. server-side path pre-computation).
 */

/** Direction the previous step entered the current cell from. */
type Dir = 'h' | 'v' | null

/** Side of an AABB the route exits through. */
export type RectSide = 'top' | 'right' | 'bottom' | 'left'

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
  /**
   * AABB of the source node. When provided, the route exits the side of
   * the rectangle nearest to `end` with a short perpendicular stub. The
   * raw `start` point is kept as the first polyline vertex so the edge
   * still meets the anchor exactly.
   */
  sourceBounds?: AABB
  /**
   * AABB of the target node. When provided, the route enters the side of
   * the rectangle nearest to `start` with a short perpendicular stub. The
   * raw `end` point is kept as the last polyline vertex.
   */
  targetBounds?: AABB
  /**
   * Length (world units) of the perpendicular stub generated when
   * `sourceBounds` / `targetBounds` is set. Defaults to `max(8, gridSize)`.
   */
  stubLength?: number
  /**
   * Snap intermediate waypoints to a grid of this step. Defaults to the
   * effective `gridSize`. Set to `0` to disable snapping in the no-
   * obstacle path. A* already operates on the grid so this option only
   * affects the L-route fallback.
   */
  snap?: number
}

/**
 * Compute an orthogonal (right-angled) path between two points.
 *
 *   - With no `sourceBounds` / `targetBounds` and no obstacles: a single-
 *     bend L-route, identical to the v0 implementation.
 *   - With `sourceBounds` / `targetBounds`: the route exits/enters from
 *     the side of each rectangle nearest to the other endpoint.
 *   - With obstacles: 4-connected A* on a grid of step `gridSize`. Uses
 *     a turn penalty so straight runs are preferred. Falls back to the
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
    typeof options === 'string' ? { preferred: options } : (options ?? {})

  const gridSize = opts.gridSize ?? 10
  const stubLength = opts.stubLength ?? Math.max(8, gridSize)

  // ─── Step 1. Derive the "approach points" from optional bounds ────────────
  // Each approach point lives at the centre of the side of the source/
  // target rectangle that is closest to the other endpoint. We extend a
  // short perpendicular stub OUTWARDS from the rectangle so the rendered
  // edge has at least one straight segment exiting/entering the node.

  let sExit: Point | null = null
  let sStub: Point | null = null
  let sCorner: Point | null = null
  if (opts.sourceBounds) {
    const exitInfo = exitOnNearestSide(opts.sourceBounds, end)
    sExit = exitInfo.point
    sStub = extrudePoint(exitInfo.point, exitInfo.side, stubLength)
    // Bridge from the raw anchor (which may sit anywhere on the
    // outline — corner anchors like `s=0.25` are common) to `sExit`
    // through a right-angle bend, so every segment stays axis-aligned.
    sCorner = orthoBridge(start, sExit, exitInfo.side)
  }

  let tExit: Point | null = null
  let tStub: Point | null = null
  let tCorner: Point | null = null
  if (opts.targetBounds) {
    const enterInfo = exitOnNearestSide(opts.targetBounds, start)
    tExit = enterInfo.point
    tStub = extrudePoint(enterInfo.point, enterInfo.side, stubLength)
    tCorner = orthoBridge(end, tExit, enterInfo.side)
  }

  // ─── Step 2. Determine the "core" route between sStub and tStub ──────────
  // When neither bounds is set, the core route is just `start → end`.
  // Otherwise it sits between the perpendicular stubs we just built.
  const coreStart: Point = sStub ?? start
  const coreEnd: Point = tStub ?? end

  // Obstacles: when both source/target bounds are provided, they should
  // NOT be obstacles to themselves — caller is expected to filter the
  // pair out, but we double-strip just in case (matches by reference).
  const obstacles = opts.obstacles ?? []
  const filteredObstacles =
    obstacles.length > 0 && (opts.sourceBounds || opts.targetBounds)
      ? obstacles.filter((o) => o !== opts.sourceBounds && o !== opts.targetBounds)
      : obstacles

  let core: readonly Point[]
  if (filteredObstacles.length === 0) {
    const snap = opts.snap ?? gridSize
    core = lRoute(coreStart, coreEnd, opts.preferred ?? 'auto', snap)
  } else {
    const inflate = opts.inflate ?? 0
    const maxNodes = opts.maxNodes ?? 5000
    const aStar = aStarRoute(coreStart, coreEnd, filteredObstacles, gridSize, inflate, maxNodes)
    core = aStar ?? lRoute(coreStart, coreEnd, opts.preferred ?? 'auto', opts.snap ?? gridSize)
  }

  // ─── Step 3. Stitch the final polyline ────────────────────────────────────
  // [start, sExit, sStub, ...core..., tStub, tExit, end], collapsing
  // adjacent duplicates and runs of collinear points.

  const points: Point[] = []
  pushIfDistinct(points, start)
  if (sCorner && !pointsEqual(sCorner, start)) pushIfDistinct(points, sCorner)
  if (sExit && !pointsEqual(sExit, points[points.length - 1]!)) pushIfDistinct(points, sExit)
  if (sStub && !pointsEqual(sStub, points[points.length - 1]!)) pushIfDistinct(points, sStub)

  for (let i = 0; i < core.length; i++) {
    const p = core[i]!
    // skip the core endpoints if they exactly match the stubs we already pushed
    if (i === 0 && sStub && pointsEqual(p, sStub)) continue
    if (i === core.length - 1 && tStub && pointsEqual(p, tStub)) continue
    pushIfDistinct(points, p)
  }

  if (tStub && !pointsEqual(tStub, points[points.length - 1]!)) pushIfDistinct(points, tStub)
  if (tExit && !pointsEqual(tExit, points[points.length - 1]!)) pushIfDistinct(points, tExit)
  if (tCorner && !pointsEqual(tCorner, points[points.length - 1]!)) pushIfDistinct(points, tCorner)
  if (!pointsEqual(end, points[points.length - 1]!)) pushIfDistinct(points, end)

  return compressCollinear(points)
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

// ─── Side / stub helpers ────────────────────────────────────────────────────

/**
 * Pick the side of `box` nearest to `target` and return the midpoint of
 * that side. The chosen side is the one whose dominant axis matches the
 * dominant axis of the (target → box-centre) vector.
 */
function exitOnNearestSide(box: AABB, target: Point): { point: Point; side: RectSide } {
  const cx = box.x + box.w / 2
  const cy = box.y + box.h / 2
  const dx = target[0] - cx
  const dy = target[1] - cy
  if (Math.abs(dx) >= Math.abs(dy)) {
    if (dx >= 0) return { point: [box.x + box.w, cy], side: 'right' }
    return { point: [box.x, cy], side: 'left' }
  }
  if (dy >= 0) return { point: [cx, box.y + box.h], side: 'bottom' }
  return { point: [cx, box.y], side: 'top' }
}

/** Extrude `point` perpendicular to `side` by `distance` world units. */
function extrudePoint(point: Point, side: RectSide, distance: number): Point {
  switch (side) {
    case 'top':
      return [point[0], point[1] - distance]
    case 'right':
      return [point[0] + distance, point[1]]
    case 'bottom':
      return [point[0], point[1] + distance]
    case 'left':
      return [point[0] - distance, point[1]]
  }
}

/**
 * Right-angle bridge between an arbitrary anchor (`start`) and the
 * side-midpoint exit (`exit`). Returns the corner where the path bends
 * 90° so every segment stays axis-aligned.
 *
 * For a `right`/`left` exit the path runs vertical-first (drops to the
 * exit's row, then exits horizontally); for `top`/`bottom` it runs
 * horizontal-first. Collinear cases collapse harmlessly during
 * compression.
 */
function orthoBridge(start: Point, exit: Point, side: RectSide): Point {
  switch (side) {
    case 'right':
    case 'left':
      // bend at (exit.x, start.y) → vertical run first, then horizontal exit
      return [exit[0], start[1]]
    case 'top':
    case 'bottom':
      // bend at (start.x, exit.y) → horizontal run first, then vertical exit
      return [start[0], exit[1]]
  }
}

function pointsEqual(a: Point, b: Point): boolean {
  return a[0] === b[0] && a[1] === b[1]
}

function pushIfDistinct(arr: Point[], p: Point): void {
  if (arr.length === 0) {
    arr.push(p)
    return
  }
  const last = arr[arr.length - 1]!
  if (!pointsEqual(last, p)) arr.push(p)
}

/**
 * Drop collinear interior points so the output polyline only has corners.
 * Handles both pure-vertical / pure-horizontal segments produced by
 * orthogonal routing and the rare diagonal we emit when stitching
 * non-orthogonal endpoints to the exit point.
 */
function compressCollinear(points: readonly Point[]): Point[] {
  if (points.length <= 2) return points.slice()
  const out: Point[] = [points[0]!, points[1]!]
  for (let i = 2; i < points.length; i++) {
    const cur = points[i]!
    const a = out[out.length - 2]!
    const b = out[out.length - 1]!
    const dx1 = b[0] - a[0]
    const dy1 = b[1] - a[1]
    const dx2 = cur[0] - b[0]
    const dy2 = cur[1] - b[1]
    // Both vectors point in the same direction (cross = 0 AND signs match)
    // → `b` is interior to a straight run; drop it.
    const cross = dx1 * dy2 - dy1 * dx2
    if (cross === 0 && Math.sign(dx1) === Math.sign(dx2) && Math.sign(dy1) === Math.sign(dy2)) {
      out[out.length - 1] = cur
    } else {
      out.push(cur)
    }
  }
  return out
}

// ─── L-route (no obstacles) ────────────────────────────────────────────────

function lRoute(
  start: Point,
  end: Point,
  preferred: 'auto' | 'hv' | 'vh',
  _snapStep: number,
): readonly Point[] {
  const [sx, sy] = start
  const [ex, ey] = end

  if (sx === ex || sy === ey) return [start, end]

  // The corner sits at `(ex, sy)` (HV) or `(sx, ey)` (VH). Both
  // coordinates are anchored to one of the endpoints, so the resulting
  // two segments are guaranteed axis-aligned. We deliberately do NOT
  // snap to a grid here: `start` / `end` are exact anchor positions
  // (set by the caller), and rounding the corner to a grid step would
  // skew one of the two segments into a diagonal. `_snapStep` is kept
  // in the signature so the A*-fallback can pass it through; snapping
  // proper happens inside A* where the whole search runs on the grid.
  const dx = Math.abs(ex - sx)
  const dy = Math.abs(ey - sy)
  const useHV = preferred === 'hv' ? true : preferred === 'vh' ? false : dx >= dy

  if (useHV) return [start, [ex, sy], end]
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

  interface OpenEntry {
    k: string
    x: number
    y: number
    f: number
  }
  const open: OpenEntry[] = [{ k: startKey, x: sx, y: sy, f: manhattan(sx, sy, ex, ey) }]
  const inOpen = new Set<string>([startKey])

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
