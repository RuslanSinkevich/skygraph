<script setup lang="ts">
/**
 * `snap-to-grid="20"` rounds drag-end coordinates to multiples of 20
 * world units and turns on the matching CSS background grid (the
 * `.sg-diagram-grid` modifier).
 */
import { onMounted } from 'vue'
import { SgDiagram, useGraph } from '@skygraph/vue'

const { graph, state } = useGraph()

onMounted(() => {
  const a = graph.addNode({
    id: 'A',
    transform: { x: 60, y: 60 },
    outline: { kind: 'rect', w: 100, h: 60 },
  })
  const b = graph.addNode({
    id: 'B',
    transform: { x: 280, y: 60 },
    outline: { kind: 'rect', w: 100, h: 60 },
  })
  const c = graph.addNode({
    id: 'C',
    transform: { x: 160, y: 220 },
    outline: { kind: 'rect', w: 120, h: 60 },
  })
  graph.addEdge({ from: { node: a, anchor: 'se' }, to: { node: c, anchor: 'nw' } })
  graph.addEdge({ from: { node: b, anchor: 'sw' }, to: { node: c, anchor: 'ne' } })
})
</script>

<template>
  <SgDiagram :graph="graph" :state="state" :width="500" :height="340" draggable :snap-to-grid="20">
    <template #node="{ node }">
      <span style="font-weight: 600">{{ node.id }}</span>
    </template>
  </SgDiagram>
</template>
