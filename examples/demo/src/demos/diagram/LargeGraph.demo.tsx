import { useEffect, useRef } from 'react'
import { Diagram, useGraph } from '@skygraph/react'

const NODE_COUNT = 200
const EDGE_COUNT = 400
const COLS = 20

/**
 * Stress test — 200 nodes / 400 random bezier edges. The endpoints
 * bind to the perimeter midpoint (`s = 0.5`) instead of a fixed corner
 * so each curve picks its exit/enter side from the actual relative
 * position of source vs. target. For a random graph this dissolves
 * the "everything exits the same corner" mess into a much cleaner
 * fan-out: edges going north exit the top, edges going east exit the
 * right, etc.
 *
 * Renders inside a pan/zoom canvas so the browser never paints more
 * than the visible region. Drag a node to confirm interactivity stays
 * responsive even with 400 routed edges.
 */
export function LargeGraphDiagram() {
  const { graph, state } = useGraph()
  const initialised = useRef(false)

  useEffect(() => {
    if (initialised.current) return
    initialised.current = true
    graph.transaction(() => {
      for (let i = 0; i < NODE_COUNT; i++) {
        const col = i % COLS
        const row = Math.floor(i / COLS)
        graph.addNode({
          id: `n${i}`,
          transform: { x: 20 + col * 70, y: 20 + row * 60 },
          outline: { kind: 'rect', w: 56, h: 36 },
        })
      }
      // Deterministic pseudo-random pairs (seeded LCG) so the demo is
      // reproducible across renders.
      let seed = 0xc0ffee
      const next = () => {
        seed = (seed * 1664525 + 1013904223) >>> 0
        return seed
      }
      // Anchor IDs are irrelevant for `bezier` routing in this mode —
      // the diagram switches to floating endpoints, sliding both
      // connection points along their respective perimeters toward the
      // other node. Any anchor works as the "binding" reference; the
      // actual curve always exits the face nearest to the target.
      for (let i = 0; i < EDGE_COUNT; i++) {
        const a = next() % NODE_COUNT
        let b = next() % NODE_COUNT
        if (b === a) b = (b + 1) % NODE_COUNT
        graph.addEdge({
          from: { node: `n${a}`, anchor: 'nw' },
          to: { node: `n${b}`, anchor: 'nw' },
          routing: 'bezier',
        })
      }
    })
  }, [graph])

  return (
    <Diagram
      graph={graph}
      state={state}
      width={760}
      height={460}
      draggable
      zoomable
      panable
      routingOptions={{ curvature: 0.35 }}
      renderNode={(node) => (
        <span style={{ fontSize: 10, fontWeight: 600 }}>{String(node.id)}</span>
      )}
    />
  )
}
