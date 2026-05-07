import { useEffect, useRef } from 'react'
import { Diagram, useGraph } from '@skygraph/react'

/**
 * Zoomable canvas. Hold `Ctrl` (or `⌘` on macOS) and scroll the wheel
 * over the diagram to zoom in / out. Plain wheel does nothing here since
 * `panable` is off.
 */
export function ZoomableDiagram() {
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
      transform: { x: 220, y: 60 },
      outline: { kind: 'rect', w: 100, h: 50 },
    })
    const c = graph.addNode({
      id: 'C',
      transform: { x: 130, y: 200 },
      outline: { kind: 'ellipse', rx: 60, ry: 40 },
    })
    graph.addEdge({ from: { node: a, anchor: 'ne' }, to: { node: b, anchor: 'nw' } })
    graph.addEdge({ from: { node: a, anchor: 'se' }, to: { node: c, anchor: { s: 0.25 } } })
    graph.addEdge({ from: { node: b, anchor: 'sw' }, to: { node: c, anchor: { s: 0.75 } } })
  }, [graph])

  return (
    <Diagram
      graph={graph}
      state={state}
      width={500}
      height={320}
      zoomable
      renderNode={(node) => <span style={{ fontWeight: 600 }}>{String(node.id)}</span>}
    />
  )
}
