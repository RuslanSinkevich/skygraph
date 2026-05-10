<script setup lang="ts">
/**
 * Setting `height` turns on windowed rendering — only visible rows live
 * in the DOM, so 1 000+ nodes stay fluid.
 */
import { computed } from 'vue'
import { SgTree } from '@skygraph/vue'
import type { TreeNodeData } from '@skygraph/vue'

function makeBigTree(): TreeNodeData[] {
  const roots: TreeNodeData[] = []
  for (let i = 0; i < 20; i++) {
    const children: TreeNodeData[] = []
    for (let j = 0; j < 50; j++) {
      children.push({ key: `r${i}-c${j}`, title: `Item ${i}.${j}` })
    }
    roots.push({ key: `r${i}`, title: `Root ${i}`, children })
  }
  return roots
}

const data = computed(makeBigTree)
</script>

<template>
  <div
    style="
      border: 1px solid var(--sg-color-border);
      border-radius: var(--sg-border-radius);
      padding: 8px;
    "
  >
    <SgTree :tree-data="data" default-expand-all :height="320" />
  </div>
</template>
