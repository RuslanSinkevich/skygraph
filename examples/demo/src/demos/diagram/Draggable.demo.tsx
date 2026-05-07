import { useEffect, useRef } from 'react'
import { Diagram, useGraph } from '@skygraph/react'

/**
 * Drag-and-drop demo: every node carries the default `grab` / `grabbing`
 * cursor and a hover-elevated shadow. While a node is being dragged the
 * `[data-sg-dragging="true"]` attribute lifts it with a stronger shadow.
 */
export function DraggableDiagram() {
  const { graph, state } = useGraph()
  const initialised = useRef(false)

  useEffect(() => {
    if (initialised.current) return
    initialised.current = true
    const a = graph.addNode({
      id: 'A',
      transform: { x: 40, y: 60 },
      outline: { kind: 'rect', w: 110, h: 50 },
    })
    const b = graph.addNode({
      id: 'B',
      transform: { x: 240, y: 60 },
      outline: { kind: 'rect', w: 110, h: 50 },
    })
    const c = graph.addNode({
      id: 'C',
      transform: { x: 440, y: 200 },
      outline: { kind: 'rect', w: 110, h: 50 },
    })
    graph.addEdge({ from: { node: a, anchor: 'ne' }, to: { node: b, anchor: 'nw' } })
    graph.addEdge({ from: { node: b, anchor: 'se' }, to: { node: c, anchor: 'nw' } })
  }, [graph])

  return (
    <Diagram
      graph={graph}
      state={state}
      width={620}
      height={320}
      draggable
      renderNode={(node) => <span style={{ fontWeight: 600 }}>{String(node.id)}</span>}
    />
  )
}
