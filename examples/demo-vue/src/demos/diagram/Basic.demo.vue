<script setup lang="ts">
/**
 * Basic — three rect nodes with two straight edges. Resolves to centre
 * anchors via stable IDs in the underlying `useGraph()` engine.
 */
import { onMounted } from 'vue'
import { SgDiagram, useGraph } from '@skygraph/vue'

const { graph, state } = useGraph()

onMounted(() => {
  graph.addNode({
    id: 'A',
    transform: { x: 40, y: 60 },
    outline: { kind: 'rect', w: 100, h: 50 },
  })
  graph.addNode({
    id: 'B',
    transform: { x: 220, y: 60 },
    outline: { kind: 'rect', w: 100, h: 50 },
  })
  graph.addNode({
    id: 'C',
    transform: { x: 400, y: 180 },
    outline: { kind: 'rect', w: 100, h: 50 },
  })
  graph.addEdge({ from: { node: 'A', anchor: 'ne' }, to: { node: 'B', anchor: 'nw' } })
  graph.addEdge({ from: { node: 'B', anchor: 'se' }, to: { node: 'C', anchor: 'nw' } })
})
</script>

<template>
  <SgDiagram :graph="graph" :state="state" :width="560" :height="300">
    <template #node="{ node }">
      <span style="font-weight: 600">{{ node.id }}</span>
    </template>
  </SgDiagram>
</template>
