import { useEffect, useRef } from 'react'
import { Diagram, useGraph } from '@skygraph/react'

/**
 * Orthogonal routing with obstacle avoidance — the A*-based router gets
 * every other node as an obstacle so edges detour around them rather
 * than cutting through. Drag the nodes to see the rerouting in real
 * time.
 */
export function OrthogonalRoutingDiagram() {
  const { graph, state } = useGraph()
  const initialised = useRef(false)

  useEffect(() => {
    if (initialised.current) return
    initialised.current = true
    const layout: Array<{ id: string; x: number; y: number }> = [
      { id: 'A', x: 40, y: 60 },
      { id: 'B', x: 320, y: 60 },
      { id: 'C', x: 600, y: 60 },
      { id: 'D', x: 40, y: 240 },
      { id: 'E', x: 600, y: 240 },
      { id: 'F', x: 320, y: 360 },
    ]
    for (const n of layout) {
      graph.addNode({
        id: n.id,
        transform: { x: n.x, y: n.y },
        outline: { kind: 'rect', w: 110, h: 56 },
      })
    }
    // 8 edges, several with non-trivial obstacles between them.
    const edges: Array<['nw' | 'ne' | 'se' | 'sw', 'nw' | 'ne' | 'se' | 'sw', string, string]> = [
      ['ne', 'nw', 'A', 'B'],
      ['ne', 'nw', 'B', 'C'],
      ['se', 'ne', 'A', 'D'],
      ['sw', 'nw', 'C', 'E'],
      ['se', 'nw', 'D', 'F'],
      ['sw', 'ne', 'E', 'F'],
      ['sw', 'ne', 'B', 'D'],
      ['se', 'nw', 'B', 'E'],
    ]
    for (const [fa, ta, from, to] of edges) {
      graph.addEdge({
        from: { node: from, anchor: fa },
        to: { node: to, anchor: ta },
        routing: 'orthogonal',
      })
    }
  }, [graph])

  return (
    <Diagram
      graph={graph}
      state={state}
      width={760}
      height={460}
      draggable
      routeAroundNodes
      routingOptions={{ gridSize: 10, inflate: 6 }}
      renderNode={(node) => <span style={{ fontWeight: 600 }}>{String(node.id)}</span>}
    />
  )
}
