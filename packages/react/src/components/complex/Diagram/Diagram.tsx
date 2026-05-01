import { useMemo } from 'react'
import type { CSSProperties, ReactNode } from 'react'
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
    // Pick the anchor whose normalized perimeter param `s` is closest.
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
  // local anchor coords are in outline local space; we approximate world
  // coordinates as bounds.{x,y} + local. This is correct for AABB-aligned
  // outlines (rect / polygon / path) and correct for ellipse if the outline
  // is centred at the local origin (which it is — see GraphEngine.localBounds).
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
): string {
  switch (edge.routing) {
    case 'orthogonal': {
      const points = routeOrthogonal(start, end)
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
 * This v0 component renders straight edges between resolved anchor points.
 * Orthogonal routing, drag-and-drop, zoom/pan, and selection are intentional
 * follow-ups (see STREAM-PLAN.md task 5 continuation).
 */
export function Diagram({
  graph,
  state,
  width = '100%',
  height = 400,
  renderNode = defaultRenderNode,
  className,
  style,
  unstyled = false,
}: DiagramProps) {
  const nodes = useMemo(() => Array.from(state.nodes.values()), [state])
  const edges = useMemo(() => Array.from(state.edges.values()), [state])

  const allBounds = useMemo(() => nodes.map((n) => graph.boundsOf(n.id)), [nodes, graph])
  const canvasBounds = useMemo(() => unionBounds(allBounds), [allBounds])

  const wrapperClass = unstyled
    ? className
    : ['sg-diagram', className].filter(Boolean).join(' ')

  const wrapperStyle: CSSProperties = {
    position: 'relative',
    width,
    height,
    overflow: 'auto',
    ...style,
  }

  return (
    <div className={wrapperClass} style={wrapperStyle}>
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
        {edges.map((edge) => renderEdge(graph, edge))}
      </svg>
      {nodes.map((node) => {
        const bounds = graph.boundsOf(node.id)
        const nodeClass = unstyled
          ? undefined
          : ['sg-diagram-node', `sg-diagram-node-${node.outline.kind}`].join(' ')
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
            }}
          >
            {renderNode(node)}
          </div>
        )
      })}
    </div>
  )
}

function renderEdge(graph: GraphEngine, edge: GraphEdge): ReactNode {
  const a = endpointWorldPoint(graph, edge.from)
  const b = endpointWorldPoint(graph, edge.to)
  if (!a || !b) return null
  return (
    <path
      key={edge.id}
      d={buildEdgePath(edge, a, b)}
      className={`sg-diagram-edge sg-diagram-edge-${edge.routing}`}
      fill="none"
    />
  )
}
