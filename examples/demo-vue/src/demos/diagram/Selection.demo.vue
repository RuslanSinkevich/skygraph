<script setup lang="ts">
/**
 * Single selection — clicking any node makes it the only selected one.
 * Selection is uncontrolled (Vue keeps the set internally) but we still
 * read the latest set via `selection-change`.
 */
import { onMounted, ref } from 'vue'
import { SgDiagram, useGraph } from '@skygraph/vue'
import type { NodeId } from '@skygraph/core'

const { graph, state } = useGraph()
const selected = ref<NodeId[]>([])

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
    transform: { x: 440, y: 60 },
    outline: { kind: 'rect', w: 110, h: 50 },
  })
  graph.addEdge({ from: { node: 'A', anchor: 'ne' }, to: { node: 'B', anchor: 'nw' } })
  graph.addEdge({ from: { node: 'B', anchor: 'ne' }, to: { node: 'C', anchor: 'nw' } })
})
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <div style="font-size: 13px; color: var(--sg-color-text-secondary)">
      Selected: {{ selected.length === 0 ? '(none)' : selected.join(', ') }}
    </div>
    <SgDiagram
      :graph="graph"
      :state="state"
      :width="620"
      :height="240"
      selection-mode="single"
      @selection-change="(ids) => (selected = ids)"
    >
      <template #node="{ node }">
        <span style="font-weight: 600">{{ node.id }}</span>
      </template>
    </SgDiagram>
  </div>
</template>
