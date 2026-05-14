<script setup lang="ts">
/**
 * Zoomable canvas. Hold `Ctrl` (or `⌘` on macOS) and scroll the wheel
 * over the diagram to zoom in / out. Plain wheel does nothing here since
 * `panable` is off.
 */
import { onMounted } from 'vue'
import { SgDiagram, useGraph } from '@skygraph/vue'

const { graph, state } = useGraph()

onMounted(() => {
  const a = graph.addNode({
    id: 'A',
    transform: { x: 40, y: 60 },
    outline: { kind: 'rect', w: 100, h: 50 },
  })
  const b = graph.addNode({
    id: 'B',
    transform: { x: 220, y: 60 },
    outline: { kind: 'rect', w: 100, h: 50 },
  })
  const c = graph.addNode({
    id: 'C',
    transform: { x: 130, y: 200 },
    outline: { kind: 'ellipse', rx: 60, ry: 40 },
  })
  graph.addEdge({ from: { node: a, anchor: 'ne' }, to: { node: b, anchor: 'nw' } })
  graph.addEdge({ from: { node: a, anchor: 'se' }, to: { node: c, anchor: { s: 0.25 } } })
  graph.addEdge({ from: { node: b, anchor: 'sw' }, to: { node: c, anchor: { s: 0.75 } } })
})
</script>

<template>
  <SgDiagram :graph="graph" :state="state" :width="500" :height="320" zoomable>
    <template #node="{ node }">
      <span style="font-weight: 600">{{ node.id }}</span>
    </template>
  </SgDiagram>
</template>
