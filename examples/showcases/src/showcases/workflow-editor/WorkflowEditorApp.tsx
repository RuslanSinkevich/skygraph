import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Diagram,
  useGraph,
  Button,
  Segmented,
  Input,
  Tag,
  Modal,
  Select,
  Popconfirm,
  Empty,
  notification,
  NotificationContainer,
} from '@skygraph/react'
import type { GraphNode, NodeId, Outline } from '@skygraph/core'
import { seedNodes, seedEdges, NODE_SHAPE, NODE_PALETTE } from './data'
import type { NodeKind } from './data'

type Routing = 'straight' | 'orthogonal' | 'manual'

interface NodeData {
  kind: NodeKind
  label: string
}

function nodeKindOf(node: GraphNode): NodeKind {
  const data = node.data as NodeData | undefined
  return data?.kind ?? 'task'
}

function nodeLabelOf(node: GraphNode): string {
  const data = node.data as NodeData | undefined
  return data?.label ?? String(node.id)
}

function outlineFor(kind: NodeKind): Outline {
  const shape = NODE_SHAPE[kind]
  if (shape.outline === 'ellipse') {
    return { kind: 'ellipse', rx: shape.w / 2, ry: shape.h / 2 }
  }
  if (shape.outline === 'diamond') {
    const w = shape.w
    const h = shape.h
    return {
      kind: 'polygon',
      verts: [
        [w / 2, 0],
        [w, h / 2],
        [w / 2, h],
        [0, h / 2],
      ],
    }
  }
  return { kind: 'rect', w: shape.w, h: shape.h }
}

function NodeBadge({ kind }: { kind: NodeKind }) {
  const colorMap: Record<NodeKind, 'success' | 'processing' | 'warning' | 'error'> = {
    start: 'success',
    task: 'processing',
    decision: 'warning',
    end: 'error',
  }
  return <Tag color={colorMap[kind]}>{kind}</Tag>
}

export function WorkflowEditorApp() {
  const { graph, state } = useGraph()
  const initialised = useRef(false)
  const [selected, setSelected] = useState<NodeId | null>(null)
  const [routing, setRouting] = useState<Routing>('orthogonal')
  const [draggable, setDraggable] = useState(true)
  const [labelDraft, setLabelDraft] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [edgeOpen, setEdgeOpen] = useState(false)
  const [addLabel, setAddLabel] = useState('')
  const [addKind, setAddKind] = useState<NodeKind>('task')
  const [edgeFrom, setEdgeFrom] = useState<string>('')
  const [edgeTo, setEdgeTo] = useState<string>('')
  const [edgeLabel, setEdgeLabel] = useState('')

  // Seed the engine on mount.
  useEffect(() => {
    if (initialised.current) return
    initialised.current = true

    for (const n of seedNodes) {
      graph.addNode({
        id: n.id,
        transform: { x: n.x, y: n.y },
        outline: outlineFor(n.kind),
        data: { kind: n.kind, label: n.label } satisfies NodeData,
      })
    }

    for (const e of seedEdges) {
      graph.addEdge({
        id: e.id,
        from: { node: e.from, anchor: { s: 0.25 } },
        to: { node: e.to, anchor: { s: 0.75 } },
        routing: 'orthogonal',
        data: e.label ? { label: e.label } : undefined,
      })
    }
  }, [graph])

  // Apply routing change to ALL edges whenever the toolbar toggles.
  useEffect(() => {
    const snapshot = graph.getState()
    snapshot.edges.forEach((edge) => {
      if (edge.routing === routing) return
      graph.removeEdge(edge.id)
      graph.addEdge({
        id: edge.id,
        from: edge.from,
        to: edge.to,
        routing,
        data: edge.data,
      })
    })
  }, [routing, graph])

  const nodes = useMemo(() => Array.from(state.nodes.values()), [state])
  const edges = useMemo(() => Array.from(state.edges.values()), [state])

  const selectedNode = selected ? state.nodes.get(selected) ?? null : null

  function handleSelect(id: NodeId) {
    setSelected(id)
    const n = state.nodes.get(id)
    if (n) setLabelDraft(nodeLabelOf(n))
  }

  function handleRename() {
    if (!selectedNode) return
    const data = (selectedNode.data as NodeData) ?? { kind: 'task', label: '' }
    graph.updateNode(selectedNode.id, {
      data: { ...data, label: labelDraft } satisfies NodeData,
    })
    notification.success(`Renamed to "${labelDraft}"`)
  }

  function handleDelete() {
    if (!selected) return
    graph.removeNode(selected)
    notification.info(`Deleted node ${selected}`)
    setSelected(null)
  }

  function handleAddNode() {
    const label = addLabel.trim() || 'New node'
    const id = `node-${Date.now().toString(36).slice(-5)}`
    graph.addNode({
      id,
      transform: { x: 80, y: 320 },
      outline: outlineFor(addKind),
      data: { kind: addKind, label } satisfies NodeData,
    })
    notification.success(`Added "${label}"`)
    setAddOpen(false)
    setAddLabel('')
    setAddKind('task')
    setSelected(id)
  }

  function handleAddEdge() {
    if (!edgeFrom || !edgeTo) {
      notification.error('Pick source and target')
      return
    }
    if (edgeFrom === edgeTo) {
      notification.error('Source and target must differ')
      return
    }
    graph.addEdge({
      from: { node: edgeFrom, anchor: { s: 0.25 } },
      to: { node: edgeTo, anchor: { s: 0.75 } },
      routing,
      data: edgeLabel ? { label: edgeLabel } : undefined,
    })
    notification.success(`Connected ${edgeFrom} → ${edgeTo}`)
    setEdgeOpen(false)
    setEdgeFrom('')
    setEdgeTo('')
    setEdgeLabel('')
  }

  function handleReset() {
    // Remove everything, then re-seed.
    graph.clear()
    for (const n of seedNodes) {
      graph.addNode({
        id: n.id,
        transform: { x: n.x, y: n.y },
        outline: outlineFor(n.kind),
        data: { kind: n.kind, label: n.label } satisfies NodeData,
      })
    }
    for (const e of seedEdges) {
      graph.addEdge({
        id: e.id,
        from: { node: e.from, anchor: { s: 0.25 } },
        to: { node: e.to, anchor: { s: 0.75 } },
        routing,
        data: e.label ? { label: e.label } : undefined,
      })
    }
    setSelected(null)
    notification.info('Workflow reset to template')
  }

  const nodeOptions = nodes.map((n) => ({ label: nodeLabelOf(n), value: String(n.id) }))

  return (
    <div className="we-shell">
      <NotificationContainer />

      <aside className="we-palette">
        <h4 className="we-palette-title">Palette</h4>
        <p className="we-palette-hint">
          Click a shape to add a node, then drag it on the canvas.
        </p>
        {NODE_PALETTE.map((p) => (
          <button
            key={p.kind}
            className="we-palette-item"
            onClick={() => {
              const id = `${p.kind}-${Date.now().toString(36).slice(-5)}`
              graph.addNode({
                id,
                transform: { x: 80 + Math.random() * 80, y: 340 + Math.random() * 80 },
                outline: outlineFor(p.kind),
                data: { kind: p.kind, label: p.label } satisfies NodeData,
              })
              setSelected(id)
              setLabelDraft(p.label)
            }}
          >
            <span className="we-palette-icon">{p.emoji}</span>
            <span>{p.label}</span>
          </button>
        ))}

        <h4 className="we-palette-title" style={{ marginTop: 20 }}>Stats</h4>
        <div className="we-stats">
          <div><strong>{nodes.length}</strong> nodes</div>
          <div><strong>{edges.length}</strong> edges</div>
        </div>
      </aside>

      <section className="we-canvas-shell">
        <div className="sc-toolbar">
          <Segmented
            value={routing}
            onChange={(v) => setRouting(v as Routing)}
            options={[
              { label: 'Straight', value: 'straight' },
              { label: 'Orthogonal', value: 'orthogonal' },
            ]}
          />
          <div className="sc-toolbar-spacer" />
          <Button size="small" onClick={() => setDraggable(!draggable)}>
            {draggable ? 'Lock layout' : 'Unlock layout'}
          </Button>
          <Button size="small" onClick={() => setEdgeOpen(true)}>+ Edge</Button>
          <Button size="small" type="primary" onClick={() => setAddOpen(true)}>+ Node</Button>
          <Popconfirm title="Reset to template?" onConfirm={handleReset}>
            <Button size="small">Reset</Button>
          </Popconfirm>
        </div>

        <div className="we-canvas">
          <Diagram
            graph={graph}
            state={state}
            width="100%"
            height={560}
            draggable={draggable}
            renderNode={(node) => {
              const kind = nodeKindOf(node)
              const label = nodeLabelOf(node)
              const isActive = selected === node.id
              return (
                <button
                  type="button"
                  className={`we-node we-node-${kind}${isActive ? ' we-node-active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelect(node.id)
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <span className="we-node-label">{label}</span>
                </button>
              )
            }}
          />
        </div>
      </section>

      <aside className="we-inspector">
        <h4 className="we-palette-title">Inspector</h4>
        {!selectedNode ? (
          <Empty description="Select a node" />
        ) : (
          <>
            <div className="we-inspector-row">
              <span className="we-inspector-label">ID</span>
              <code>{String(selectedNode.id)}</code>
            </div>
            <div className="we-inspector-row">
              <span className="we-inspector-label">Kind</span>
              <NodeBadge kind={nodeKindOf(selectedNode)} />
            </div>
            <div className="we-inspector-row">
              <span className="we-inspector-label">Position</span>
              <code>
                ({Math.round(selectedNode.transform.x)}, {Math.round(selectedNode.transform.y)})
              </code>
            </div>
            <div className="we-inspector-row">
              <span className="we-inspector-label">Outgoing</span>
              <code>
                {edges.filter((e) => e.from.node === selectedNode.id).length}
              </code>
            </div>
            <div className="we-inspector-row">
              <span className="we-inspector-label">Incoming</span>
              <code>
                {edges.filter((e) => e.to.node === selectedNode.id).length}
              </code>
            </div>

            <div className="we-inspector-section">
              <label className="we-inspector-label">Label</label>
              <Input value={labelDraft} onChange={setLabelDraft} />
              <Button size="small" type="primary" onClick={handleRename} style={{ marginTop: 8 }}>
                Apply
              </Button>
            </div>

            <div className="we-inspector-section">
              <Popconfirm title={`Delete "${nodeLabelOf(selectedNode)}"?`} onConfirm={handleDelete}>
                <Button
                  size="small"
                  style={{ width: '100%', color: 'var(--sg-color-error, #d4380d)' }}
                >
                  Delete node
                </Button>
              </Popconfirm>
            </div>
          </>
        )}
      </aside>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add node"
        footer={null}
        width={420}
      >
        <div className="we-form">
          <label className="we-form-row">
            <span className="we-form-label">Label</span>
            <Input value={addLabel} onChange={setAddLabel} placeholder="Describe the step" />
          </label>
          <label className="we-form-row">
            <span className="we-form-label">Kind</span>
            <Select
              value={addKind}
              onChange={(v) => setAddKind(v as NodeKind)}
              options={NODE_PALETTE.map((p) => ({ label: p.label, value: p.kind }))}
            />
          </label>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
            <Button onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={handleAddNode}>Add</Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={edgeOpen}
        onClose={() => setEdgeOpen(false)}
        title="Connect nodes"
        footer={null}
        width={420}
      >
        <div className="we-form">
          <label className="we-form-row">
            <span className="we-form-label">From</span>
            <Select
              value={edgeFrom}
              onChange={(v) => setEdgeFrom(String(v))}
              options={nodeOptions}
              placeholder="Source node"
            />
          </label>
          <label className="we-form-row">
            <span className="we-form-label">To</span>
            <Select
              value={edgeTo}
              onChange={(v) => setEdgeTo(String(v))}
              options={nodeOptions}
              placeholder="Target node"
            />
          </label>
          <label className="we-form-row">
            <span className="we-form-label">Label</span>
            <Input value={edgeLabel} onChange={setEdgeLabel} placeholder="yes / no / ..." />
          </label>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
            <Button onClick={() => setEdgeOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={handleAddEdge}>Connect</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
