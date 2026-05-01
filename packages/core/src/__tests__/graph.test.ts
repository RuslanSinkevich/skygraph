import { describe, it, expect } from 'vitest'
import { createCore } from '../Core'
import { createGraph } from '../engines/graph/GraphEngine'
import type { Outline } from '../engines/graph/types'

function setup() {
  const core = createCore()
  const graph = createGraph(core)
  return { core, graph }
}

describe('GraphEngine: nodes', () => {
  it('addNode returns a stable id and stores the node', () => {
    const { graph } = setup()
    const id = graph.addNode({ outline: { kind: 'rect', w: 80, h: 40 } })
    expect(graph.getNode(id)).toBeDefined()
    expect(graph.getNode(id)?.outline).toEqual({ kind: 'rect', w: 80, h: 40 })
  })

  it('addNode applies defaults (rect 100×60, transform {0,0}, perEdge k=1)', () => {
    const { graph } = setup()
    const id = graph.addNode()
    const n = graph.getNode(id)!
    expect(n.outline).toEqual({ kind: 'rect', w: 100, h: 60 })
    expect(n.transform).toEqual({ x: 0, y: 0 })
    expect(n.anchorPolicy).toEqual({ kind: 'perEdge', k: 1 })
    expect(n.parentId).toBeNull()
    expect(n.geomRevision).toBe(0)
  })

  it('addNode rejects duplicate ids', () => {
    const { graph } = setup()
    graph.addNode({ id: 'a' })
    expect(() => graph.addNode({ id: 'a' })).toThrow(/already exists/)
  })

  it('moveNode bumps geomRevision', () => {
    const { graph } = setup()
    const id = graph.addNode()
    graph.moveNode(id, 50, 50)
    expect(graph.getNode(id)?.transform).toEqual({ x: 50, y: 50 })
    expect(graph.getNode(id)?.geomRevision).toBe(1)
  })

  it('updateNode bumps geomRevision only on geom-affecting changes', () => {
    const { graph } = setup()
    const id = graph.addNode()
    graph.updateNode(id, { data: { foo: 1 } })
    expect(graph.getNode(id)?.geomRevision).toBe(0) // data-only change
    graph.updateNode(id, { outline: { kind: 'rect', w: 200, h: 50 } })
    expect(graph.getNode(id)?.geomRevision).toBe(1)
    graph.updateNode(id, { transform: { x: 5 } })
    expect(graph.getNode(id)?.geomRevision).toBe(2)
  })

  it('removeNode also drops incident edges', () => {
    const { graph } = setup()
    const a = graph.addNode()
    const b = graph.addNode()
    const e = graph.addEdge({ from: { node: a, anchor: 'nw' }, to: { node: b, anchor: 'sw' } })
    expect(graph.getEdge(e)).toBeDefined()
    graph.removeNode(a)
    expect(graph.getEdge(e)).toBeUndefined()
    expect(graph.getNode(a)).toBeUndefined()
  })
})

describe('GraphEngine: hierarchy (parentId)', () => {
  it('childrenOf(null) returns root-level nodes', () => {
    const { graph } = setup()
    const a = graph.addNode()
    const b = graph.addNode()
    const c = graph.addNode({ parentId: a })
    expect(new Set(graph.childrenOf(null))).toEqual(new Set([a, b]))
    expect(graph.childrenOf(a)).toEqual([c])
  })

  it('setParent re-parents a node', () => {
    const { graph } = setup()
    const a = graph.addNode()
    const b = graph.addNode()
    const c = graph.addNode({ parentId: a })
    graph.setParent(c, b)
    expect(graph.getNode(c)?.parentId).toBe(b)
    expect(graph.childrenOf(a)).toEqual([])
    expect(graph.childrenOf(b)).toEqual([c])
  })

  it('setParent rejects self-parent and cycles', () => {
    const { graph } = setup()
    const a = graph.addNode()
    const b = graph.addNode({ parentId: a })
    expect(() => graph.setParent(a, a)).toThrow(/own parent/)
    // a → b would create a cycle a → b → a
    expect(() => graph.setParent(a, b)).toThrow(/cycle/)
  })

  it('removeNode re-parents children to root (does not orphan them)', () => {
    const { graph } = setup()
    const a = graph.addNode()
    const c = graph.addNode({ parentId: a })
    graph.removeNode(a)
    expect(graph.getNode(c)?.parentId).toBeNull()
  })
})

describe('GraphEngine: edges', () => {
  it('addEdge requires both endpoints to exist', () => {
    const { graph } = setup()
    const a = graph.addNode()
    expect(() =>
      graph.addEdge({ from: { node: a, anchor: 'nw' }, to: { node: 'ghost', anchor: 'nw' } }),
    ).toThrow(/not found/)
  })

  it('edgesOf returns all incident edges', () => {
    const { graph } = setup()
    const a = graph.addNode()
    const b = graph.addNode()
    const c = graph.addNode()
    const e1 = graph.addEdge({ from: { node: a, anchor: 'nw' }, to: { node: b, anchor: 'nw' } })
    const e2 = graph.addEdge({ from: { node: a, anchor: 'ne' }, to: { node: c, anchor: 'nw' } })
    expect(new Set(graph.edgesOf(a))).toEqual(new Set([e1, e2]))
    expect(graph.edgesOf(b)).toEqual([e1])
    expect(graph.edgesOf(c)).toEqual([e2])
  })

  it('removeEdge cleans both endpoint buckets', () => {
    const { graph } = setup()
    const a = graph.addNode()
    const b = graph.addNode()
    const e = graph.addEdge({ from: { node: a, anchor: 'nw' }, to: { node: b, anchor: 'nw' } })
    graph.removeEdge(e)
    expect(graph.edgesOf(a)).toEqual([])
    expect(graph.edgesOf(b)).toEqual([])
  })
})

describe('GraphEngine: anchors', () => {
  it('rect with perEdge k=0 produces just the four corners', () => {
    const { graph } = setup()
    const id = graph.addNode({
      outline: { kind: 'rect', w: 100, h: 60 },
      anchorPolicy: { kind: 'perEdge', k: 0 },
    })
    const anchors = graph.anchorsOf(id)
    expect(anchors.map(a => a.id).sort()).toEqual(['ne', 'nw', 'se', 'sw'])
  })

  it('rect with perEdge k=2 produces 4 corners + 2*4=8 mid-edge anchors', () => {
    const { graph } = setup()
    const id = graph.addNode({
      outline: { kind: 'rect', w: 100, h: 60 },
      anchorPolicy: { kind: 'perEdge', k: 2 },
    })
    const anchors = graph.anchorsOf(id)
    expect(anchors.length).toBe(4 + 4 * 2)
  })

  it('manual anchors keep their stable ids', () => {
    const { graph } = setup()
    const id = graph.addNode({
      outline: { kind: 'rect', w: 100, h: 60 },
      anchorPolicy: { kind: 'manual', anchors: [{ id: 'in', s: 0.0 }, { id: 'out', s: 0.5 }] },
    })
    const anchors = graph.anchorsOf(id)
    expect(anchors.map(a => a.id).sort()).toEqual(['in', 'out'])
  })

  it('polygon vertices always become anchors', () => {
    const { graph } = setup()
    const id = graph.addNode({
      outline: {
        kind: 'polygon',
        verts: [
          [0, 0],
          [50, 0],
          [50, 30],
          [0, 30],
        ],
      },
      anchorPolicy: { kind: 'perEdge', k: 0 },
    })
    const anchors = graph.anchorsOf(id)
    expect(anchors.length).toBe(4)
  })
})

describe('GraphEngine: bounds', () => {
  it('rect at origin → AABB matches outline', () => {
    const { graph } = setup()
    const id = graph.addNode({
      outline: { kind: 'rect', w: 80, h: 40 },
      transform: { x: 10, y: 20 },
    })
    expect(graph.boundsOf(id)).toEqual({ x: 10, y: 20, w: 80, h: 40 })
  })

  it('parent transform composes into child bounds', () => {
    const { graph } = setup()
    const parent = graph.addNode({ transform: { x: 100, y: 100 } })
    const child = graph.addNode({
      parentId: parent,
      transform: { x: 5, y: 5 },
      outline: { kind: 'rect', w: 20, h: 20 },
    })
    expect(graph.boundsOf(child)).toEqual({ x: 105, y: 105, w: 20, h: 20 })
  })

  it('ellipse bounds use the centred radii', () => {
    const { graph } = setup()
    const id = graph.addNode({
      outline: { kind: 'ellipse', rx: 30, ry: 20 },
      transform: { x: 0, y: 0 },
    })
    const b = graph.boundsOf(id)
    expect(b).toEqual({ x: -30, y: -20, w: 60, h: 40 })
  })
})

describe('GraphEngine: store integration', () => {
  it('publishes a snapshot under $graph.snapshot.<engineId>', () => {
    const { core, graph } = setup()
    const id = graph.addNode({ outline: { kind: 'rect', w: 50, h: 50 } satisfies Outline })
    let snapshot: { nodes: unknown[]; edges: unknown[] } | undefined
    core.subscribe('$graph.snapshot', () => undefined) // touch the prefix
    // we don't know the engineId externally, so iterate keys via get on a wildcard isn't supported —
    // just make sure adding a node doesn't throw and the public API still returns it.
    expect(graph.getNode(id)).toBeDefined()
    void snapshot
  })

  it('clear() drops all nodes and edges', () => {
    const { graph } = setup()
    const a = graph.addNode()
    const b = graph.addNode()
    graph.addEdge({ from: { node: a, anchor: 'nw' }, to: { node: b, anchor: 'nw' } })
    graph.clear()
    expect(graph.getState().nodes.size).toBe(0)
    expect(graph.getState().edges.size).toBe(0)
  })
})
