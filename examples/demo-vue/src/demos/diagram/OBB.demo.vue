<script setup lang="ts">
/**
 * Rotated nodes — every transform carries a non-zero `rot` (radians).
 * The engine still computes correct *axis-aligned* bounds via a
 * projection of the OBB, so edges and obstacle-aware routing keep
 * working without manual fixes.
 */
import { onMounted } from 'vue'
import { SgDiagram, useGraph } from '@skygraph/vue'

const { graph, state } = useGraph()

onMounted(() => {
  const a = graph.addNode({
    id: 'A',
    transform: { x: 80, y: 100, rot: Math.PI / 12 },
    outline: { kind: 'rect', w: 110, h: 60 },
  })
  const b = graph.addNode({
    id: 'B',
    transform: { x: 320, y: 80, rot: -Math.PI / 8 },
    outline: { kind: 'rect', w: 110, h: 60 },
  })
  const c = graph.addNode({
    id: 'C',
    transform: { x: 560, y: 180, rot: Math.PI / 6 },
    outline: { kind: 'rect', w: 110, h: 60 },
  })
  const d = graph.addNode({
    id: 'D',
    transform: { x: 220, y: 280, rot: Math.PI / 4 },
    outline: { kind: 'rect', w: 110, h: 60 },
  })
  graph.addEdge({ from: { node: a, anchor: 'ne' }, to: { node: b, anchor: 'nw' } })
  graph.addEdge({ from: { node: b, anchor: 'se' }, to: { node: c, anchor: 'nw' } })
  graph.addEdge({
    from: { node: a, anchor: 'se' },
    to: { node: d, anchor: 'nw' },
    routing: 'orthogonal',
  })
  graph.addEdge({
    from: { node: c, anchor: 'sw' },
    to: { node: d, anchor: 'ne' },
    routing: 'orthogonal',
  })
})
</script>

<template>
  <SgDiagram :graph="graph" :state="state" :width="760" :height="420" route-around-nodes>
    <template #node="{ node }">
      <span
        :style="{
          fontWeight: 600,
          transform: `rotate(${node.transform.rot ?? 0}rad)`,
          transformOrigin: 'center',
        }"
      >
        {{ node.id }}
      </span>
    </template>
  </SgDiagram>
</template>
