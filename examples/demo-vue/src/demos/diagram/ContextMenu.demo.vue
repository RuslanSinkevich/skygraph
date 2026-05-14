<script setup lang="ts">
/**
 * Custom context menu via the three events: `@node-context-menu`,
 * `@edge-context-menu`, `@canvas-context-menu`. Each opens a small
 * floating `<ul>` at the cursor position; selecting an item runs an
 * engine mutation (delete node / edge, add node).
 */
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { GraphEdge, GraphNode } from '@skygraph/core'
import { SgDiagram, useGraph, type DiagramCanvasContextPoint } from '@skygraph/vue'

interface MenuState {
  x: number
  y: number
  items: Array<{ label: string; onSelect: () => void }>
}

const { graph, state } = useGraph()
const menu = ref<MenuState | null>(null)

onMounted(() => {
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
})

function close() {
  menu.value = null
}

watch(menu, (m) => {
  if (!m) return
  window.addEventListener('mousedown', close)
  window.addEventListener('blur', close)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousedown', close)
  window.removeEventListener('blur', close)
})

function handleNode({ event, node }: { event: MouseEvent; node: GraphNode }) {
  menu.value = {
    x: event.clientX,
    y: event.clientY,
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
  }
}

function handleEdge({ event, edge }: { event: MouseEvent; edge: GraphEdge }) {
  menu.value = {
    x: event.clientX,
    y: event.clientY,
    items: [{ label: `Delete edge ${String(edge.id)}`, onSelect: () => graph.removeEdge(edge.id) }],
  }
}

function handleCanvas({ event, point }: { event: MouseEvent; point: DiagramCanvasContextPoint }) {
  menu.value = {
    x: event.clientX,
    y: event.clientY,
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
  }
}

function selectItem(item: { onSelect: () => void }) {
  item.onSelect()
  menu.value = null
}
</script>

<template>
  <div style="position: relative">
    <SgDiagram
      :graph="graph"
      :state="state"
      :width="640"
      :height="320"
      draggable
      @node-context-menu="handleNode"
      @edge-context-menu="handleEdge"
      @canvas-context-menu="handleCanvas"
    >
      <template #node="{ node }">
        <span style="font-weight: 600">{{ node.id }}</span>
      </template>
    </SgDiagram>
    <ul
      v-if="menu"
      role="menu"
      :style="{
        position: 'fixed',
        left: `${menu.x}px`,
        top: `${menu.y}px`,
        margin: 0,
        padding: '4px',
        listStyle: 'none',
        background: 'var(--sg-color-bg-elevated, #fff)',
        border: '1px solid var(--sg-color-border, #ccc)',
        borderRadius: '6px',
        boxShadow: '0 6px 16px rgba(0,0,0,0.18)',
        minWidth: '180px',
        zIndex: 1000,
      }"
      @mousedown.stop
    >
      <li v-for="item in menu.items" :key="item.label">
        <button
          type="button"
          :style="{
            display: 'block',
            width: '100%',
            padding: '6px 10px',
            textAlign: 'left',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
          }"
          @click="selectItem(item)"
        >
          {{ item.label }}
        </button>
      </li>
    </ul>
  </div>
</template>
