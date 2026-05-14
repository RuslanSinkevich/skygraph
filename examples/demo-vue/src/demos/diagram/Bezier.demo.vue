<script setup lang="ts">
/**
 * Bezier-routed edges with directional arrow markers. Each edge gets a
 * cubic Bezier whose control handles extend perpendicular to the
 * nearest face of each node — drag the nodes around to watch the curves
 * re-fit smoothly without ever flipping sides.
 */
import { onMounted } from 'vue'
import { SgDiagram, useGraph } from '@skygraph/vue'

const { graph, state } = useGraph()

onMounted(() => {
  const a = graph.addNode({
    id: 'Start',
    transform: { x: 40, y: 80 },
    outline: { kind: 'rect', w: 110, h: 50 },
  })
  const b = graph.addNode({
    id: 'Validate',
    transform: { x: 260, y: 40 },
    outline: { kind: 'rect', w: 110, h: 50 },
  })
  const c = graph.addNode({
    id: 'Persist',
    transform: { x: 260, y: 160 },
    outline: { kind: 'rect', w: 110, h: 50 },
  })
  const d = graph.addNode({
    id: 'Notify',
    transform: { x: 500, y: 100 },
    outline: { kind: 'rect', w: 110, h: 50 },
  })
  graph.addEdge({
    from: { node: a, anchor: 'ne' },
    to: { node: b, anchor: 'nw' },
    routing: 'bezier',
  })
  graph.addEdge({
    from: { node: a, anchor: 'se' },
    to: { node: c, anchor: 'nw' },
    routing: 'bezier',
  })
  graph.addEdge({
    from: { node: b, anchor: 'ne' },
    to: { node: d, anchor: 'nw' },
    routing: 'bezier',
  })
  graph.addEdge({
    from: { node: c, anchor: 'ne' },
    to: { node: d, anchor: 'sw' },
    routing: 'bezier',
  })
})
</script>

<template>
  <SgDiagram :graph="graph" :state="state" :width="680" :height="280" draggable>
    <template #node="{ node }">
      <span style="font-weight: 600">{{ node.id }}</span>
    </template>
  </SgDiagram>
</template>
