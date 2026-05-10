<script setup lang="ts">
/**
 * Custom node template — Vue idiom for the `renderNode` prop in React.
 * The `#node` slot exposes a `node` payload so consumers fully control
 * the node body markup.
 */
import { onMounted } from 'vue'
import { SgDiagram, useGraph } from '@skygraph/vue'

const { graph, state } = useGraph()

onMounted(() => {
  graph.addNode({
    id: 'idea',
    transform: { x: 60, y: 60 },
    outline: { kind: 'rect', w: 140, h: 60 },
  })
  graph.addNode({
    id: 'plan',
    transform: { x: 280, y: 60 },
    outline: { kind: 'rect', w: 140, h: 60 },
  })
  graph.addNode({
    id: 'ship',
    transform: { x: 280, y: 200 },
    outline: { kind: 'rect', w: 140, h: 60 },
  })
  graph.addEdge({ from: { node: 'idea', anchor: 'ne' }, to: { node: 'plan', anchor: 'nw' } })
  graph.addEdge({ from: { node: 'plan', anchor: 'se' }, to: { node: 'ship', anchor: 'nw' } })
})
</script>

<template>
  <SgDiagram :graph="graph" :state="state" :height="320">
    <template #node="{ node }">
      <div
        style="
          padding: 12px 16px;
          border-radius: 8px;
          background: var(--sg-color-primary);
          color: var(--sg-color-text-light-solid, #fff);
          font-weight: 600;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.4px;
        "
      >
        {{ node.id }}
      </div>
    </template>
  </SgDiagram>
</template>
