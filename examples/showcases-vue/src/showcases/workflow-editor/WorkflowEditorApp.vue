<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import {
  SgDiagram,
  SgButton,
  SgInput,
  SgSelect,
  SgSegmented,
  SgTag,
  SgModal,
  SgPopconfirm,
  SgEmpty,
  SgNotificationContainer,
  notification,
  useGraph,
  type DiagramSelectionMode,
  type DiagramNodeAction,
  type DiagramEdgeAction,
} from '@skygraph/vue'
import type { GraphNode, NodeId } from '@skygraph/core'
import { seedNodes, seedEdges, NODE_SHAPE, NODE_PALETTE } from './data'
import type { NodeKind } from './data'
import { useAppLocale } from '../_shared'

type Routing = 'straight' | 'orthogonal'

interface NodeData {
  kind: NodeKind
  label: string
}

function nodeKindOf(node: GraphNode): NodeKind {
  return (node.data as NodeData | undefined)?.kind ?? 'task'
}

function nodeLabelOf(node: GraphNode): string {
  return (node.data as NodeData | undefined)?.label ?? String(node.id)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function outlineFor(kind: NodeKind): any {
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

const l = useAppLocale('workflowEditor')
const { graph, state } = useGraph()

const initialised = ref(false)
const selected = ref<NodeId | null>(null)
const selection = ref<NodeId[]>([])
const selectionMode = ref<DiagramSelectionMode>('lasso')
const routing = ref<Routing>('orthogonal')
const draggable = ref(true)
const labelDraft = ref('')

const addOpen = ref(false)
const edgeOpen = ref(false)
const addLabel = ref('')
const addKind = ref<NodeKind>('task')
const edgeFrom = ref<string>('')
const edgeTo = ref<string>('')
const edgeLabel = ref('')

onMounted(() => {
  if (initialised.value) return
  initialised.value = true
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
})

watch(routing, (next) => {
  const snapshot = graph.getState()
  snapshot.edges.forEach((edge) => {
    if (edge.routing === next) return
    graph.removeEdge(edge.id)
    graph.addEdge({
      id: edge.id,
      from: edge.from,
      to: edge.to,
      routing: next,
      data: edge.data,
    })
  })
})

const nodes = computed(() => Array.from(state.value.nodes.values()))
const edges = computed(() => Array.from(state.value.edges.values()))

const selectedNode = computed(() =>
  selected.value ? (state.value.nodes.get(selected.value) ?? null) : null,
)

const nodeOptions = computed(() =>
  nodes.value.map((n) => ({ label: nodeLabelOf(n), value: String(n.id) })),
)

const outgoingCount = computed(() =>
  selectedNode.value ? edges.value.filter((e) => e.from.node === selectedNode.value!.id).length : 0,
)
const incomingCount = computed(() =>
  selectedNode.value ? edges.value.filter((e) => e.to.node === selectedNode.value!.id).length : 0,
)

function handleSelect(id: NodeId) {
  selected.value = id
  const n = state.value.nodes.get(id)
  if (n) labelDraft.value = nodeLabelOf(n)
}

function handleRename() {
  if (!selectedNode.value) return
  const data = (selectedNode.value.data as NodeData) ?? { kind: 'task', label: '' }
  graph.updateNode(selectedNode.value.id, {
    data: { ...data, label: labelDraft.value } satisfies NodeData,
  })
  notification.success(l.toasts.renamed(labelDraft.value))
}

function handleDelete() {
  if (!selected.value) return
  graph.removeNode(selected.value)
  notification.info(l.toasts.deletedNode(String(selected.value)))
  selected.value = null
}

function handleAddNode() {
  const label = addLabel.value.trim() || 'New node'
  const id = `node-${Date.now().toString(36).slice(-5)}`
  graph.addNode({
    id,
    transform: { x: 80, y: 320 },
    outline: outlineFor(addKind.value),
    data: { kind: addKind.value, label } satisfies NodeData,
  })
  notification.success(l.toasts.addedNode(label))
  addOpen.value = false
  addLabel.value = ''
  addKind.value = 'task'
  selected.value = id
}

function handleAddEdge() {
  if (!edgeFrom.value || !edgeTo.value) {
    notification.error(l.toasts.pickEnds)
    return
  }
  if (edgeFrom.value === edgeTo.value) {
    notification.error(l.toasts.differentEnds)
    return
  }
  graph.addEdge({
    from: { node: edgeFrom.value, anchor: { s: 0.25 } },
    to: { node: edgeTo.value, anchor: { s: 0.75 } },
    routing: routing.value,
    data: edgeLabel.value ? { label: edgeLabel.value } : undefined,
  })
  notification.success(l.toasts.connected(edgeFrom.value, edgeTo.value))
  edgeOpen.value = false
  edgeFrom.value = ''
  edgeTo.value = ''
  edgeLabel.value = ''
}

function handleReset() {
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
      routing: routing.value,
      data: e.label ? { label: e.label } : undefined,
    })
  }
  selected.value = null
  notification.info(l.toasts.reset)
}

function handleBulkDelete() {
  if (selection.value.length === 0) return
  for (const id of selection.value) graph.removeNode(id)
  notification.warning(l.toasts.bulkRemoved(selection.value.length))
  selection.value = []
  selected.value = null
}

function handlePaletteClick(kind: NodeKind) {
  const id = `${kind}-${Date.now().toString(36).slice(-5)}`
  graph.addNode({
    id,
    transform: { x: 80 + Math.random() * 80, y: 340 + Math.random() * 80 },
    outline: outlineFor(kind),
    data: { kind, label: l.kindLabel[kind] } satisfies NodeData,
  })
  selected.value = id
  labelDraft.value = l.kindLabel[kind]
}

function handleDropNode(point: { x: number; y: number; dataTransfer: DataTransfer | null }) {
  const raw = point.dataTransfer?.getData('application/x-sg-node')
  if (!raw) return
  let kind: NodeKind = 'task'
  try {
    const payload = JSON.parse(raw) as { kind?: NodeKind }
    if (payload?.kind) kind = payload.kind
  } catch {
    /* unknown payload */
  }
  const id = `${kind}-${Date.now().toString(36).slice(-5)}`
  const shape = NODE_SHAPE[kind]
  graph.addNode({
    id,
    transform: { x: point.x - shape.w / 2, y: point.y - shape.h / 2 },
    outline: outlineFor(kind),
    data: { kind, label: l.kindLabel[kind] } satisfies NodeData,
  })
  selected.value = id
  labelDraft.value = l.kindLabel[kind]
  notification.success(l.toasts.addedNode(l.kindLabel[kind]))
}

function onPaletteDragStart(e: DragEvent, kind: NodeKind) {
  if (!e.dataTransfer) return
  e.dataTransfer.setData('application/x-sg-node', JSON.stringify({ kind }))
  e.dataTransfer.effectAllowed = 'copy'
}

const nodeActions = computed<DiagramNodeAction[]>(() => [
  {
    id: 'rename',
    label: l.nodeActions.rename,
    icon: '✎',
    onClick: (node: GraphNode) => handleSelect(node.id),
  },
  {
    id: 'duplicate',
    label: l.nodeActions.duplicate,
    icon: '⎘',
    onClick: (node: GraphNode) => {
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
    onClick: (node: GraphNode) => {
      graph.removeNode(node.id)
      notification.info(l.toasts.deletedNode(String(node.id)))
      if (selected.value === node.id) selected.value = null
    },
  },
])

const edgeActions = computed<DiagramEdgeAction[]>(() => [
  {
    id: 'remove-edge',
    label: l.edgeActions.remove,
    icon: '✕',
    onClick: (edge) => {
      graph.removeEdge(edge.id)
      notification.info(l.toasts.removedEdge(String(edge.id)))
    },
  },
])

const kindColor: Record<NodeKind, 'success' | 'processing' | 'warning' | 'error'> = {
  start: 'success',
  task: 'processing',
  decision: 'warning',
  end: 'error',
}

const kindOptions = computed(() =>
  NODE_PALETTE.map((p) => ({ label: l.kindLabel[p.kind], value: p.kind })),
)
</script>

<template>
  <div class="we-shell">
    <SgNotificationContainer />

    <aside class="we-palette">
      <h4 class="we-palette-title">{{ l.paletteTitle }}</h4>
      <p class="we-palette-hint">{{ l.paletteHint }}</p>
      <button
        v-for="p of NODE_PALETTE"
        :key="p.kind"
        class="we-palette-item"
        draggable="true"
        @dragstart="(e) => onPaletteDragStart(e, p.kind)"
        @click="handlePaletteClick(p.kind)"
      >
        <span class="we-palette-icon">{{ p.emoji }}</span>
        <span>{{ l.kindLabel[p.kind] }}</span>
      </button>

      <h4 class="we-palette-title" style="margin-top: 20px">{{ l.statsTitle }}</h4>
      <div class="we-stats">
        <div>
          <strong>{{ nodes.length }}</strong> {{ l.nodesLabel }}
        </div>
        <div>
          <strong>{{ edges.length }}</strong> {{ l.edgesLabel }}
        </div>
      </div>
    </aside>

    <section class="we-canvas-shell">
      <div class="sc-toolbar">
        <SgSegmented
          :value="routing"
          :options="[
            { label: l.routing.straight, value: 'straight' },
            { label: l.routing.orthogonal, value: 'orthogonal' },
          ]"
          @change="(v: string | number) => (routing = String(v) as Routing)"
        />
        <SgSegmented
          :value="selectionMode"
          :options="[
            { label: l.selection.single, value: 'single' },
            { label: l.selection.multi, value: 'multi' },
            { label: l.selection.lasso, value: 'lasso' },
          ]"
          @change="(v: string | number) => (selectionMode = String(v) as DiagramSelectionMode)"
        />
        <div class="sc-toolbar-spacer" />
        <template v-if="selection.length > 0">
          <SgTag color="processing">{{ l.selectedTag(selection.length) }}</SgTag>
          <SgPopconfirm
            :title="l.deleteSelectedConfirm(selection.length)"
            @confirm="handleBulkDelete"
          >
            <SgButton size="small">{{ l.deleteSelected }}</SgButton>
          </SgPopconfirm>
        </template>
        <SgButton size="small" @click="draggable = !draggable">
          {{ draggable ? l.lockLayout : l.unlockLayout }}
        </SgButton>
        <SgButton size="small" @click="edgeOpen = true">{{ l.addEdge }}</SgButton>
        <SgButton size="small" type="primary" @click="addOpen = true">{{ l.addNode }}</SgButton>
        <SgPopconfirm :title="l.resetConfirm" @confirm="handleReset">
          <SgButton size="small">{{ l.resetTemplate }}</SgButton>
        </SgPopconfirm>
      </div>

      <div class="we-canvas">
        <SgDiagram
          :graph="graph"
          :state="state"
          width="100%"
          :height="560"
          :draggable="draggable"
          :selection-mode="selectionMode"
          :selection="selection"
          @selection-change="(ids) => (selection = [...ids])"
          :node-actions="nodeActions"
          :edge-actions="edgeActions"
          route-around-nodes
          :routing-options="{ gridSize: 10, inflate: 8 }"
          @drop-node="handleDropNode"
        >
          <template #node="{ node }">
            <button
              type="button"
              :class="[
                'we-node',
                `we-node-${nodeKindOf(node)}`,
                selected === node.id ? 'we-node-active' : '',
                selection.includes(node.id) ? 'we-node-multi' : '',
              ]"
              @click.stop="handleSelect(node.id)"
              @mousedown.stop
            >
              <span class="we-node-label">{{ nodeLabelOf(node) }}</span>
            </button>
          </template>
        </SgDiagram>
      </div>
    </section>

    <aside class="we-inspector">
      <h4 class="we-palette-title">{{ l.inspector.title }}</h4>
      <SgEmpty v-if="!selectedNode" :description="l.inspector.selectNode" />
      <template v-else>
        <div class="we-inspector-row">
          <span class="we-inspector-label">{{ l.inspector.id }}</span>
          <code>{{ String(selectedNode.id) }}</code>
        </div>
        <div class="we-inspector-row">
          <span class="we-inspector-label">{{ l.inspector.kind }}</span>
          <SgTag :color="kindColor[nodeKindOf(selectedNode)]">
            {{ l.kindLabel[nodeKindOf(selectedNode)] }}
          </SgTag>
        </div>
        <div class="we-inspector-row">
          <span class="we-inspector-label">{{ l.inspector.position }}</span>
          <code>
            ({{ Math.round(selectedNode.transform.x) }}, {{ Math.round(selectedNode.transform.y) }})
          </code>
        </div>
        <div class="we-inspector-row">
          <span class="we-inspector-label">{{ l.inspector.outgoing }}</span>
          <code>{{ outgoingCount }}</code>
        </div>
        <div class="we-inspector-row">
          <span class="we-inspector-label">{{ l.inspector.incoming }}</span>
          <code>{{ incomingCount }}</code>
        </div>

        <div class="we-inspector-section">
          <label class="we-inspector-label">{{ l.inspector.label }}</label>
          <SgInput :value="labelDraft" @update:value="labelDraft = $event" />
          <SgButton size="small" type="primary" style="margin-top: 8px" @click="handleRename">
            {{ l.inspector.apply }}
          </SgButton>
        </div>

        <div class="we-inspector-section">
          <SgPopconfirm
            :title="l.inspector.deleteConfirm(nodeLabelOf(selectedNode))"
            @confirm="handleDelete"
          >
            <SgButton size="small" style="width: 100%; color: var(--sg-color-error, #d4380d)">
              {{ l.inspector.delete }}
            </SgButton>
          </SgPopconfirm>
        </div>
      </template>
    </aside>

    <SgModal
      :open="addOpen"
      :title="l.modals.addTitle"
      :width="420"
      footer="none"
      @close="addOpen = false"
    >
      <div class="we-form">
        <label class="we-form-row">
          <span class="we-form-label">{{ l.modals.labelField }}</span>
          <SgInput
            :value="addLabel"
            :placeholder="l.modals.labelPlaceholder"
            @update:value="addLabel = $event"
          />
        </label>
        <label class="we-form-row">
          <span class="we-form-label">{{ l.modals.kindField }}</span>
          <SgSelect
            :value="addKind"
            :options="kindOptions"
            @change="(v) => (addKind = String(v) as NodeKind)"
          />
        </label>
        <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px">
          <SgButton @click="addOpen = false">{{ l.modals.cancel }}</SgButton>
          <SgButton type="primary" @click="handleAddNode">{{ l.modals.add }}</SgButton>
        </div>
      </div>
    </SgModal>

    <SgModal
      :open="edgeOpen"
      :title="l.modals.edgeTitle"
      :width="420"
      footer="none"
      @close="edgeOpen = false"
    >
      <div class="we-form">
        <label class="we-form-row">
          <span class="we-form-label">{{ l.modals.fromField }}</span>
          <SgSelect
            :value="edgeFrom"
            :options="nodeOptions"
            :placeholder="l.modals.fromPlaceholder"
            @change="(v) => (edgeFrom = String(v))"
          />
        </label>
        <label class="we-form-row">
          <span class="we-form-label">{{ l.modals.toField }}</span>
          <SgSelect
            :value="edgeTo"
            :options="nodeOptions"
            :placeholder="l.modals.toPlaceholder"
            @change="(v) => (edgeTo = String(v))"
          />
        </label>
        <label class="we-form-row">
          <span class="we-form-label">{{ l.modals.edgeLabel }}</span>
          <SgInput
            :value="edgeLabel"
            :placeholder="l.modals.edgeLabelPlaceholder"
            @update:value="edgeLabel = $event"
          />
        </label>
        <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px">
          <SgButton @click="edgeOpen = false">{{ l.modals.cancel }}</SgButton>
          <SgButton type="primary" @click="handleAddEdge">{{ l.modals.connect }}</SgButton>
        </div>
      </div>
    </SgModal>
  </div>
</template>
