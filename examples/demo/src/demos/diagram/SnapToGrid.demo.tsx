import { useEffect, useRef } from 'react'
import { Diagram, useGraph } from '@skygraph/react'

/**
 * `snapToGrid={20}` rounds drag-end coordinates to multiples of 20 world
 * units and turns on the matching CSS background grid (the
 * `.sg-diagram-grid` modifier).
 */
export function SnapToGridDiagram() {
  const { graph, state } = useGraph()
  const initialised = useRef(false)

  useEffect(() => {
    if (initialised.current) return
    initialised.current = true
    const a = graph.addNode({
      id: 'A',
      transform: { x: 60, y: 60 },
      outline: { kind: 'rect', w: 100, h: 60 },
    })
    const b = graph.addNode({
      id: 'B',
      transform: { x: 280, y: 60 },
      outline: { kind: 'rect', w: 100, h: 60 },
    })
    const c = graph.addNode({
      id: 'C',
      transform: { x: 160, y: 220 },
      outline: { kind: 'rect', w: 120, h: 60 },
    })
    graph.addEdge({ from: { node: a, anchor: 'se' }, to: { node: c, anchor: 'nw' } })
    graph.addEdge({ from: { node: b, anchor: 'sw' }, to: { node: c, anchor: 'ne' } })
  }, [graph])

  return (
    <Diagram
      graph={graph}
      state={state}
      width={500}
      height={340}
      draggable
      snapToGrid={20}
      renderNode={(node) => <span style={{ fontWeight: 600 }}>{String(node.id)}</span>}
    />
  )
}
