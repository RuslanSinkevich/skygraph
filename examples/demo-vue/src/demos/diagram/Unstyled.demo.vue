<script setup lang="ts">
/**
 * Unstyled — drop the default `.sg-diagram*` class hooks and bring your
 * own styling. Inline structure is identical, the wrapper just doesn't
 * carry any of Skygraph's CSS.
 */
import { onMounted } from 'vue'
import { SgDiagram, useGraph } from '@skygraph/vue'

const { graph, state } = useGraph()

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
  graph.addEdge({ from: { node: 'A', anchor: 'ne' }, to: { node: 'B', anchor: 'nw' } })
})
</script>

<template>
  <SgDiagram
    :graph="graph"
    :state="state"
    :width="500"
    :height="220"
    :unstyled="true"
    :style="{ background: 'var(--sg-color-bg-container)', border: '1px dashed var(--sg-color-border)', borderRadius: '8px' }"
  >
    <template #node="{ node }">
      <span style="font-weight: 600; color: var(--sg-color-success)">{{ node.id }}</span>
    </template>
  </SgDiagram>
</template>
