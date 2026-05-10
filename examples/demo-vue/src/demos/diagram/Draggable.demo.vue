<script setup lang="ts">
/**
 * Draggable nodes — Vue's `draggableNodes` prop (default `true`).
 * Click and hold a node to reposition it; the engine updates the node
 * transform and edges follow.
 */
import { onMounted } from 'vue'
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
    transform: { x: 440, y: 200 },
    outline: { kind: 'rect', w: 110, h: 50 },
  })
  graph.addEdge({ from: { node: 'A', anchor: 'ne' }, to: { node: 'B', anchor: 'nw' } })
  graph.addEdge({ from: { node: 'B', anchor: 'se' }, to: { node: 'C', anchor: 'nw' } })
})
</script>

<template>
  <SgDiagram :graph="graph" :state="state" :width="620" :height="320" :draggable-nodes="true">
    <template #node="{ node }">
      <span style="font-weight: 600">{{ node.id }}</span>
    </template>
  </SgDiagram>
</template>
