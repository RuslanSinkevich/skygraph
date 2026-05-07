import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react'
import type {
  CSSProperties,
  ForwardedRef,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  WheelEvent as ReactWheelEvent,
} from 'react'
import { routeOrthogonal, pointsToPath } from '@skygraph/core'
import type {
  AABB,
  Anchor,
  AnchorId,
  EdgeEndpoint,
  GraphEdge,
  GraphEngine,
  GraphNode,
  GraphState,
  NodeId,
  Point,
} from '@skygraph/core'
import { printElement } from '../../../utils/print'
import type { PrintOptions, PrintableProp } from '../../../utils/print'

/** Imperative API of {@link Diagram}. */
export interface DiagramRef {
  /**
   * Открыть popup и вызвать window.print() на DOM-области диаграммы. Объекты
   * `customStyles` / `pageSize` / `orientation` мерджатся с тем, что пришло
   * через prop `printable`.
   */
  print: (opts?: PrintOptions) => void
}

/**
 * Per-node renderer. Receives the engine node and returns the React content
 * placed inside the absolutely-positioned wrapper. If omitted, a default
 * label (`node.id`) is rendered.
 */
export type DiagramNodeRenderer = (node: GraphNode) => ReactNode

export interface DiagramProps {
  /** GraphEngine driving the diagram (e.g. from `useGraph()`). */
  graph: GraphEngine
  /**
   * Snapshot of the graph state (from `useGraph().state`). Required so that
   * the component re-renders on every commit.
   */
  state: GraphState
  /** Width of the canvas; defaults to a flexible 100%. */
  width?: number | string
  /** Height of the canvas; defaults to 400. */
  height?: number | string
  /** Optional content renderer per node. */
  renderNode?: DiagramNodeRenderer
  /** Root wrapper className. */
  className?: string
  /** Root wrapper inline style. */
  style?: CSSProperties
  /** Drop the default `sg-diagram-*` class names. */
  unstyled?: boolean
  /**
   * Enable click-and-drag to move nodes. The handler receives the new
   * position in the parent's coordinate space and is expected to call
   * `graph.moveNode(...)` (the default handler does exactly this).
   *
   * Set `true` for the default behaviour, `false` (default) to disable,
   * or pass a custom function for richer drag logic (e.g. snap-to-grid,
   * permission checks).
   *
   * @default false
   */
  draggable?: boolean | ((id: NodeId, x: number, y: number) => void)
  /**
   * Enable mouse-wheel zoom (`Ctrl + wheel`) and pinch-zoom-style scaling.
   * The internal canvas is wrapped in a `<g>` / `<div>` whose CSS
   * transform reflects the current zoom factor.
   *
   * @default false
   */
  zoomable?: boolean
  /**
   * Enable panning. Plain mouse-wheel scrolls the canvas; the middle
   * mouse button drags it. `Ctrl + wheel` is reserved for zoom (when
   * `zoomable` is also on), so the two flags compose cleanly.
   *
   * @default false
   */
  panable?: boolean
  /**
   * Snap node coordinates to a grid of this size (world units). When set,
   * `moveNode` is called with rounded `(x, y)` and the wrapper picks up
   * the `sg-diagram-grid` class so a CSS background pattern renders.
   *
   * Pass `0` or `undefined` to disable.
   */
  snapToGrid?: number
  /**
   * When `true`, orthogonal edges receive the AABBs of every other node
   * as obstacles so the A*-based router can avoid them. Off by default to
   * keep the cheap L-route path the norm; opt in only when the diagram
   * tends to have crossings worth avoiding.
   *
   * Independent of `routing` per edge — edges with `routing !== 'orthogonal'`
   * ignore this flag.
   */
  routeAroundNodes?: boolean
  /**
   * Tuning knobs forwarded to the orthogonal router when
   * `routeAroundNodes` is on. See {@link routeOrthogonal}'s options.
   */
  routingOptions?: {
    gridSize?: number
    inflate?: number
    maxNodes?: number
  }
  /**
   * Включает поддержку печати через `ref.print()`. Если `true` — без
   * визуальных изменений; объект `{ fileName }` задаёт имя popup-окна
   * (используется как title и дефолт для "Save as PDF").
   *
   * Сама печать триггерится императивно через `ref.print()`.
   * @default false
   */
  printable?: PrintableProp
}

interface ViewState {
  zoom: number
  panX: number
  panY: number
}

interface ResolvedAnchor {
  point: Point
}

function resolveAnchor(
  graph: GraphEngine,
  nodeId: NodeId,
  ref: AnchorId | { s: number },
): ResolvedAnchor | null {
  const anchors = graph.anchorsOf(nodeId)
  let anchor: Anchor | undefined
  if (typeof ref === 'string') {
    anchor = anchors.find((a) => a.id === ref)
  } else {
    let best: Anchor | undefined
    let bestDiff = Infinity
    for (const a of anchors) {
      const diff = Math.abs(a.s - ref.s)
      if (diff < bestDiff) {
        bestDiff = diff
        best = a
      }
    }
    anchor = best
  }
  if (!anchor) return null
  return { point: anchor.point }
}

function endpointWorldPoint(
  graph: GraphEngine,
  ep: EdgeEndpoint,
): Point | null {
  const node = graph.getNode(ep.node)
  if (!node) return null
  const local = resolveAnchor(graph, ep.node, ep.anchor)
  if (!local) return null
  const bounds = graph.boundsOf(ep.node)
  return [bounds.x + (local.point[0] - localOriginOffset(node).x), bounds.y + (local.point[1] - localOriginOffset(node).y)]
}

/**
 * Offset between the outline-local origin and the bounding-box top-left.
 * For `rect`/`polygon`/`path` the origin is at `(0, 0)` which IS the
 * top-left, so the offset is zero. For `ellipse` the origin is the centre,
 * so the offset is `(-rx, -ry)` — i.e. the local anchor (rx*cos, ry*sin)
 * has to be shifted by `(-(-rx), -(-ry)) = (rx, ry)` to land relative to
 * the bbox top-left.
 */
function localOriginOffset(node: GraphNode): { x: number; y: number } {
  const o = node.outline
  if (o.kind === 'ellipse') return { x: -o.rx, y: -o.ry }
  return { x: 0, y: 0 }
}

function defaultRenderNode(node: GraphNode): ReactNode {
  return <span className="sg-diagram-node-label">{node.id}</span>
}

function buildEdgePath(
  edge: GraphEdge,
  start: Point,
  end: Point,
  obstacles: readonly AABB[] | undefined,
  routerOpts: DiagramProps['routingOptions'],
): string {
  switch (edge.routing) {
    case 'orthogonal': {
      const points = routeOrthogonal(start, end, {
        obstacles,
        gridSize: routerOpts?.gridSize,
        inflate: routerOpts?.inflate,
        maxNodes: routerOpts?.maxNodes,
      })
      return pointsToPath(points)
    }
    case 'manual': {
      const wp = edge.waypoints ?? []
      return pointsToPath([start, ...wp, end])
    }
    case 'straight':
    default:
      return `M ${start[0]} ${start[1]} L ${end[0]} ${end[1]}`
  }
}

function unionBounds(boxes: AABB[]): AABB {
  if (boxes.length === 0) return { x: 0, y: 0, w: 0, h: 0 }
  let x0 = Infinity
  let y0 = Infinity
  let x1 = -Infinity
  let y1 = -Infinity
  for (const b of boxes) {
    if (b.x < x0) x0 = b.x
    if (b.y < y0) y0 = b.y
    if (b.x + b.w > x1) x1 = b.x + b.w
    if (b.y + b.h > y1) y1 = b.y + b.h
  }
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }
}

/**
 * Reactive diagram view: DOM nodes for shapes + an SVG overlay for edges.
 *
 * Capabilities (Stream 5 v1):
 *   - Straight / orthogonal / manual edge routing
 *   - Drag-and-drop (with optional snap-to-grid)
 *   - Mouse-wheel zoom (`Ctrl+wheel`) and pan (plain wheel / middle-button drag)
 *   - Obstacle-aware orthogonal routing (opt-in via `routeAroundNodes`)
 *
 * Selection / multi-select / lasso are intentional follow-ups.
 */
function DiagramInner(
  {
    graph,
    state,
    width = '100%',
    height = 400,
    renderNode = defaultRenderNode,
    className,
    style,
    unstyled = false,
    draggable = false,
    zoomable = false,
    panable = false,
    snapToGrid,
    routeAroundNodes = false,
    routingOptions,
    printable,
  }: DiagramProps,
  forwardedRef: ForwardedRef<DiagramRef>,
) {
  const nodes = useMemo(() => Array.from(state.nodes.values()), [state])
  const edges = useMemo(() => Array.from(state.edges.values()), [state])

  const allBounds = useMemo(() => nodes.map((n) => graph.boundsOf(n.id)), [nodes, graph])
  const canvasBounds = useMemo(() => unionBounds(allBounds), [allBounds])

  // Pre-index node bounds by id so each edge's obstacle list (which excludes
  // its own endpoint nodes) can be assembled in O(N) rather than O(N²).
  const boundsById = useMemo(() => {
    const m = new Map<NodeId, AABB>()
    nodes.forEach((n, i) => m.set(n.id, allBounds[i]!))
    return m
  }, [nodes, allBounds])

  const [view, setView] = useState<ViewState>({ zoom: 1, panX: 0, panY: 0 })

  const wrapperRef = useRef<HTMLDivElement>(null)

  const printOptionsFromProp = useMemo(() => {
    if (typeof printable === 'object' && printable !== null) {
      return { fileName: printable.fileName }
    }
    return {}
  }, [printable])

  const doPrint = useCallback(
    (opts?: PrintOptions) => {
      printElement(wrapperRef.current, { ...printOptionsFromProp, ...(opts ?? {}) })
    },
    [printOptionsFromProp],
  )

  useImperativeHandle(forwardedRef, () => ({ print: doPrint }), [doPrint])

  const wrapperClass = unstyled
    ? className
    : [
        'sg-diagram',
        snapToGrid ? 'sg-diagram-grid' : '',
        className,
      ].filter(Boolean).join(' ')

  const wrapperStyle: CSSProperties = {
    position: 'relative',
    width,
    height,
    overflow: 'hidden',
    // CSS variables consumed by `.sg-diagram-grid` so the visual grid
    // matches the snap step and follows the current pan / zoom.
    ...(snapToGrid
      ? ({
          '--sg-grid-size': `${snapToGrid * view.zoom}px`,
          backgroundPosition: `${view.panX}px ${view.panY}px`,
        } as CSSProperties)
      : null),
    ...style,
  }

  const canvasStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: `translate(${view.panX}px, ${view.panY}px) scale(${view.zoom})`,
    transformOrigin: '0 0',
    width: '100%',
    height: '100%',
  }

  // ─── Drag handler ────────────────────────────────────────────────────────
  const dragRef = useRef<{ id: NodeId; startX: number; startY: number; nodeX: number; nodeY: number } | null>(null)

  function applyMove(id: NodeId, x: number, y: number) {
    let nx = x
    let ny = y
    if (snapToGrid && snapToGrid > 0) {
      nx = Math.round(nx / snapToGrid) * snapToGrid
      ny = Math.round(ny / snapToGrid) * snapToGrid
    }
    if (typeof draggable === 'function') draggable(id, nx, ny)
    else graph.moveNode(id, nx, ny)
  }

  function handleNodeMouseDown(id: NodeId) {
    return (e: ReactMouseEvent<HTMLDivElement>) => {
      if (!draggable) return
      // Left button only — middle button is reserved for pan.
      if (e.button !== 0) return
      const node = graph.getNode(id)
      if (!node) return
      e.preventDefault()
      e.stopPropagation()
      dragRef.current = {
        id,
        startX: e.clientX,
        startY: e.clientY,
        nodeX: node.transform.x,
        nodeY: node.transform.y,
      }
      const startZoom = view.zoom

      function onMove(ev: MouseEvent) {
        const d = dragRef.current
        if (!d) return
        const dx = (ev.clientX - d.startX) / startZoom
        const dy = (ev.clientY - d.startY) / startZoom
        applyMove(d.id, d.nodeX + dx, d.nodeY + dy)
      }
      function onUp() {
        dragRef.current = null
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
      }
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
    }
  }

  // ─── Wheel: zoom (Ctrl) / pan (plain) ────────────────────────────────────
  function handleWheel(e: ReactWheelEvent<HTMLDivElement>) {
    if (!zoomable && !panable) return
    if (zoomable && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1
      setView((v) => ({
        ...v,
        zoom: Math.max(0.1, Math.min(10, v.zoom * factor)),
      }))
      return
    }
    if (panable) {
      e.preventDefault()
      setView((v) => ({
        ...v,
        panX: v.panX - e.deltaX,
        panY: v.panY - e.deltaY,
      }))
    }
  }

  // ─── Middle-button drag: pan ─────────────────────────────────────────────
  function handleWrapperMouseDown(e: ReactMouseEvent<HTMLDivElement>) {
    if (!panable) return
    if (e.button !== 1) return
    e.preventDefault()
    const start = { x: e.clientX, y: e.clientY, panX: view.panX, panY: view.panY }
    function onMove(ev: MouseEvent) {
      setView((v) => ({
        ...v,
        panX: start.panX + (ev.clientX - start.x),
        panY: start.panY + (ev.clientY - start.y),
      }))
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  return (
    <div
      ref={wrapperRef}
      className={wrapperClass}
      style={wrapperStyle}
      onWheel={zoomable || panable ? handleWheel : undefined}
      onMouseDown={panable ? handleWrapperMouseDown : undefined}
    >
      <div
        className={unstyled ? undefined : 'sg-diagram-canvas'}
        style={canvasStyle}
        data-zoom={view.zoom}
        data-pan-x={view.panX}
        data-pan-y={view.panY}
      >
        <svg
          className={unstyled ? undefined : 'sg-diagram-edges'}
          width={Math.max(canvasBounds.w + canvasBounds.x, 0) || '100%'}
          height={Math.max(canvasBounds.h + canvasBounds.y, 0) || '100%'}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          {edges.map((edge) =>
            renderEdge(graph, edge, routeAroundNodes ? boundsById : null, routingOptions),
          )}
        </svg>
        {nodes.map((node) => {
          const bounds = graph.boundsOf(node.id)
          const nodeClass = unstyled
            ? undefined
            : [
                'sg-diagram-node',
                `sg-diagram-node-${node.outline.kind}`,
                draggable ? 'sg-diagram-node-draggable' : '',
              ].filter(Boolean).join(' ')
          return (
            <div
              key={node.id}
              data-node-id={node.id}
              className={nodeClass}
              style={{
                position: 'absolute',
                left: bounds.x,
                top: bounds.y,
                width: bounds.w,
                height: bounds.h,
                cursor: draggable ? 'grab' : undefined,
                userSelect: draggable ? 'none' : undefined,
              }}
              onMouseDown={draggable ? handleNodeMouseDown(node.id) : undefined}
            >
              {renderNode(node)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function renderEdge(
  graph: GraphEngine,
  edge: GraphEdge,
  boundsById: ReadonlyMap<NodeId, AABB> | null,
  routerOpts: DiagramProps['routingOptions'],
): ReactNode {
  const a = endpointWorldPoint(graph, edge.from)
  const b = endpointWorldPoint(graph, edge.to)
  if (!a || !b) return null

  // Build the obstacle list (every node except this edge's two endpoints).
  // We only do this for `orthogonal` routing — straight/manual ignore it.
  let obstacles: AABB[] | undefined
  if (boundsById && edge.routing === 'orthogonal') {
    const skip = new Set<NodeId>([edge.from.node, edge.to.node])
    obstacles = []
    for (const [id, bb] of boundsById) {
      if (!skip.has(id)) obstacles.push(bb)
    }
  }

  return (
    <path
      key={edge.id}
      d={buildEdgePath(edge, a, b, obstacles, routerOpts)}
      className={`sg-diagram-edge sg-diagram-edge-${edge.routing}`}
      fill="none"
      data-edge-id={edge.id}
      data-obstacle-count={obstacles ? obstacles.length : 0}
    />
  )
}

/**
 * Reactive diagram view (forwardRef-обёртка над `DiagramInner`). Обновлять
 * данные нужно через `graph` / `state`; для печати — `ref.print()`.
 */
export const Diagram = forwardRef<DiagramRef, DiagramProps>(DiagramInner)
Diagram.displayName = 'Diagram'
