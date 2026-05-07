import { useEffect, useRef, useState } from 'react'
import type { NodeId } from '@skygraph/core'
import { Diagram, useGraph } from '@skygraph/react'

/**
 * Multi-select with lasso. `Ctrl+click` toggles individual nodes;
 * dragging on the empty canvas opens a rubber-band that selects every
 * node whose AABB intersects it. Dragging any selected node moves the
 * whole group with the same delta — a single undo restores the
 * pre-drag positions.
 */
export function MultiSelectDiagram() {
  const { graph, state } = useGraph()
  const [selection, setSelection] = useState<NodeId[]>([])
  const initialised = useRef(false)

  useEffect(() => {
    if (initialised.current) return
    initialised.current = true
    const grid = 4
    let i = 0
    for (let r = 0; r < grid; r++) {
      for (let c = 0; c < grid; c++) {
        graph.addNode({
          id: `N${i++}`,
          transform: { x: 40 + c * 130, y: 40 + r * 80 },
          outline: { kind: 'rect', w: 100, h: 50 },
        })
      }
    }
    for (let k = 0; k < grid * grid - 1; k++) {
      graph.addEdge({
        from: { node: `N${k}`, anchor: 'se' },
        to: { node: `N${k + 1}`, anchor: 'nw' },
      })
    }
  }, [graph])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
        Selected: {selection.length === 0 ? '(none)' : selection.join(', ')}
      </div>
      <Diagram
        graph={graph}
        state={state}
        width={620}
        height={360}
        draggable
        selectionMode="lasso"
        selection={selection}
        onSelectionChange={setSelection}
        renderNode={(node) => <span style={{ fontWeight: 600 }}>{String(node.id)}</span>}
      />
    </div>
  )
}
