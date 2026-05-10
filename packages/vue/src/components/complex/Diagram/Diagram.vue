<script setup lang="ts">
import { computed, ref } from 'vue'
import type { GraphNode, NodeId } from '@skygraph/core'
import { printElement } from '../../../utils/print'
import type { PrintOptions } from '../../../utils/print'
import type { DiagramProps } from './types'

const props = withDefaults(defineProps<DiagramProps>(), {
  width: '100%',
  height: 400,
  unstyled: false,
  draggableNodes: true,
  panZoom: true,
  selectionMode: 'single',
  fileName: 'diagram',
})

const emit = defineEmits<{
  (e: 'node-click', payload: { id: NodeId; node: GraphNode; event: MouseEvent }): void
  (e: 'selection-change', ids: NodeId[]): void
}>()

defineSlots<{
  node(props: { node: GraphNode }): unknown
}>()

const rootRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLDivElement | null>(null)

const internalSelected = ref<Set<NodeId>>(new Set())
const selectedSet = computed(() => {
  if (props.selectedNodeIds) return new Set(props.selectedNodeIds)
  return internalSelected.value
})

const viewport = ref({ x: 0, y: 0, zoom: 1 })

const nodes = computed<GraphNode[]>(() => Array.from(props.state.nodes.values()))
const edges = computed(() => Array.from(props.state.edges.values()))

const nodeById = (id: NodeId): GraphNode | undefined => props.state.nodes.get(id)

let dragState: { type: 'node' | 'pan'; id?: NodeId; offsetX: number; offsetY: number } | null = null

const onNodePointerDown = (e: PointerEvent, node: GraphNode) => {
  if (!props.draggableNodes) return
  e.stopPropagation()
  ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  dragState = {
    type: 'node',
    id: node.id,
    offsetX: e.clientX - node.transform.x * viewport.value.zoom - viewport.value.x,
    offsetY: e.clientY - node.transform.y * viewport.value.zoom - viewport.value.y,
  }
}

const onCanvasPointerDown = (e: PointerEvent) => {
  if (!props.panZoom) return
  if ((e.target as HTMLElement).closest('[data-node-id]')) return
  ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  dragState = {
    type: 'pan',
    offsetX: e.clientX - viewport.value.x,
    offsetY: e.clientY - viewport.value.y,
  }
}

const onPointerMove = (e: PointerEvent) => {
  const ds = dragState
  if (!ds) return
  if (ds.type === 'node' && ds.id !== undefined) {
    const node = nodeById(ds.id)
    if (!node) return
    const newX = (e.clientX - viewport.value.x - ds.offsetX) / viewport.value.zoom
    const newY = (e.clientY - viewport.value.y - ds.offsetY) / viewport.value.zoom
    props.graph.moveNode(ds.id, newX, newY)
  } else if (ds.type === 'pan') {
    viewport.value = {
      ...viewport.value,
      x: e.clientX - ds.offsetX,
      y: e.clientY - ds.offsetY,
    }
  }
}

const onPointerUp = (e: PointerEvent) => {
  ;(e.target as HTMLElement).releasePointerCapture?.(e.pointerId)
  dragState = null
}

const onWheel = (e: WheelEvent) => {
  if (!props.panZoom) return
  e.preventDefault()
  const factor = e.deltaY < 0 ? 1.1 : 0.9
  const next = Math.max(0.1, Math.min(4, viewport.value.zoom * factor))
  viewport.value = { ...viewport.value, zoom: next }
}

const onNodeClick = (e: MouseEvent, node: GraphNode) => {
  e.stopPropagation()
  emit('node-click', { id: node.id, node, event: e })

  let next: Set<NodeId>
  if (props.selectionMode === 'multi' && (e.ctrlKey || e.metaKey || e.shiftKey)) {
    next = new Set(selectedSet.value)
    if (next.has(node.id)) next.delete(node.id)
    else next.add(node.id)
  } else {
    next = new Set([node.id])
  }
  internalSelected.value = next
  emit('selection-change', Array.from(next))
}

const onCanvasClick = (e: MouseEvent) => {
  if ((e.target as HTMLElement).closest('[data-node-id]')) return
  internalSelected.value = new Set()
  emit('selection-change', [])
}

const transform = computed(
  () => `translate(${viewport.value.x}px, ${viewport.value.y}px) scale(${viewport.value.zoom})`,
)

const nodeSize = (node: GraphNode): { width: number; height: number } => {
  const o = node.outline
  switch (o.kind) {
    case 'rect':
      return { width: o.w, height: o.h }
    case 'ellipse':
      return { width: o.rx * 2, height: o.ry * 2 }
    case 'polygon':
    case 'path': {
      const pts = o.kind === 'polygon' ? o.verts : o.flatten
      let minX = Infinity
      let minY = Infinity
      let maxX = -Infinity
      let maxY = -Infinity
      for (const p of pts) {
        const [px, py] = p as readonly [number, number]
        if (px < minX) minX = px
        if (py < minY) minY = py
        if (px > maxX) maxX = px
        if (py > maxY) maxY = py
      }
      return { width: Math.max(0, maxX - minX), height: Math.max(0, maxY - minY) }
    }
  }
}

const edgePaths = computed(
  () =>
    edges.value
      .map((edge) => {
        const from = nodeById(edge.from.node)
        const to = nodeById(edge.to.node)
        if (!from || !to) return null
        const fs = nodeSize(from)
        const ts = nodeSize(to)
        const fx = from.transform.x + fs.width / 2
        const fy = from.transform.y + fs.height / 2
        const tx = to.transform.x + ts.width / 2
        const ty = to.transform.y + ts.height / 2
        return { id: edge.id, d: `M${fx},${fy} L${tx},${ty}` }
      })
      .filter(Boolean) as { id: string; d: string }[],
)

/**
 * Imperative API surface — kept 1:1 with React's `DiagramRef` (see
 * `packages/react/src/components/complex/Diagram/Diagram.tsx`). Selection is
 * managed through the `selectedNodeIds` prop + `selection-change` event;
 * dedicated `getSelectedIds` / `setSelectedIds` methods would be a Vue-only
 * extension and were removed in T-Vue-Misc — see
 * `docs/_streams/decisions/T-Vue-Misc.md` D1.
 */
defineExpose({
  print: (opts?: PrintOptions) => {
    if (!rootRef.value) return
    printElement(rootRef.value, {
      ...opts,
      fileName: opts?.fileName ?? props.fileName ?? 'diagram',
    })
  },
})
</script>

<template>
  <div
    ref="rootRef"
    :class="[!props.unstyled && 'sg-diagram', props.className]"
    :style="{
      width: typeof props.width === 'number' ? `${props.width}px` : props.width,
      height: typeof props.height === 'number' ? `${props.height}px` : props.height,
      position: 'relative',
      overflow: 'hidden',
      ...(props.style ?? {}),
    }"
    role="application"
    aria-label="Diagram"
  >
    <div
      ref="canvasRef"
      class="sg-diagram-canvas"
      :style="{ position: 'absolute', inset: 0, cursor: dragState ? 'grabbing' : 'default' }"
      @pointerdown="onCanvasPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @wheel="onWheel"
      @click="onCanvasClick"
    >
      <div
        class="sg-diagram-world"
        :style="{
          position: 'absolute',
          left: 0,
          top: 0,
          transformOrigin: '0 0',
          transform,
        }"
      >
        <svg
          class="sg-diagram-edges"
          :style="{
            position: 'absolute',
            left: '-5000px',
            top: '-5000px',
            width: '10000px',
            height: '10000px',
            pointerEvents: 'none',
            overflow: 'visible',
          }"
          :viewBox="`-5000 -5000 10000 10000`"
        >
          <path
            v-for="ep in edgePaths"
            :key="ep.id"
            :d="ep.d"
            stroke="currentColor"
            stroke-width="1"
            fill="none"
            :data-edge-id="ep.id"
          />
        </svg>
        <div
          v-for="node in nodes"
          :key="node.id"
          :data-node-id="node.id"
          :class="[
            !props.unstyled && 'sg-diagram-node',
            selectedSet.has(node.id) && 'sg-diagram-node--selected',
          ]"
          :style="{
            position: 'absolute',
            left: `${node.transform.x}px`,
            top: `${node.transform.y}px`,
            width: `${nodeSize(node).width}px`,
            height: `${nodeSize(node).height}px`,
            cursor: props.draggableNodes ? 'move' : 'default',
            border: selectedSet.has(node.id)
              ? '2px solid var(--sg-color-primary, #1677ff)'
              : '1px solid #ccc',
            background: '#fff',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }"
          @pointerdown="(e) => onNodePointerDown(e, node)"
          @click="(e) => onNodeClick(e, node)"
        >
          <slot name="node" :node="node">{{ node.id }}</slot>
        </div>
      </div>
    </div>
  </div>
</template>
