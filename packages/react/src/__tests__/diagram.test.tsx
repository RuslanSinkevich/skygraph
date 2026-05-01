import { describe, it, expect } from 'vitest'
import { render, act, renderHook } from '@testing-library/react'
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
})

// ─── Helpers ──────────────────────────────────────────────────────────────

function simpleScene() {
  let graphRef: ReturnType<typeof renderHook<ReturnType<typeof useGraph>, void>>['result']['current']['graph']
  let stateRef: ReturnType<typeof renderHook<ReturnType<typeof useGraph>, void>>['result']['current']['state']
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
  graphRef = result.current.graph
  stateRef = result.current.state
  return { graph: graphRef!, state: stateRef! }
}
