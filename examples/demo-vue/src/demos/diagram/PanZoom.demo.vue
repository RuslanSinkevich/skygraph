<script setup lang="ts">
/**
 * Combined pan + zoom — Vue exposes a single `panZoom` prop (default
 * `true`) instead of React's separate `zoomable` / `panable` flags.
 * Wheel scroll zooms; canvas-drag pans the world.
 *
 * See `findings/T-Vue-Demo-Complex.md` → `diagram-no-separate-pan-zoom`.
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
    transform: { x: 320, y: 200 },
    outline: { kind: 'rect', w: 100, h: 50 },
  })
  graph.addNode({
    id: 'C',
    transform: { x: 600, y: 60 },
    outline: { kind: 'rect', w: 100, h: 50 },
  })
  graph.addNode({
    id: 'D',
    transform: { x: 800, y: 220 },
    outline: { kind: 'rect', w: 100, h: 50 },
  })
  graph.addEdge({ from: { node: 'A', anchor: 'se' }, to: { node: 'B', anchor: 'nw' } })
  graph.addEdge({ from: { node: 'B', anchor: 'ne' }, to: { node: 'C', anchor: 'sw' } })
  graph.addEdge({ from: { node: 'C', anchor: 'se' }, to: { node: 'D', anchor: 'nw' } })
})
</script>

<template>
  <SgDiagram :graph="graph" :state="state" :width="520" :height="320" :pan-zoom="true">
    <template #node="{ node }">
      <span style="font-weight: 600">{{ node.id }}</span>
    </template>
  </SgDiagram>
</template>
