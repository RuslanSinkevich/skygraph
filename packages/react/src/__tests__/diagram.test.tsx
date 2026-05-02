import { describe, it, expect } from 'vitest'
import { render, act, renderHook, fireEvent } from '@testing-library/react'
import { Diagram, useGraph } from '../index'

describe('useGraph hook', () => {
  it('returns a stable graph reference and an empty initial state', () => {
    const { result, rerender } = renderHook(() => useGraph())
    const first = result.current.graph
    rerender()
    expect(result.current.graph).toBe(first)
    expect(result.current.state.nodes.size).toBe(0)
    expect(result.current.state.edges.size).toBe(0)
  })

  it('snapshot updates when a node is added', () => {
    const { result } = renderHook(() => useGraph())
    act(() => {
      result.current.graph.addNode({ id: 'n1' })
    })
    expect(result.current.state.nodes.size).toBe(1)
    expect(result.current.state.nodes.get('n1')).toBeDefined()
  })

  it('snapshot updates when an edge is added', () => {
    const { result } = renderHook(() => useGraph())
    act(() => {
      result.current.graph.addNode({ id: 'a' })
      result.current.graph.addNode({ id: 'b' })
      result.current.graph.addEdge({
        id: 'e',
        from: { node: 'a', anchor: 'nw' },
        to: { node: 'b', anchor: 'nw' },
      })
    })
    expect(result.current.state.edges.size).toBe(1)
    expect(result.current.state.edges.get('e')).toBeDefined()
  })

  it('removeNode also drops incident edges from the snapshot', () => {
    const { result } = renderHook(() => useGraph())
    act(() => {
      result.current.graph.addNode({ id: 'a' })
      result.current.graph.addNode({ id: 'b' })
      result.current.graph.addEdge({
        id: 'e',
        from: { node: 'a', anchor: 'nw' },
        to: { node: 'b', anchor: 'nw' },
      })
      result.current.graph.removeNode('a')
    })
    expect(result.current.state.nodes.size).toBe(1)
    expect(result.current.state.edges.size).toBe(0)
  })

  it('undo / redo round-trip a node addition through the React snapshot', () => {
    const { result } = renderHook(() => useGraph())
    act(() => {
      result.current.graph.addNode({ id: 'a' })
    })
    expect(result.current.state.nodes.size).toBe(1)

    act(() => {
      result.current.graph.undo()
    })
    expect(result.current.state.nodes.size).toBe(0)

    act(() => {
      result.current.graph.redo()
    })
    expect(result.current.state.nodes.size).toBe(1)
    expect(result.current.state.nodes.get('a')).toBeDefined()
  })

  it('transaction() groups mutations: a single undo restores the prior empty state', () => {
    const { result } = renderHook(() => useGraph())
    act(() => {
      result.current.graph.transaction(() => {
        result.current.graph.addNode({ id: 'a' })
        result.current.graph.addNode({ id: 'b' })
        result.current.graph.addEdge({
          id: 'e',
          from: { node: 'a', anchor: 'nw' },
          to: { node: 'b', anchor: 'nw' },
        })
      })
    })
    expect(result.current.state.nodes.size).toBe(2)
    expect(result.current.state.edges.size).toBe(1)

    act(() => {
      result.current.graph.undo()
    })
    expect(result.current.state.nodes.size).toBe(0)
    expect(result.current.state.edges.size).toBe(0)
  })
})

describe('Diagram component', () => {
  it('renders the wrapper with sg-diagram class by default', () => {
    const { graph, state } = simpleScene()
    const { container } = render(<Diagram graph={graph} state={state} />)
    const wrapper = container.querySelector('.sg-diagram')
    expect(wrapper).not.toBeNull()
  })

  it('drops sg-diagram classes when unstyled', () => {
    const { graph, state } = simpleScene()
    const { container } = render(<Diagram graph={graph} state={state} unstyled />)
    expect(container.querySelector('.sg-diagram')).toBeNull()
    expect(container.querySelector('.sg-diagram-node')).toBeNull()
  })

  it('renders one DOM node per graph node', () => {
    const { graph, state } = simpleScene()
    const { container } = render(<Diagram graph={graph} state={state} />)
    const nodes = container.querySelectorAll('.sg-diagram-node')
    expect(nodes.length).toBe(3) // a, b, c
  })

  it('renders one SVG path per edge', () => {
    const { graph, state } = simpleScene()
    const { container } = render(<Diagram graph={graph} state={state} />)
    const paths = container.querySelectorAll('.sg-diagram-edge')
    expect(paths.length).toBe(2) // a→b, b→c
  })

  it('renderNode prop replaces the default label', () => {
    const { graph, state } = simpleScene()
    const { container } = render(
      <Diagram
        graph={graph}
        state={state}
        renderNode={(n) => <span data-testid="custom-label">CUSTOM:{n.id}</span>}
      />,
    )
    const labels = container.querySelectorAll('[data-testid="custom-label"]')
    expect(labels.length).toBe(3)
    expect(labels[0]!.textContent).toContain('CUSTOM:a')
  })

  it('uses outline kind to pick a node modifier class', () => {
    const { graph, state } = simpleScene()
    const { container } = render(<Diagram graph={graph} state={state} />)
    const rectNodes = container.querySelectorAll('.sg-diagram-node-rect')
    expect(rectNodes.length).toBe(3)
  })

  it('survives empty graph (no nodes / no edges)', () => {
    const { result } = renderHook(() => useGraph())
    const { graph, state } = result.current
    const { container } = render(<Diagram graph={graph} state={state} />)
    expect(container.querySelectorAll('.sg-diagram-node').length).toBe(0)
    expect(container.querySelectorAll('.sg-diagram-edge').length).toBe(0)
  })

  it('orthogonal edges produce L-shaped paths (3 points)', () => {
    const { result } = renderHook(() => useGraph())
    act(() => {
      const a = result.current.graph.addNode({
        id: 'a', transform: { x: 0, y: 0 }, outline: { kind: 'rect', w: 50, h: 30 },
      })
      const b = result.current.graph.addNode({
        id: 'b', transform: { x: 200, y: 100 }, outline: { kind: 'rect', w: 50, h: 30 },
      })
      result.current.graph.addEdge({
        from: { node: a, anchor: 'ne' },
        to: { node: b, anchor: 'nw' },
        routing: 'orthogonal',
      })
    })
    const { container } = render(
      <Diagram graph={result.current.graph} state={result.current.state} />,
    )
    const path = container.querySelector('.sg-diagram-edge-orthogonal') as SVGPathElement
    expect(path).not.toBeNull()
    const d = path.getAttribute('d')!
    // L-route → 3 points → 2 L commands
    const lCount = (d.match(/L /g) ?? []).length
    expect(lCount).toBe(2)
  })

  it('manual edges with waypoints render through them', () => {
    const { result } = renderHook(() => useGraph())
    act(() => {
      const a = result.current.graph.addNode({ id: 'a', transform: { x: 0, y: 0 } })
      const b = result.current.graph.addNode({ id: 'b', transform: { x: 100, y: 100 } })
      result.current.graph.addEdge({
        from: { node: a, anchor: 'ne' },
        to: { node: b, anchor: 'nw' },
        routing: 'manual',
        waypoints: [[50, 0], [50, 100]],
      })
    })
    const { container } = render(
      <Diagram graph={result.current.graph} state={result.current.state} />,
    )
    const path = container.querySelector('.sg-diagram-edge-manual') as SVGPathElement
    expect(path).not.toBeNull()
    const d = path.getAttribute('d')!
    // start + 2 waypoints + end = 4 points → 3 L commands
    const lCount = (d.match(/L /g) ?? []).length
    expect(lCount).toBe(3)
  })

  it('draggable adds sg-diagram-node-draggable class and grab cursor', () => {
    const { result } = renderHook(() => useGraph())
    act(() => {
      result.current.graph.addNode({ id: 'a', transform: { x: 0, y: 0 } })
    })
    const { container } = render(
      <Diagram graph={result.current.graph} state={result.current.state} draggable />,
    )
    const nodeEl = container.querySelector('.sg-diagram-node-draggable') as HTMLElement
    expect(nodeEl).not.toBeNull()
    expect(nodeEl.style.cursor).toBe('grab')
  })

  it('not-draggable nodes have no cursor styling', () => {
    const { result } = renderHook(() => useGraph())
    act(() => {
      result.current.graph.addNode({ id: 'a', transform: { x: 0, y: 0 } })
    })
    const { container } = render(
      <Diagram graph={result.current.graph} state={result.current.state} />,
    )
    const nodeEl = container.querySelector('.sg-diagram-node') as HTMLElement
    expect(container.querySelector('.sg-diagram-node-draggable')).toBeNull()
    expect(nodeEl.style.cursor).toBe('')
  })

  it('Ctrl+wheel zoom updates the canvas transform when zoomable', () => {
    const { result } = renderHook(() => useGraph())
    act(() => {
      result.current.graph.addNode({ id: 'a', transform: { x: 0, y: 0 } })
    })
    const { container } = render(
      <Diagram graph={result.current.graph} state={result.current.state} zoomable />,
    )
    const wrapper = container.querySelector('.sg-diagram') as HTMLElement
    const canvas = container.querySelector('.sg-diagram-canvas') as HTMLElement
    expect(canvas.dataset.zoom).toBe('1')

    // Ctrl+wheel up → zoom in.
    fireEvent.wheel(wrapper, { deltaY: -100, ctrlKey: true })
    expect(Number(canvas.dataset.zoom)).toBeGreaterThan(1)

    // Ctrl+wheel down → zoom out below the previous value.
    const after = Number(canvas.dataset.zoom)
    fireEvent.wheel(wrapper, { deltaY: 100, ctrlKey: true })
    expect(Number(canvas.dataset.zoom)).toBeLessThan(after)
  })

  it('plain wheel pans the canvas when panable', () => {
    const { result } = renderHook(() => useGraph())
    act(() => {
      result.current.graph.addNode({ id: 'a', transform: { x: 0, y: 0 } })
    })
    const { container } = render(
      <Diagram graph={result.current.graph} state={result.current.state} panable />,
    )
    const wrapper = container.querySelector('.sg-diagram') as HTMLElement
    const canvas = container.querySelector('.sg-diagram-canvas') as HTMLElement
    expect(canvas.dataset.panX).toBe('0')
    expect(canvas.dataset.panY).toBe('0')

    fireEvent.wheel(wrapper, { deltaX: 30, deltaY: 50 })
    expect(Number(canvas.dataset.panX)).toBe(-30)
    expect(Number(canvas.dataset.panY)).toBe(-50)
  })

  it('middle-button drag pans the canvas when panable', () => {
    const { result } = renderHook(() => useGraph())
    act(() => {
      result.current.graph.addNode({ id: 'a', transform: { x: 0, y: 0 } })
    })
    const { container } = render(
      <Diagram graph={result.current.graph} state={result.current.state} panable />,
    )
    const wrapper = container.querySelector('.sg-diagram') as HTMLElement
    const canvas = container.querySelector('.sg-diagram-canvas') as HTMLElement

    fireEvent.mouseDown(wrapper, { button: 1, clientX: 100, clientY: 100 })
    fireEvent.mouseMove(window, { clientX: 140, clientY: 170 })
    fireEvent.mouseUp(window)

    expect(Number(canvas.dataset.panX)).toBe(40)
    expect(Number(canvas.dataset.panY)).toBe(70)
  })

  it('zoom controls clamp to a sensible range (no negative or zero zoom)', () => {
    const { result } = renderHook(() => useGraph())
    act(() => {
      result.current.graph.addNode({ id: 'a', transform: { x: 0, y: 0 } })
    })
    const { container } = render(
      <Diagram graph={result.current.graph} state={result.current.state} zoomable />,
    )
    const wrapper = container.querySelector('.sg-diagram') as HTMLElement
    const canvas = container.querySelector('.sg-diagram-canvas') as HTMLElement

    // Hammer zoom-out a lot — final value must remain strictly positive.
    for (let i = 0; i < 100; i++) {
      fireEvent.wheel(wrapper, { deltaY: 100, ctrlKey: true })
    }
    expect(Number(canvas.dataset.zoom)).toBeGreaterThan(0)
  })

  it('snapToGrid rounds drag coordinates to multiples of the step', () => {
    const { result } = renderHook(() => useGraph())
    act(() => {
      result.current.graph.addNode({ id: 'a', transform: { x: 0, y: 0 } })
    })
    const { container } = render(
      <Diagram
        graph={result.current.graph}
        state={result.current.state}
        draggable
        snapToGrid={20}
      />,
    )
    const nodeEl = container.querySelector('[data-node-id="a"]') as HTMLElement

    fireEvent.mouseDown(nodeEl, { button: 0, clientX: 0, clientY: 0 })
    // Move 27 px right, 13 px down — should snap to (20, 20).
    fireEvent.mouseMove(window, { clientX: 27, clientY: 13 })
    fireEvent.mouseUp(window)

    const node = result.current.graph.getNode('a')!
    expect(node.transform.x % 20).toBe(0)
    expect(node.transform.y % 20).toBe(0)
    expect(node.transform.x).toBe(20)
    expect(node.transform.y).toBe(20)
  })

  it('snapToGrid attaches the sg-diagram-grid hook class', () => {
    const { result } = renderHook(() => useGraph())
    const { container } = render(
      <Diagram
        graph={result.current.graph}
        state={result.current.state}
        snapToGrid={25}
      />,
    )
    expect(container.querySelector('.sg-diagram.sg-diagram-grid')).not.toBeNull()
  })

  it('without snapToGrid the grid hook class is absent', () => {
    const { result } = renderHook(() => useGraph())
    const { container } = render(
      <Diagram graph={result.current.graph} state={result.current.state} />,
    )
    expect(container.querySelector('.sg-diagram-grid')).toBeNull()
  })

  it('routeAroundNodes makes orthogonal edges avoid intermediate node bounds', () => {
    const { result } = renderHook(() => useGraph())
    act(() => {
      const a = result.current.graph.addNode({
        id: 'a',
        transform: { x: 0, y: 0 },
        outline: { kind: 'rect', w: 40, h: 40 },
      })
      // Wall-like obstacle directly between a and b.
      result.current.graph.addNode({
        id: 'wall',
        transform: { x: 80, y: -40 },
        outline: { kind: 'rect', w: 40, h: 120 },
      })
      const b = result.current.graph.addNode({
        id: 'b',
        transform: { x: 200, y: 0 },
        outline: { kind: 'rect', w: 40, h: 40 },
      })
      result.current.graph.addEdge({
        from: { node: a, anchor: 'ne' },
        to: { node: b, anchor: 'nw' },
        routing: 'orthogonal',
      })
    })
    const { container } = render(
      <Diagram
        graph={result.current.graph}
        state={result.current.state}
        routeAroundNodes
      />,
    )
    const path = container.querySelector('.sg-diagram-edge-orthogonal') as SVGPathElement
    expect(path).not.toBeNull()
    expect(Number(path.getAttribute('data-obstacle-count'))).toBeGreaterThan(0)
    const d = path.getAttribute('d')!
    // The simple L-route would only have 2 L commands; an obstacle-avoiding
    // path detours and produces strictly more.
    const lCount = (d.match(/L /g) ?? []).length
    expect(lCount).toBeGreaterThan(2)
  })

  it('straight edges (default) produce a single L segment', () => {
    const { result } = renderHook(() => useGraph())
    act(() => {
      const a = result.current.graph.addNode({ id: 'a', transform: { x: 0, y: 0 } })
      const b = result.current.graph.addNode({ id: 'b', transform: { x: 100, y: 100 } })
      result.current.graph.addEdge({
        from: { node: a, anchor: 'ne' },
        to: { node: b, anchor: 'nw' },
        // routing defaults to 'straight'
      })
    })
    const { container } = render(
      <Diagram graph={result.current.graph} state={result.current.state} />,
    )
    const path = container.querySelector('.sg-diagram-edge-straight') as SVGPathElement
    expect(path).not.toBeNull()
    const d = path.getAttribute('d')!
    expect((d.match(/L /g) ?? []).length).toBe(1)
  })
})

// ─── Helpers ──────────────────────────────────────────────────────────────

function simpleScene() {
  const { result } = renderHook(() => useGraph())
  act(() => {
    const a = result.current.graph.addNode({
      id: 'a',
      transform: { x: 0, y: 0 },
      outline: { kind: 'rect', w: 80, h: 40 },
    })
    const b = result.current.graph.addNode({
      id: 'b',
      transform: { x: 200, y: 0 },
      outline: { kind: 'rect', w: 80, h: 40 },
    })
    const c = result.current.graph.addNode({
      id: 'c',
      transform: { x: 200, y: 200 },
      outline: { kind: 'rect', w: 80, h: 40 },
    })
    result.current.graph.addEdge({ from: { node: a, anchor: 'ne' }, to: { node: b, anchor: 'nw' } })
    result.current.graph.addEdge({ from: { node: b, anchor: 'se' }, to: { node: c, anchor: 'nw' } })
  })
  // `result.current` is captured here (after act()) so the returned values are
  // a stable snapshot of the graph engine + reactive state for the test.
  return { graph: result.current.graph, state: result.current.state }
}
