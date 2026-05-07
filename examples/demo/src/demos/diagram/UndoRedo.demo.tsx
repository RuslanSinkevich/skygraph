import { useCallback, useEffect, useRef } from 'react'
import { Diagram, useGraph } from '@skygraph/react'

/**
 * Undo / redo via the engine's built-in history. Drag the nodes around,
 * then hit `Ctrl+Z` / `Ctrl+Shift+Z` (or use the buttons) to walk the
 * timeline. The history is global per graph instance and grouped per
 * mutation (single drag-and-drop = one undo step).
 */
export function UndoRedoDiagram() {
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
      transform: { x: 440, y: 60 },
      outline: { kind: 'rect', w: 110, h: 50 },
    })
    graph.addEdge({ from: { node: a, anchor: 'ne' }, to: { node: b, anchor: 'nw' } })
    graph.addEdge({ from: { node: b, anchor: 'ne' }, to: { node: c, anchor: 'nw' } })
  }, [graph])

  const undo = useCallback(() => graph.undo(), [graph])
  const redo = useCallback(() => graph.redo(), [graph])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const ctrl = e.ctrlKey || e.metaKey
      if (!ctrl) return
      const key = e.key.toLowerCase()
      if (key === 'z' && !e.shiftKey) {
        e.preventDefault()
        graph.undo()
      } else if ((key === 'z' && e.shiftKey) || key === 'y') {
        e.preventDefault()
        graph.redo()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [graph])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button" onClick={undo}>↶ Undo (Ctrl+Z)</button>
        <button type="button" onClick={redo}>↷ Redo (Ctrl+Y)</button>
      </div>
      <Diagram
        graph={graph}
        state={state}
        width={620}
        height={260}
        draggable
        renderNode={(node) => <span style={{ fontWeight: 600 }}>{String(node.id)}</span>}
      />
    </div>
  )
}
