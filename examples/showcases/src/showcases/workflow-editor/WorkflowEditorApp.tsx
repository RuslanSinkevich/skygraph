import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import type { DiagramSelectionMode, DiagramNodeAction, DiagramEdgeAction } from '@skygraph/react'
import type { GraphNode, NodeId, Outline } from '@skygraph/core'
import { seedNodes, seedEdges, NODE_SHAPE, NODE_PALETTE } from './data'
import type { NodeKind } from './data'
import { useAppLocale } from '../_shared'
import type { ShowcasesLocale } from '@skygraph-examples/shared'

type WeLocale = ShowcasesLocale['apps']['workflowEditor']
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

interface CtxItem {
  key: string
  label: string
  danger?: boolean
}

function DiagramContextMenu({
  x,
  y,
  items,
  onSelect,
  onClose,
}: {
  x: number
  y: number
  items: CtxItem[]
  onSelect: (key: string) => void
  onClose: () => void
}) {
  useEffect(() => {
    const close = () => onClose()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('mousedown', close)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('mousedown', close)
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])
  return (
    <div
      className="we-ctxmenu"
      style={{ position: 'fixed', left: x, top: y }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {items.map((it) => (
        <button
          key={it.key}
          type="button"
          className={`we-ctxmenu-item${it.danger ? ' we-ctxmenu-item-danger' : ''}`}
          onClick={() => onSelect(it.key)}
        >
          {it.label}
        </button>
      ))}
    </div>
  )
}

function NodeBadge({ kind, l }: { kind: NodeKind; l: WeLocale }) {
  const colorMap: Record<NodeKind, 'success' | 'processing' | 'warning' | 'error'> = {
    start: 'success',
    task: 'processing',
    decision: 'warning',
    end: 'error',
  }
  return <Tag color={colorMap[kind]}>{l.kindLabel[kind]}</Tag>
}

interface ContextMenuState {
  open: boolean
  x: number
  y: number
  /** When set — context comes from a click on a specific node. */
  nodeId?: NodeId
}

export function WorkflowEditorApp() {
  const l = useAppLocale('workflowEditor')
  const { graph, state } = useGraph()
  const initialised = useRef(false)
  const [selected, setSelected] = useState<NodeId | null>(null)
  const [selection, setSelection] = useState<NodeId[]>([])
  const [selectionMode, setSelectionMode] = useState<DiagramSelectionMode>('lasso')
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
  const [menu, setMenu] = useState<ContextMenuState>({ open: false, x: 0, y: 0 })

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

  const selectedNode = selected ? (state.nodes.get(selected) ?? null) : null

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
    notification.success(l.toasts.renamed(labelDraft))
  }

  function handleDelete() {
    if (!selected) return
    graph.removeNode(selected)
    notification.info(l.toasts.deletedNode(String(selected)))
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
    notification.success(l.toasts.addedNode(label))
    setAddOpen(false)
    setAddLabel('')
    setAddKind('task')
    setSelected(id)
  }

  function handleAddEdge() {
    if (!edgeFrom || !edgeTo) {
      notification.error(l.toasts.pickEnds)
      return
    }
    if (edgeFrom === edgeTo) {
      notification.error(l.toasts.differentEnds)
      return
    }
    graph.addEdge({
      from: { node: edgeFrom, anchor: { s: 0.25 } },
      to: { node: edgeTo, anchor: { s: 0.75 } },
      routing,
      data: edgeLabel ? { label: edgeLabel } : undefined,
    })
    notification.success(l.toasts.connected(edgeFrom, edgeTo))
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
    notification.info(l.toasts.reset)
  }

  const nodeOptions = nodes.map((n) => ({ label: nodeLabelOf(n), value: String(n.id) }))

  const nodeActions: DiagramNodeAction[] = useMemo(
    () => [
      {
        id: 'rename',
        label: l.nodeActions.rename,
        icon: '✎',
        onClick: (node) => {
          handleSelect(node.id)
        },
      },
      {
        id: 'duplicate',
        label: l.nodeActions.duplicate,
        icon: '⎘',
        onClick: (node) => {
          const data = (node.data as NodeData) ?? { kind: 'task', label: 'New' }
          const id = `${data.kind}-${Date.now().toString(36).slice(-5)}`
          graph.addNode({
            id,
            transform: { x: node.transform.x + 32, y: node.transform.y + 32 },
            outline: outlineFor(data.kind),
            data: { kind: data.kind, label: `${data.label} copy` } satisfies NodeData,
          })
          notification.success(l.toasts.duplicated(data.label))
        },
      },
      {
        id: 'delete',
        label: l.nodeActions.delete,
        icon: '✕',
        onClick: (node) => {
          graph.removeNode(node.id)
          notification.info(l.toasts.deletedNode(String(node.id)))
          if (selected === node.id) setSelected(null)
        },
      },
    ],
    [graph, selected, l],
  )

  const edgeActions: DiagramEdgeAction[] = useMemo(
    () => [
      {
        id: 'remove-edge',
        label: l.edgeActions.remove,
        icon: '✕',
        onClick: (edge) => {
          graph.removeEdge(edge.id)
          notification.info(l.toasts.removedEdge(String(edge.id)))
        },
      },
    ],
    [graph, l],
  )

  const closeMenu = useCallback(() => setMenu((m) => ({ ...m, open: false })), [])
  const handleBulkDelete = useCallback(() => {
    if (selection.length === 0) return
    for (const id of selection) graph.removeNode(id)
    notification.warning(l.toasts.bulkRemoved(selection.length))
    setSelection([])
    setSelected(null)
  }, [graph, selection, l])

  return (
    <div className="we-shell">
      <NotificationContainer />

      <aside className="we-palette">
        <h4 className="we-palette-title">{l.paletteTitle}</h4>
        <p className="we-palette-hint">{l.paletteHint}</p>
        {NODE_PALETTE.map((p) => (
          <button
            key={p.kind}
            className="we-palette-item"
            draggable
            onDragStart={(e) => {
              // Encode the template as JSON on the standard
              // `application/x-sg-node` MIME — see Diagram's `dropTypes`.
              e.dataTransfer.setData('application/x-sg-node', JSON.stringify({ kind: p.kind }))
              e.dataTransfer.effectAllowed = 'copy'
            }}
            onClick={() => {
              // Click fallback — same code path as drop, just with a
              // default position so people who only click still get a node.
              const id = `${p.kind}-${Date.now().toString(36).slice(-5)}`
              graph.addNode({
                id,
                transform: { x: 80 + Math.random() * 80, y: 340 + Math.random() * 80 },
                outline: outlineFor(p.kind),
                data: { kind: p.kind, label: l.kindLabel[p.kind] } satisfies NodeData,
              })
              setSelected(id)
              setLabelDraft(l.kindLabel[p.kind])
            }}
          >
            <span className="we-palette-icon">{p.emoji}</span>
            <span>{l.kindLabel[p.kind]}</span>
          </button>
        ))}

        <h4 className="we-palette-title" style={{ marginTop: 20 }}>
          {l.statsTitle}
        </h4>
        <div className="we-stats">
          <div>
            <strong>{nodes.length}</strong> {l.nodesLabel}
          </div>
          <div>
            <strong>{edges.length}</strong> {l.edgesLabel}
          </div>
        </div>
      </aside>

      <section className="we-canvas-shell">
        <div className="sc-toolbar">
          <Segmented
            value={routing}
            onChange={(v) => setRouting(v as Routing)}
            options={[
              { label: l.routing.straight, value: 'straight' },
              { label: l.routing.orthogonal, value: 'orthogonal' },
            ]}
          />
          <Segmented
            value={selectionMode}
            onChange={(v) => setSelectionMode(v as DiagramSelectionMode)}
            options={[
              { label: l.selection.single, value: 'single' },
              { label: l.selection.multi, value: 'multi' },
              { label: l.selection.lasso, value: 'lasso' },
            ]}
          />
          <div className="sc-toolbar-spacer" />
          {selection.length > 0 && (
            <>
              <Tag color="processing">{l.selectedTag(selection.length)}</Tag>
              <Popconfirm
                title={l.deleteSelectedConfirm(selection.length)}
                onConfirm={handleBulkDelete}
              >
                <Button size="small">{l.deleteSelected}</Button>
              </Popconfirm>
            </>
          )}
          <Button size="small" onClick={() => setDraggable(!draggable)}>
            {draggable ? l.lockLayout : l.unlockLayout}
          </Button>
          <Button size="small" onClick={() => setEdgeOpen(true)}>
            {l.addEdge}
          </Button>
          <Button size="small" type="primary" onClick={() => setAddOpen(true)}>
            {l.addNode}
          </Button>
          <Popconfirm title={l.resetConfirm} onConfirm={handleReset}>
            <Button size="small">{l.resetTemplate}</Button>
          </Popconfirm>
        </div>

        <div className="we-canvas">
          <Diagram
            graph={graph}
            state={state}
            width="100%"
            height={560}
            draggable={draggable}
            selectionMode={selectionMode}
            selection={selection}
            onSelectionChange={setSelection}
            nodeActions={nodeActions}
            edgeActions={edgeActions}
            routeAroundNodes
            routingOptions={{ gridSize: 10, inflate: 8 }}
            onDropNode={({ x, y, dataTransfer }) => {
              const raw = dataTransfer?.getData('application/x-sg-node')
              if (!raw) return
              let kind: NodeKind = 'task'
              try {
                const payload = JSON.parse(raw) as { kind?: NodeKind }
                if (payload?.kind) kind = payload.kind
              } catch {
                // unknown payload — fall through with default kind
              }
              const id = `${kind}-${Date.now().toString(36).slice(-5)}`
              const shape = NODE_SHAPE[kind]
              // Drop coordinates are in world space (already pan/zoom
              // adjusted). Centre the node on the cursor so the drop
              // feels precise.
              graph.addNode({
                id,
                transform: { x: x - shape.w / 2, y: y - shape.h / 2 },
                outline: outlineFor(kind),
                data: { kind, label: l.kindLabel[kind] } satisfies NodeData,
              })
              setSelected(id)
              setLabelDraft(l.kindLabel[kind])
              notification.success(l.toasts.addedNode(l.kindLabel[kind]))
            }}
            onNodeContextMenu={(e, node) => {
              e.preventDefault()
              setMenu({ open: true, x: e.clientX, y: e.clientY, nodeId: node.id })
            }}
            onCanvasContextMenu={(e) => {
              e.preventDefault()
              setMenu({ open: true, x: e.clientX, y: e.clientY })
            }}
            renderNode={(node) => {
              const kind = nodeKindOf(node)
              const label = nodeLabelOf(node)
              const isActive = selected === node.id
              const inSel = selection.includes(node.id)
              return (
                <button
                  type="button"
                  className={`we-node we-node-${kind}${isActive ? ' we-node-active' : ''}${inSel ? ' we-node-multi' : ''}`}
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
          {menu.open && (
            <DiagramContextMenu
              x={menu.x}
              y={menu.y}
              onClose={closeMenu}
              items={
                menu.nodeId
                  ? [
                      { key: 'rename', label: `✎ ${l.contextMenu.rename}` },
                      { key: 'duplicate', label: `⎘ ${l.contextMenu.duplicate}` },
                      { key: 'delete', label: `✕ ${l.contextMenu.delete}`, danger: true },
                    ]
                  : [
                      { key: 'add-node', label: `+ ${l.contextMenu.addNode}` },
                      { key: 'add-edge', label: `+ ${l.contextMenu.addEdge}` },
                    ]
              }
              onSelect={(key) => {
                closeMenu()
                if (menu.nodeId) {
                  const node = state.nodes.get(menu.nodeId)
                  if (!node) return
                  if (key === 'rename') handleSelect(menu.nodeId)
                  else if (key === 'duplicate') {
                    const data = (node.data as NodeData) ?? { kind: 'task', label: 'New' }
                    const id = `${data.kind}-${Date.now().toString(36).slice(-5)}`
                    graph.addNode({
                      id,
                      transform: { x: node.transform.x + 32, y: node.transform.y + 32 },
                      outline: outlineFor(data.kind),
                      data: { kind: data.kind, label: `${data.label} copy` } satisfies NodeData,
                    })
                    notification.success(l.toasts.duplicated(data.label))
                  } else if (key === 'delete') {
                    graph.removeNode(menu.nodeId)
                    notification.info(l.toasts.deletedShort(String(menu.nodeId)))
                    if (selected === menu.nodeId) setSelected(null)
                  }
                } else {
                  if (key === 'add-node') setAddOpen(true)
                  if (key === 'add-edge') setEdgeOpen(true)
                }
              }}
            />
          )}
        </div>
      </section>

      <aside className="we-inspector">
        <h4 className="we-palette-title">{l.inspector.title}</h4>
        {!selectedNode ? (
          <Empty description={l.inspector.selectNode} />
        ) : (
          <>
            <div className="we-inspector-row">
              <span className="we-inspector-label">{l.inspector.id}</span>
              <code>{String(selectedNode.id)}</code>
            </div>
            <div className="we-inspector-row">
              <span className="we-inspector-label">{l.inspector.kind}</span>
              <NodeBadge kind={nodeKindOf(selectedNode)} l={l} />
            </div>
            <div className="we-inspector-row">
              <span className="we-inspector-label">{l.inspector.position}</span>
              <code>
                ({Math.round(selectedNode.transform.x)}, {Math.round(selectedNode.transform.y)})
              </code>
            </div>
            <div className="we-inspector-row">
              <span className="we-inspector-label">{l.inspector.outgoing}</span>
              <code>{edges.filter((e) => e.from.node === selectedNode.id).length}</code>
            </div>
            <div className="we-inspector-row">
              <span className="we-inspector-label">{l.inspector.incoming}</span>
              <code>{edges.filter((e) => e.to.node === selectedNode.id).length}</code>
            </div>

            <div className="we-inspector-section">
              <label className="we-inspector-label">{l.inspector.label}</label>
              <Input value={labelDraft} onChange={setLabelDraft} />
              <Button size="small" type="primary" onClick={handleRename} style={{ marginTop: 8 }}>
                {l.inspector.apply}
              </Button>
            </div>

            <div className="we-inspector-section">
              <Popconfirm
                title={l.inspector.deleteConfirm(nodeLabelOf(selectedNode))}
                onConfirm={handleDelete}
              >
                <Button
                  size="small"
                  style={{ width: '100%', color: 'var(--sg-color-error, #d4380d)' }}
                >
                  {l.inspector.delete}
                </Button>
              </Popconfirm>
            </div>
          </>
        )}
      </aside>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title={l.modals.addTitle}
        footer={null}
        width={420}
      >
        <div className="we-form">
          <label className="we-form-row">
            <span className="we-form-label">{l.modals.labelField}</span>
            <Input
              value={addLabel}
              onChange={setAddLabel}
              placeholder={l.modals.labelPlaceholder}
            />
          </label>
          <label className="we-form-row">
            <span className="we-form-label">{l.modals.kindField}</span>
            <Select
              value={addKind}
              onChange={(v) => setAddKind(v as NodeKind)}
              options={NODE_PALETTE.map((p) => ({ label: l.kindLabel[p.kind], value: p.kind }))}
            />
          </label>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
            <Button onClick={() => setAddOpen(false)}>{l.modals.cancel}</Button>
            <Button type="primary" onClick={handleAddNode}>
              {l.modals.add}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={edgeOpen}
        onClose={() => setEdgeOpen(false)}
        title={l.modals.edgeTitle}
        footer={null}
        width={420}
      >
        <div className="we-form">
          <label className="we-form-row">
            <span className="we-form-label">{l.modals.fromField}</span>
            <Select
              value={edgeFrom}
              onChange={(v) => setEdgeFrom(String(v))}
              options={nodeOptions}
              placeholder={l.modals.fromPlaceholder}
            />
          </label>
          <label className="we-form-row">
            <span className="we-form-label">{l.modals.toField}</span>
            <Select
              value={edgeTo}
              onChange={(v) => setEdgeTo(String(v))}
              options={nodeOptions}
              placeholder={l.modals.toPlaceholder}
            />
          </label>
          <label className="we-form-row">
            <span className="we-form-label">{l.modals.edgeLabel}</span>
            <Input
              value={edgeLabel}
              onChange={setEdgeLabel}
              placeholder={l.modals.edgeLabelPlaceholder}
            />
          </label>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
            <Button onClick={() => setEdgeOpen(false)}>{l.modals.cancel}</Button>
            <Button type="primary" onClick={handleAddEdge}>
              {l.modals.connect}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
