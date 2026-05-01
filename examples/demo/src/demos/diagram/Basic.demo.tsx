import { useEffect, useRef } from 'react'
import { Diagram, useGraph } from '@skygraph/react'

/**
 * Three nodes (`A`, `B`, `C`) connected by two straight edges (`A→B`, `B→C`).
 * The DOM nodes use the default rect outline; edges run between resolved
 * anchors on the rect perimeter.
 */
export function BasicDiagram() {
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
      transform: { x: 400, y: 180 },
      outline: { kind: 'rect', w: 100, h: 50 },
    })

    graph.addEdge({ from: { node: a, anchor: 'ne' }, to: { node: b, anchor: 'nw' } })
    graph.addEdge({ from: { node: b, anchor: 'se' }, to: { node: c, anchor: 'nw' } })
  }, [graph])

  return (
    <Diagram
      graph={graph}
      state={state}
      width={560}
      height={300}
      renderNode={(node) => (
        <span style={{ fontWeight: 600 }}>{String(node.id)}</span>
      )}
    />
  )
}
