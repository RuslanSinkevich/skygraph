import { useEffect, useRef, useState } from 'react'
import type { GraphEdge, GraphNode } from '@skygraph/core'
import { Diagram, useGraph } from '@skygraph/react'

interface MenuState {
  x: number
  y: number
  items: Array<{ label: string; onSelect: () => void }>
}

/**
 * Custom context menu via the three callbacks: `onNodeContextMenu`,
 * `onEdgeContextMenu`, `onCanvasContextMenu`. Each opens a small floating
 * `<ul>` at the cursor position; selecting an item runs an engine
 * mutation (delete node / edge, add node).
 */
export function ContextMenuDiagram() {
  const { graph, state } = useGraph()
  const initialised = useRef(false)
  const [menu, setMenu] = useState<MenuState | null>(null)

  useEffect(() => {
    if (initialised.current) return
    initialised.current = true
    const a = graph.addNode({
      id: 'A',
      transform: { x: 60, y: 60 },
      outline: { kind: 'rect', w: 110, h: 50 },
    })
    const b = graph.addNode({
      id: 'B',
      transform: { x: 280, y: 80 },
      outline: { kind: 'rect', w: 110, h: 50 },
    })
    const c = graph.addNode({
      id: 'C',
      transform: { x: 480, y: 200 },
      outline: { kind: 'rect', w: 110, h: 50 },
    })
    graph.addEdge({ from: { node: a, anchor: 'ne' }, to: { node: b, anchor: 'nw' } })
    graph.addEdge({ from: { node: b, anchor: 'se' }, to: { node: c, anchor: 'nw' } })
  }, [graph])

  useEffect(() => {
    if (!menu) return
    const close = () => setMenu(null)
    window.addEventListener('mousedown', close)
    window.addEventListener('blur', close)
    return () => {
      window.removeEventListener('mousedown', close)
      window.removeEventListener('blur', close)
    }
  }, [menu])

  const handleNode = (e: React.MouseEvent, node: GraphNode) => {
    setMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { label: `Delete ${String(node.id)}`, onSelect: () => graph.removeNode(node.id) },
        {
          label: 'Duplicate',
          onSelect: () => {
            graph.addNode({
              transform: { x: node.transform.x + 30, y: node.transform.y + 30 },
              outline: node.outline,
            })
          },
        },
      ],
    })
  }

  const handleEdge = (e: React.MouseEvent, edge: GraphEdge) => {
    setMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { label: `Delete edge ${String(edge.id)}`, onSelect: () => graph.removeEdge(edge.id) },
      ],
    })
  }

  const handleCanvas = (
    e: React.MouseEvent,
    point: { x: number; y: number; screenX: number; screenY: number },
  ) => {
    setMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        {
          label: 'Add node here',
          onSelect: () =>
            graph.addNode({
              transform: { x: point.x - 50, y: point.y - 25 },
              outline: { kind: 'rect', w: 100, h: 50 },
            }),
        },
      ],
    })
  }

  return (
    <div style={{ position: 'relative' }}>
      <Diagram
        graph={graph}
        state={state}
        width={640}
        height={320}
        draggable
        onNodeContextMenu={handleNode}
        onEdgeContextMenu={handleEdge}
        onCanvasContextMenu={handleCanvas}
        renderNode={(node) => <span style={{ fontWeight: 600 }}>{String(node.id)}</span>}
      />
      {menu && (
        <ul
          role="menu"
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            left: menu.x,
            top: menu.y,
            margin: 0,
            padding: 4,
            listStyle: 'none',
            background: 'var(--sg-color-bg-elevated, #fff)',
            border: '1px solid var(--sg-color-border, #ccc)',
            borderRadius: 6,
            boxShadow: '0 6px 16px rgba(0,0,0,0.18)',
            minWidth: 180,
            zIndex: 1000,
          }}
        >
          {menu.items.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => {
                  item.onSelect()
                  setMenu(null)
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '6px 10px',
                  textAlign: 'left',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
