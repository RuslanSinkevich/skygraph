<script setup lang="ts">
/**
 * Multi-select via `Ctrl+click` (or `Shift+click`). Vue's `selectionMode`
 * exposes `single` and `multi` only — `lasso` is React-only for now.
 */
import { onMounted, ref } from 'vue'
import { SgDiagram, useGraph } from '@skygraph/vue'
import type { NodeId } from '@skygraph/core'

const { graph, state } = useGraph()
const selection = ref<NodeId[]>([])

onMounted(() => {
  const grid = 4
  let i = 0
  for (let r = 0; r < grid; r++) {
    for (let c = 0; c < grid; c++) {
      graph.addNode({
        id: `N${i++}`,
        transform: { x: 40 + c * 130, y: 40 + r * 80 },
        outline: { kind: 'rect', w: 100, h: 50 },
      })
    }
  }
  for (let k = 0; k < grid * grid - 1; k++) {
    graph.addEdge({
      from: { node: `N${k}`, anchor: 'se' },
      to: { node: `N${k + 1}`, anchor: 'nw' },
    })
  }
})
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <div style="font-size: 13px; color: var(--sg-color-text-secondary)">
      Selected: {{ selection.length === 0 ? '(none)' : selection.join(', ') }}
    </div>
    <SgDiagram
      :graph="graph"
      :state="state"
      :width="620"
      :height="360"
      selection-mode="multi"
      :selected-node-ids="selection"
      @selection-change="(ids) => (selection = ids)"
    >
      <template #node="{ node }">
        <span style="font-weight: 600">{{ node.id }}</span>
      </template>
    </SgDiagram>
  </div>
</template>
