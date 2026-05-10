<script setup lang="ts">
/**
 * Per-node click event — Vue emits `node-click` with `{ id, node, event }`.
 * Useful for inspectors / preview panes that mirror the canvas state.
 */
import { onMounted, ref } from 'vue'
import { SgDiagram, useGraph } from '@skygraph/vue'

const { graph, state } = useGraph()
const log = ref<string[]>([])

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
    transform: { x: 140, y: 200 },
    outline: { kind: 'rect', w: 110, h: 50 },
  })
  graph.addEdge({ from: { node: 'A', anchor: 'ne' }, to: { node: 'B', anchor: 'nw' } })
  graph.addEdge({ from: { node: 'A', anchor: 'se' }, to: { node: 'C', anchor: 'nw' } })
})

function append(line: string) {
  log.value = [line, ...log.value].slice(0, 5)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <SgDiagram
      :graph="graph"
      :state="state"
      :width="540"
      :height="320"
      @node-click="(p) => append(`click: ${String(p.id)}`)"
    >
      <template #node="{ node }">
        <span style="font-weight: 600">{{ node.id }}</span>
      </template>
    </SgDiagram>
    <div
      style="
        font-family: monospace;
        font-size: 12px;
        padding: 8px;
        background: var(--sg-color-bg-container);
        border: 1px solid var(--sg-color-border);
        border-radius: var(--sg-border-radius);
        min-height: 60px;
      "
    >
      <span v-if="log.length === 0" style="color: var(--sg-color-text-tertiary)">
        Click a node…
      </span>
      <div v-for="(line, i) in log" :key="i">{{ line }}</div>
    </div>
  </div>
</template>
