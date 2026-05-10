<script setup lang="ts">
/**
 * Stress test — 200 nodes / 400 random edges. The engine batches the
 * mutations through `graph.transaction()` so reactivity emits one update
 * for the whole insert. Drag a node to confirm interactivity stays
 * responsive.
 */
import { onMounted } from 'vue'
import { SgDiagram, useGraph } from '@skygraph/vue'

const NODE_COUNT = 200
const EDGE_COUNT = 400
const COLS = 20

const { graph, state } = useGraph()

onMounted(() => {
  graph.transaction(() => {
    for (let i = 0; i < NODE_COUNT; i++) {
      const col = i % COLS
      const row = Math.floor(i / COLS)
      graph.addNode({
        id: `n${i}`,
        transform: { x: 20 + col * 70, y: 20 + row * 60 },
        outline: { kind: 'rect', w: 56, h: 36 },
      })
    }
    let seed = 0xc0ffee
    const next = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0
      return seed
    }
    for (let i = 0; i < EDGE_COUNT; i++) {
      const a = next() % NODE_COUNT
      let b = next() % NODE_COUNT
      if (b === a) b = (b + 1) % NODE_COUNT
      graph.addEdge({
        from: { node: `n${a}`, anchor: 'ne' },
        to: { node: `n${b}`, anchor: 'nw' },
      })
    }
  })
})
</script>

<template>
  <SgDiagram :graph="graph" :state="state" :width="760" :height="460">
    <template #node="{ node }">
      <span style="font-size: 10px; font-weight: 600">{{ node.id }}</span>
    </template>
  </SgDiagram>
</template>
