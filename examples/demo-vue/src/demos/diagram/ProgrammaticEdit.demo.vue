<script setup lang="ts">
/**
 * Programmatic graph mutation — replaces React's `onCanvasContextMenu`
 * pattern with explicit "Add" / "Delete" buttons. Vue's `SgDiagram` does
 * not expose context-menu callbacks; the underlying `GraphEngine` API is
 * the same, so any UX surface (buttons, palette, hot-keys) can drive it.
 *
 * See `findings/T-Vue-Demo-Complex.md` → `diagram-no-context-menu`.
 */
import { onMounted, ref } from 'vue'
import { SgDiagram, useGraph } from '@skygraph/vue'
import type { NodeId } from '@skygraph/core'

const { graph, state } = useGraph()
const counter = ref(3)
const selected = ref<NodeId[]>([])

onMounted(() => {
  graph.addNode({
    id: 'A',
    transform: { x: 60, y: 60 },
    outline: { kind: 'rect', w: 110, h: 50 },
  })
  graph.addNode({
    id: 'B',
    transform: { x: 280, y: 80 },
    outline: { kind: 'rect', w: 110, h: 50 },
  })
  graph.addNode({
    id: 'C',
    transform: { x: 480, y: 200 },
    outline: { kind: 'rect', w: 110, h: 50 },
  })
  graph.addEdge({ from: { node: 'A', anchor: 'ne' }, to: { node: 'B', anchor: 'nw' } })
  graph.addEdge({ from: { node: 'B', anchor: 'se' }, to: { node: 'C', anchor: 'nw' } })
})

function addNode() {
  const id = `N${counter.value++}`
  graph.addNode({
    id,
    transform: { x: 80 + Math.random() * 400, y: 80 + Math.random() * 200 },
    outline: { kind: 'rect', w: 100, h: 50 },
  })
}

function deleteSelected() {
  for (const id of selected.value) graph.removeNode(id)
  selected.value = []
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <div style="display: flex; gap: 8px">
      <button type="button" @click="addNode">+ Add node</button>
      <button type="button" :disabled="selected.length === 0" @click="deleteSelected">
        − Delete selected
      </button>
    </div>
    <SgDiagram
      :graph="graph"
      :state="state"
      :width="640"
      :height="320"
      selection-mode="multi"
      :selected-node-ids="selected"
      @selection-change="(ids) => (selected = ids)"
    >
      <template #node="{ node }">
        <span style="font-weight: 600">{{ node.id }}</span>
      </template>
    </SgDiagram>
  </div>
</template>
