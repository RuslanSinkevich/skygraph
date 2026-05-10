<script setup lang="ts">
/**
 * `loadData` lazy-loads children on demand. Mark a node `isLeaf: false`
 * with no `children` array — Vue will fire `loadData(node)` when the
 * user expands it. Resolve the promise once you've populated children.
 */
import { ref } from 'vue'
import { SgTree } from '@skygraph/vue'
import type { TreeNodeData } from '@skygraph/vue'

const data = ref<TreeNodeData[]>([
  { key: 'team-a', title: 'Team A', isLeaf: false },
  { key: 'team-b', title: 'Team B', isLeaf: false },
  { key: 'team-c', title: 'Team C', isLeaf: true },
])

function findById(nodes: TreeNodeData[], key: TreeNodeData['key']): TreeNodeData | null {
  for (const n of nodes) {
    if (n.key === key) return n
    if (n.children) {
      const r = findById(n.children, key)
      if (r) return r
    }
  }
  return null
}

function load(node: TreeNodeData): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const target = findById(data.value, node.key)
      if (target) {
        target.children = [
          { key: `${String(node.key)}-1`, title: `${String(node.title)} • Member 1`, isLeaf: true },
          { key: `${String(node.key)}-2`, title: `${String(node.title)} • Member 2`, isLeaf: true },
        ]
      }
      resolve()
    }, 600)
  })
}
</script>

<template>
  <SgTree :tree-data="data" :load-data="load" />
</template>
