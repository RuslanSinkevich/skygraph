<script setup lang="ts">
/**
 * Imperative `print()` — `SgDiagram` exposes a single-method ref API
 * that delegates to `printElement()`, mirroring React's `DiagramRef`.
 * This sample picks the diagram canvas + edges, builds a print-ready
 * fragment and triggers `window.print()`.
 */
import { onMounted, ref } from 'vue'
import { SgDiagram, useGraph } from '@skygraph/vue'

const { graph, state } = useGraph()
const diagramRef = ref<{ print: () => void } | null>(null)

onMounted(() => {
  graph.addNode({
    id: 'A',
    transform: { x: 60, y: 60 },
    outline: { kind: 'rect', w: 110, h: 50 },
  })
  graph.addNode({
    id: 'B',
    transform: { x: 280, y: 60 },
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
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <div>
      <button type="button" @click="diagramRef?.print()">Print</button>
    </div>
    <SgDiagram
      ref="diagramRef"
      :graph="graph"
      :state="state"
      :width="620"
      :height="280"
      file-name="my-diagram"
    >
      <template #node="{ node }">
        <span style="font-weight: 600">{{ node.id }}</span>
      </template>
    </SgDiagram>
  </div>
</template>
