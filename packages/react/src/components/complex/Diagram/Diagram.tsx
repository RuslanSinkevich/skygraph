import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
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
import {
  EdgeHoverActions,
  NodeHoverActions,
  type EdgeAction,
  type NodeAction,
} from './HoverActions'
import {
  nodesInBox,
  rectFromCorners,
  screenRectToWorld,
  selectionsEqual,
  toggleSelection,
  type ScreenRect,
} from './selection'

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

/** Selection management mode for the diagram. */
export type DiagramSelectionMode = 'single' | 'multi' | 'lasso'

/**
 * Argument passed to {@link DiagramProps.onCanvasContextMenu} — combines
 * world-space and screen-space coordinates so consumers can position a
 * floating menu without re-projecting.
 */
export interface DiagramCanvasContextPoint {
  /** World-space x (matches `node.transform.x`). */
  x: number
  /** World-space y. */
  y: number
  /** Browser-screen x (`event.clientX`). */
  screenX: number
  /** Browser-screen y (`event.clientY`). */
  screenY: number
}

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

  /**
   * Right-click on a node — fired with the original mouse event and the
   * engine node. If defined, the component calls `event.preventDefault()`
   * and the browser's native context menu is suppressed. If omitted, the
   * native menu shows as usual.
   */
  onNodeContextMenu?: (event: ReactMouseEvent<HTMLDivElement>, node: GraphNode) => void
  /**
   * Right-click on an edge path. Same suppression contract as
   * {@link DiagramProps.onNodeContextMenu}.
   */
  onEdgeContextMenu?: (event: ReactMouseEvent<SVGPathElement>, edge: GraphEdge) => void
  /**
   * Right-click on the empty canvas (i.e. neither a node nor an edge).
   * The point combines world and screen coordinates so a floating menu
   * can be positioned without re-projection.
   */
  onCanvasContextMenu?: (
    event: ReactMouseEvent<HTMLDivElement>,
    point: DiagramCanvasContextPoint,
  ) => void

  /**
   * Mini-toolbar entries shown above a hovered node. The overlay is
   * rendered in screen-space, so its size stays constant under
   * pan / zoom. Show / hide use a 200 ms enter delay and 150 ms leave
   * grace so the cursor can hop from the node to the overlay.
   */
  nodeActions?: readonly NodeAction[]
  /** Same as {@link DiagramProps.nodeActions} but rendered next to a hovered edge. */
  edgeActions?: readonly EdgeAction[]

  /**
   * Controlled selection: array of selected node ids. Pair with
   * {@link DiagramProps.onSelectionChange}. If left undefined, the
   * component manages selection internally (uncontrolled).
   */
  selection?: readonly NodeId[]
  /** Initial selection for the uncontrolled mode. */
  defaultSelection?: readonly NodeId[]
  /** Fired whenever the selection changes (both controlled and uncontrolled). */
  onSelectionChange?: (selection: NodeId[]) => void
  /**
   * - `'single'` (default) — legacy behaviour; no multi-select, no lasso.
   * - `'multi'` — `Ctrl+click` toggles selection; dragging a selected
   *   node moves all selected together.
   * - `'lasso'` — same as `'multi'` plus a left-button drag on empty
   *   canvas opens a rubber-band rectangle selecting nodes whose AABBs
   *   intersect it.
   *
   * Defaults to `'single'` for backwards compatibility — existing drag
   * code keeps working unchanged.
   */
  selectionMode?: DiagramSelectionMode
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

const HOVER_SHOW_DELAY_MS = 200
const HOVER_HIDE_GRACE_MS = 150

/**
 * Reactive diagram view: DOM nodes for shapes + an SVG overlay for edges.
 *
 * Capabilities:
 *   - Straight / orthogonal / manual edge routing (with optional A*
 *     obstacle-aware routing via `routeAroundNodes`)
 *   - Drag-and-drop with optional snap-to-grid; multi-drag when the
 *     dragged node is part of the current selection
 *   - Mouse-wheel zoom (`Ctrl+wheel`) and pan (plain wheel /
 *     middle-button drag)
 *   - Selection management: single / multi (Ctrl+click) / lasso
 *     (rubber-band on empty canvas)
 *   - Hover mini-toolbars (`nodeActions` / `edgeActions`) and right-click
 *     callbacks (`onNodeContextMenu` / `onEdgeContextMenu` /
 *     `onCanvasContextMenu`) for custom context menus
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
    onNodeContextMenu,
    onEdgeContextMenu,
    onCanvasContextMenu,
    nodeActions,
    edgeActions,
    selection,
    defaultSelection,
    onSelectionChange,
    selectionMode = 'single',
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

  // ─── Selection (controlled / uncontrolled) ────────────────────────────────
  const isSelectionControlled = selection !== undefined
  const [internalSelection, setInternalSelection] = useState<readonly NodeId[]>(
    () => defaultSelection ?? [],
  )
  const currentSelection = isSelectionControlled
    ? (selection as readonly NodeId[])
    : internalSelection
  const selectionSet = useMemo(() => new Set(currentSelection), [currentSelection])

  const onSelectionChangeRef = useRef(onSelectionChange)
  useEffect(() => {
    onSelectionChangeRef.current = onSelectionChange
  }, [onSelectionChange])

  const commitSelection = useCallback(
    (next: readonly NodeId[]) => {
      if (selectionsEqual(currentSelection, next)) return
      const arr = Array.isArray(next) ? (next as NodeId[]) : Array.from(next)
      if (!isSelectionControlled) setInternalSelection(arr)
      onSelectionChangeRef.current?.(arr)
    },
    [currentSelection, isSelectionControlled],
  )

  // Drop dropped/removed ids from the internal selection so it never holds
  // stale references after `removeNode`.
  useEffect(() => {
    if (isSelectionControlled) return
    const filtered = internalSelection.filter((id) => state.nodes.has(id))
    if (filtered.length !== internalSelection.length) {
      setInternalSelection(filtered)
      onSelectionChangeRef.current?.(filtered as NodeId[])
    }
  }, [isSelectionControlled, internalSelection, state])

  // ─── Print plumbing ───────────────────────────────────────────────────────
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

  // ─── Drag state (single + multi) ──────────────────────────────────────────
  interface DragSession {
    primaryId: NodeId
    startX: number
    startY: number
    startZoom: number
    /** Per-node initial world position; iterated on every move. */
    members: Array<{ id: NodeId; x0: number; y0: number }>
    moved: boolean
  }
  const dragRef = useRef<DragSession | null>(null)
  const [draggingId, setDraggingId] = useState<NodeId | null>(null)

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

  function startDrag(
    primaryId: NodeId,
    members: Array<{ id: NodeId; x0: number; y0: number }>,
    e: ReactMouseEvent<HTMLDivElement>,
  ) {
    dragRef.current = {
      primaryId,
      startX: e.clientX,
      startY: e.clientY,
      startZoom: view.zoom,
      members,
      moved: false,
    }
    setDraggingId(primaryId)

    const onMove = (ev: MouseEvent) => {
      const d = dragRef.current
      if (!d) return
      const dx = (ev.clientX - d.startX) / d.startZoom
      const dy = (ev.clientY - d.startY) / d.startZoom
      if (!d.moved && (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5)) d.moved = true
      // Group commits into a single transaction so undo restores the whole
      // multi-drag rather than one node at a time.
      if (d.members.length > 1) {
        graph.transaction(() => {
          for (const m of d.members) applyMove(m.id, m.x0 + dx, m.y0 + dy)
        })
      } else {
        const m = d.members[0]!
        applyMove(m.id, m.x0 + dx, m.y0 + dy)
      }
    }
    const onUp = () => {
      dragRef.current = null
      setDraggingId(null)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  function handleNodeMouseDown(id: NodeId) {
    return (e: ReactMouseEvent<HTMLDivElement>) => {
      // Left button only — middle is reserved for pan, right is context menu.
      if (e.button !== 0) return

      const node = graph.getNode(id)
      if (!node) return

      const multiCapable = selectionMode !== 'single'
      const isCtrl = e.ctrlKey || e.metaKey

      if (multiCapable && isCtrl) {
        // Toggle membership — never start a drag on Ctrl+click.
        e.preventDefault()
        e.stopPropagation()
        commitSelection(toggleSelection(currentSelection, id))
        return
      }

      // If the node is part of the active selection, drag the whole group;
      // otherwise drag just this one (and, in multi modes, replace the
      // selection with `[id]` so the visual cue tracks the focus).
      if (multiCapable) {
        if (!selectionSet.has(id)) commitSelection([id])
      }

      if (!draggable) return
      e.preventDefault()
      e.stopPropagation()

      const groupIds =
        multiCapable && selectionSet.has(id)
          ? Array.from(new Set([id, ...currentSelection]))
          : [id]
      const members = groupIds
        .map((mid) => {
          const n = graph.getNode(mid)
          return n ? { id: mid, x0: n.transform.x, y0: n.transform.y } : null
        })
        .filter((m): m is { id: NodeId; x0: number; y0: number } => m !== null)

      startDrag(id, members, e)
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

  // ─── Lasso state ──────────────────────────────────────────────────────────
  const [lasso, setLasso] = useState<ScreenRect | null>(null)
  const lassoRef = useRef<{
    startX: number
    startY: number
    initial: readonly NodeId[]
    additive: boolean
  } | null>(null)
  const boundsByIdRef = useRef(boundsById)
  useEffect(() => {
    boundsByIdRef.current = boundsById
  }, [boundsById])
  const viewRef = useRef(view)
  useEffect(() => {
    viewRef.current = view
  }, [view])

  function startLasso(e: ReactMouseEvent<HTMLDivElement>) {
    const rect = wrapperRef.current?.getBoundingClientRect()
    if (!rect) return
    const sx = e.clientX - rect.left
    const sy = e.clientY - rect.top
    e.preventDefault()
    lassoRef.current = {
      startX: sx,
      startY: sy,
      initial: currentSelection,
      additive: e.shiftKey || e.ctrlKey || e.metaKey,
    }
    setLasso({ x: sx, y: sy, w: 0, h: 0 })

    const onMove = (ev: MouseEvent) => {
      const r = wrapperRef.current?.getBoundingClientRect()
      const l = lassoRef.current
      if (!r || !l) return
      const cx = ev.clientX - r.left
      const cy = ev.clientY - r.top
      const screen = rectFromCorners(l.startX, l.startY, cx, cy)
      setLasso(screen)
      const world = screenRectToWorld(screen, viewRef.current)
      const hits = nodesInBox(boundsByIdRef.current, world)
      const next = l.additive
        ? Array.from(new Set([...l.initial, ...hits]))
        : hits
      commitSelection(next)
    }
    const onUp = () => {
      lassoRef.current = null
      setLasso(null)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  // ─── Wrapper mousedown: middle-pan / lasso / clear-selection ──────────────
  function handleWrapperMouseDown(e: ReactMouseEvent<HTMLDivElement>) {
    if (panable && e.button === 1) {
      e.preventDefault()
      const start = { x: e.clientX, y: e.clientY, panX: view.panX, panY: view.panY }
      const onMove = (ev: MouseEvent) => {
        setView((v) => ({
          ...v,
          panX: start.panX + (ev.clientX - start.x),
          panY: start.panY + (ev.clientY - start.y),
        }))
      }
      const onUp = () => {
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
      }
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
      return
    }

    if (e.button !== 0) return

    // Empty-canvas left click — only meaningful when selection management
    // is active. The mousedown originates on the wrapper / canvas, never on
    // a node (those stop propagation in `handleNodeMouseDown`).
    if (selectionMode === 'lasso') {
      startLasso(e)
      return
    }
    if (selectionMode === 'multi' && currentSelection.length > 0) {
      // Shift / Ctrl preserve the current selection; plain click clears.
      if (!(e.shiftKey || e.ctrlKey || e.metaKey)) commitSelection([])
    }
  }

  // ─── Context menu plumbing ────────────────────────────────────────────────
  function handleWrapperContextMenu(e: ReactMouseEvent<HTMLDivElement>) {
    if (!onCanvasContextMenu) return
    const rect = wrapperRef.current?.getBoundingClientRect()
    if (!rect) return
    const sx = e.clientX - rect.left
    const sy = e.clientY - rect.top
    const wx = (sx - view.panX) / (view.zoom || 1)
    const wy = (sy - view.panY) / (view.zoom || 1)
    e.preventDefault()
    onCanvasContextMenu(e, { x: wx, y: wy, screenX: e.clientX, screenY: e.clientY })
  }

  function handleNodeContextMenu(node: GraphNode) {
    return (e: ReactMouseEvent<HTMLDivElement>) => {
      // Always stop propagation so the wrapper-level handler doesn't also
      // fire and treat the node as if it were the canvas. We only suppress
      // the native menu when a per-node callback is registered.
      e.stopPropagation()
      if (!onNodeContextMenu) return
      e.preventDefault()
      onNodeContextMenu(e, node)
    }
  }

  function handleEdgeContextMenu(edge: GraphEdge) {
    return (e: ReactMouseEvent<SVGPathElement>) => {
      e.stopPropagation()
      if (!onEdgeContextMenu) return
      e.preventDefault()
      onEdgeContextMenu(e, edge)
    }
  }

  // ─── Hover overlays (nodes / edges) ───────────────────────────────────────
  const [hoveredNode, setHoveredNode] = useState<NodeId | null>(null)
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null)
  const nodeHoverShowTimer = useRef<number | null>(null)
  const nodeHoverHideTimer = useRef<number | null>(null)
  const edgeHoverShowTimer = useRef<number | null>(null)
  const edgeHoverHideTimer = useRef<number | null>(null)

  const clearTimer = (ref: React.MutableRefObject<number | null>) => {
    if (ref.current != null) {
      window.clearTimeout(ref.current)
      ref.current = null
    }
  }

  useEffect(() => {
    return () => {
      clearTimer(nodeHoverShowTimer)
      clearTimer(nodeHoverHideTimer)
      clearTimer(edgeHoverShowTimer)
      clearTimer(edgeHoverHideTimer)
    }
  }, [])

  const showNodeHover = (id: NodeId) => {
    clearTimer(nodeHoverHideTimer)
    if (hoveredNode === id) return
    clearTimer(nodeHoverShowTimer)
    nodeHoverShowTimer.current = window.setTimeout(() => {
      setHoveredNode(id)
      nodeHoverShowTimer.current = null
    }, HOVER_SHOW_DELAY_MS)
  }

  const hideNodeHover = () => {
    clearTimer(nodeHoverShowTimer)
    clearTimer(nodeHoverHideTimer)
    nodeHoverHideTimer.current = window.setTimeout(() => {
      setHoveredNode(null)
      nodeHoverHideTimer.current = null
    }, HOVER_HIDE_GRACE_MS)
  }

  const showEdgeHover = (id: string) => {
    clearTimer(edgeHoverHideTimer)
    if (hoveredEdge === id) return
    clearTimer(edgeHoverShowTimer)
    edgeHoverShowTimer.current = window.setTimeout(() => {
      setHoveredEdge(id)
      edgeHoverShowTimer.current = null
    }, HOVER_SHOW_DELAY_MS)
  }

  const hideEdgeHover = () => {
    clearTimer(edgeHoverShowTimer)
    clearTimer(edgeHoverHideTimer)
    edgeHoverHideTimer.current = window.setTimeout(() => {
      setHoveredEdge(null)
      edgeHoverHideTimer.current = null
    }, HOVER_HIDE_GRACE_MS)
  }

  // ─── Render — nodes / edges / overlays ────────────────────────────────────
  const hasNodeActions = !!nodeActions && nodeActions.length > 0
  const hasEdgeActions = !!edgeActions && edgeActions.length > 0
  const edgesInteractive = !!onEdgeContextMenu || hasEdgeActions

  const hoveredNodeRecord =
    hoveredNode != null ? state.nodes.get(hoveredNode) ?? null : null
  const hoveredNodeBounds =
    hoveredNode != null ? boundsById.get(hoveredNode) ?? null : null

  const hoveredEdgeRecord =
    hoveredEdge != null ? state.edges.get(hoveredEdge) ?? null : null
  const hoveredEdgeMid = useMemo(() => {
    if (!hoveredEdgeRecord) return null
    const a = endpointWorldPoint(graph, hoveredEdgeRecord.from)
    const b = endpointWorldPoint(graph, hoveredEdgeRecord.to)
    if (!a || !b) return null
    return { x: (a[0] + b[0]) / 2, y: (a[1] + b[1]) / 2 }
  }, [graph, hoveredEdgeRecord])

  return (
    <div
      ref={wrapperRef}
      className={wrapperClass}
      style={wrapperStyle}
      onWheel={zoomable || panable ? handleWheel : undefined}
      onMouseDown={
        panable || selectionMode === 'lasso' || selectionMode === 'multi'
          ? handleWrapperMouseDown
          : undefined
      }
      onContextMenu={onCanvasContextMenu ? handleWrapperContextMenu : undefined}
      data-selection-mode={selectionMode}
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
            // Children with explicit `pointer-events: stroke` override and
            // become hit-targets even when the SVG itself is transparent.
            pointerEvents: edgesInteractive ? 'none' : 'none',
          }}
          aria-hidden="true"
        >
          {edges.map((edge) =>
            renderEdge(
              graph,
              edge,
              routeAroundNodes ? boundsById : null,
              routingOptions,
              edgesInteractive,
              edgesInteractive ? handleEdgeContextMenu(edge) : undefined,
              hasEdgeActions ? () => showEdgeHover(String(edge.id)) : undefined,
              hasEdgeActions ? () => hideEdgeHover() : undefined,
            ),
          )}
        </svg>
        {nodes.map((node) => {
          const bounds = graph.boundsOf(node.id)
          const isSelected = selectionSet.has(node.id)
          const isDragging = draggingId === node.id
          const nodeClass = unstyled
            ? undefined
            : [
                'sg-diagram-node',
                `sg-diagram-node-${node.outline.kind}`,
                draggable ? 'sg-diagram-node-draggable' : '',
                isSelected ? 'sg-diagram-node-selected' : '',
              ].filter(Boolean).join(' ')
          return (
            <div
              key={node.id}
              data-node-id={node.id}
              data-selected={isSelected ? 'true' : undefined}
              data-sg-dragging={isDragging ? 'true' : undefined}
              className={nodeClass}
              style={{
                position: 'absolute',
                left: bounds.x,
                top: bounds.y,
                width: bounds.w,
                height: bounds.h,
                cursor: draggable ? (isDragging ? 'grabbing' : 'grab') : undefined,
                userSelect: draggable ? 'none' : undefined,
              }}
              onMouseDown={
                draggable || selectionMode !== 'single'
                  ? handleNodeMouseDown(node.id)
                  : undefined
              }
              onContextMenu={onNodeContextMenu ? handleNodeContextMenu(node) : undefined}
              onMouseEnter={hasNodeActions ? () => showNodeHover(node.id) : undefined}
              onMouseLeave={hasNodeActions ? () => hideNodeHover() : undefined}
            >
              {renderNode(node)}
            </div>
          )
        })}
      </div>

      {/* Hover overlays — live in the wrapper (screen-space), so size /
          font don't track zoom. */}
      {hasNodeActions && hoveredNodeRecord && hoveredNodeBounds && (
        <NodeHoverActions
          node={hoveredNodeRecord}
          actions={nodeActions!}
          screenX={view.panX + hoveredNodeBounds.x * view.zoom}
          screenY={view.panY + hoveredNodeBounds.y * view.zoom}
          width={hoveredNodeBounds.w * view.zoom}
          unstyled={unstyled}
          onPointerEnter={() => showNodeHover(hoveredNodeRecord.id)}
          onPointerLeave={() => hideNodeHover()}
        />
      )}

      {hasEdgeActions && hoveredEdgeRecord && hoveredEdgeMid && (
        <EdgeHoverActions
          edge={hoveredEdgeRecord}
          actions={edgeActions!}
          screenX={view.panX + hoveredEdgeMid.x * view.zoom}
          screenY={view.panY + hoveredEdgeMid.y * view.zoom}
          unstyled={unstyled}
          onPointerEnter={() => showEdgeHover(String(hoveredEdgeRecord.id))}
          onPointerLeave={() => hideEdgeHover()}
        />
      )}

      {/* Lasso rubber band (only while dragging on empty canvas). */}
      {lasso && (
        <div
          className={unstyled ? undefined : 'sg-diagram-lasso'}
          style={{
            position: 'absolute',
            left: lasso.x,
            top: lasso.y,
            width: lasso.w,
            height: lasso.h,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}

function renderEdge(
  graph: GraphEngine,
  edge: GraphEdge,
  boundsById: ReadonlyMap<NodeId, AABB> | null,
  routerOpts: DiagramProps['routingOptions'],
  interactive: boolean,
  onContextMenu: ((e: ReactMouseEvent<SVGPathElement>) => void) | undefined,
  onMouseEnter: (() => void) | undefined,
  onMouseLeave: (() => void) | undefined,
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

  const d = buildEdgePath(edge, a, b, obstacles, routerOpts)

  if (!interactive) {
    return (
      <path
        key={edge.id}
        d={d}
        className={`sg-diagram-edge sg-diagram-edge-${edge.routing}`}
        fill="none"
        data-edge-id={edge.id}
        data-obstacle-count={obstacles ? obstacles.length : 0}
      />
    )
  }

  return (
    <g key={edge.id} data-edge-id={edge.id}>
      {/* Wide invisible underlay for easier hit-testing on the thin edge. */}
      <path
        d={d}
        className="sg-diagram-edge-hit"
        fill="none"
        stroke="transparent"
        strokeWidth={12}
        style={{ pointerEvents: 'stroke', cursor: onContextMenu ? 'context-menu' : undefined }}
        onContextMenu={onContextMenu}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      <path
        d={d}
        className={`sg-diagram-edge sg-diagram-edge-${edge.routing}`}
        fill="none"
        data-edge-id={edge.id}
        data-obstacle-count={obstacles ? obstacles.length : 0}
        style={{ pointerEvents: 'none' }}
      />
    </g>
  )
}

/**
 * Reactive diagram view (forwardRef-обёртка над `DiagramInner`). Обновлять
 * данные нужно через `graph` / `state`; для печати — `ref.print()`.
 */
export const Diagram = forwardRef<DiagramRef, DiagramProps>(DiagramInner)
Diagram.displayName = 'Diagram'

export type { NodeAction, EdgeAction } from './HoverActions'
