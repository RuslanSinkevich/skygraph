import { useEffect, useRef } from 'react'
import { Diagram, useGraph, Button } from '@skygraph/react'
import type { DiagramRef } from '@skygraph/react'

/**
 * Демонстрация печати диаграммы. `printable={{ fileName }}` задаёт title popup-
 * окна (используется браузером как имя файла в "Save as PDF"). При печати
 * `print.css` сбрасывает pan/zoom transform, разворачивает overflow и убирает
 * тулбары / minimap, помеченные через `.sg-no-print`.
 */
export function DiagramPrintDemo() {
  const { graph, state } = useGraph()
  const diagramRef = useRef<DiagramRef>(null)
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
      transform: { x: 240, y: 60 },
      outline: { kind: 'rect', w: 100, h: 50 },
    })
    const c = graph.addNode({
      id: 'C',
      transform: { x: 440, y: 200 },
      outline: { kind: 'rect', w: 100, h: 50 },
    })

    graph.addEdge({ from: { node: a, anchor: 'ne' }, to: { node: b, anchor: 'nw' } })
    graph.addEdge({ from: { node: b, anchor: 'se' }, to: { node: c, anchor: 'nw' } })
  }, [graph])

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div className="sg-no-print" style={{ display: 'flex', gap: 8 }}>
        <Button onClick={() => diagramRef.current?.print()}>
          Print diagram
        </Button>
        <Button
          onClick={() =>
            diagramRef.current?.print({
              fileName: 'workflow-A4-landscape',
              orientation: 'landscape',
              pageSize: 'A4',
            })
          }
        >
          Print A4 landscape
        </Button>
      </div>
      <Diagram
        ref={diagramRef}
        graph={graph}
        state={state}
        width={620}
        height={320}
        printable={{ fileName: 'workflow' }}
        renderNode={(node) => <span style={{ fontWeight: 600 }}>{String(node.id)}</span>}
      />
    </div>
  )
}
