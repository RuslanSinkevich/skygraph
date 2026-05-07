import { useEffect, useRef } from 'react'
import { Diagram, useGraph } from '@skygraph/react'

/**
 * Pannable canvas. The middle mouse button drags the canvas, plain wheel
 * scrolls horizontally / vertically. Combined with `zoomable` it keeps
 * `Ctrl + wheel` for zoom and the rest for pan.
 */
export function PannableDiagram() {
  const { graph, state } = useGraph()
  const initialised = useRef(false)

  useEffect(() => {
    if (initialised.current) return
    initialised.current = true
    const a = graph.addNode({
      id: 'A',
      transform: { x: 40, y: 60 },
      outline: { kind: 'rect', w: 100, h: 50 },
    })
    const b = graph.addNode({
      id: 'B',
      transform: { x: 320, y: 200 },
      outline: { kind: 'rect', w: 100, h: 50 },
    })
    const c = graph.addNode({
      id: 'C',
      transform: { x: 600, y: 60 },
      outline: { kind: 'rect', w: 100, h: 50 },
    })
    const d = graph.addNode({
      id: 'D',
      transform: { x: 800, y: 220 },
      outline: { kind: 'rect', w: 100, h: 50 },
    })
    graph.addEdge({ from: { node: a, anchor: 'se' }, to: { node: b, anchor: 'nw' } })
    graph.addEdge({ from: { node: b, anchor: 'ne' }, to: { node: c, anchor: 'sw' } })
    graph.addEdge({ from: { node: c, anchor: 'se' }, to: { node: d, anchor: 'nw' } })
  }, [graph])

  return (
    <Diagram
      graph={graph}
      state={state}
      width={520}
      height={320}
      panable
      zoomable
      renderNode={(node) => <span style={{ fontWeight: 600 }}>{String(node.id)}</span>}
    />
  )
}
