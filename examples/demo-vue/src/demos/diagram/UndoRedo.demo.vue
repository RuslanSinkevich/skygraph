<script setup lang="ts">
/**
 * Undo / Redo via the engine's built-in history (`graph.undo()` /
 * `graph.redo()`). Drag any node, then walk the timeline with the
 * buttons or the keyboard shortcuts.
 */
import { onMounted, onUnmounted } from 'vue'
import { SgDiagram, useGraph } from '@skygraph/vue'

const { graph, state } = useGraph()

onMounted(() => {
  graph.addNode({
    id: 'A',
    transform: { x: 40, y: 60 },
    outline: { kind: 'rect', w: 110, h: 50 },
  })
  graph.addNode({
    id: 'B',
    transform: { x: 240, y: 60 },
    outline: { kind: 'rect', w: 110, h: 50 },
  })
  graph.addNode({
    id: 'C',
    transform: { x: 440, y: 60 },
    outline: { kind: 'rect', w: 110, h: 50 },
  })
  graph.addEdge({ from: { node: 'A', anchor: 'ne' }, to: { node: 'B', anchor: 'nw' } })
  graph.addEdge({ from: { node: 'B', anchor: 'ne' }, to: { node: 'C', anchor: 'nw' } })
})

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

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <div style="display: flex; gap: 8px">
      <button type="button" @click="graph.undo()">↶ Undo (Ctrl+Z)</button>
      <button type="button" @click="graph.redo()">↷ Redo (Ctrl+Y)</button>
    </div>
    <SgDiagram :graph="graph" :state="state" :width="620" :height="260">
      <template #node="{ node }">
        <span style="font-weight: 600">{{ node.id }}</span>
      </template>
    </SgDiagram>
  </div>
</template>
