<script setup lang="ts">
/**
 * Orthogonal routing with obstacle avoidance — the A*-based router is
 * fed every other node as an obstacle so edges detour around them
 * rather than cutting through. Drag the nodes to see the rerouting
 * happen in real time.
 *
 * Vue port of React's `OrthogonalRouting.demo.tsx` (T-Diagram-Polish
 * 3.3c). The router now also picks the side of each node nearest to
 * the other endpoint, so edges exit perpendicular to the closest face
 * instead of from corner anchors.
 */
import { onMounted } from 'vue'
import { SgDiagram, useGraph } from '@skygraph/vue'

const { graph, state } = useGraph()

onMounted(() => {
  const layout: Array<{ id: string; x: number; y: number }> = [
    { id: 'A', x: 40, y: 60 },
    { id: 'B', x: 320, y: 60 },
    { id: 'C', x: 600, y: 60 },
    { id: 'D', x: 40, y: 240 },
    { id: 'E', x: 600, y: 240 },
    { id: 'F', x: 320, y: 360 },
  ]
  for (const n of layout) {
    graph.addNode({
      id: n.id,
      transform: { x: n.x, y: n.y },
      outline: { kind: 'rect', w: 110, h: 56 },
    })
  }
  const edges: Array<['nw' | 'ne' | 'se' | 'sw', 'nw' | 'ne' | 'se' | 'sw', string, string]> = [
    ['ne', 'nw', 'A', 'B'],
    ['ne', 'nw', 'B', 'C'],
    ['se', 'ne', 'A', 'D'],
    ['sw', 'nw', 'C', 'E'],
    ['se', 'nw', 'D', 'F'],
    ['sw', 'ne', 'E', 'F'],
    ['sw', 'ne', 'B', 'D'],
    ['se', 'nw', 'B', 'E'],
  ]
  for (const [fa, ta, from, to] of edges) {
    graph.addEdge({
      from: { node: from, anchor: fa },
      to: { node: to, anchor: ta },
      routing: 'orthogonal',
    })
  }
})
</script>

<template>
  <SgDiagram
    :graph="graph"
    :state="state"
    :width="760"
    :height="460"
    :draggable="true"
    :route-around-nodes="true"
    :routing-options="{ gridSize: 10, inflate: 6 }"
  >
    <template #node="{ node }">
      <span style="font-weight: 600">{{ String(node.id) }}</span>
    </template>
  </SgDiagram>
</template>
