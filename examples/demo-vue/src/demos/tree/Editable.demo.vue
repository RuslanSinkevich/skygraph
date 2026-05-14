<script setup lang="ts">
/**
 * Double-click any title to rename it. Enter commits, Escape cancels.
 * The component emits `@edit` with `{ node, key, oldValue, newValue }` —
 * persist the change however you like.
 */
import { ref } from 'vue'
import { SgTree } from '@skygraph/vue'
import type { TreeEditInfo, TreeNodeData } from '@skygraph/vue'

const initialTree: TreeNodeData[] = [
  {
    key: 'project',
    title: 'My Project',
    children: [
      { key: 'project-readme', title: 'README.md' },
      { key: 'project-package', title: 'package.json' },
      {
        key: 'project-src',
        title: 'src',
        children: [
          { key: 'project-src-index', title: 'index.ts' },
          { key: 'project-src-app', title: 'App.vue' },
        ],
      },
    ],
  },
]

const treeData = ref<TreeNodeData[]>(initialTree)

function updateTitle(
  nodes: TreeNodeData[],
  key: string | number,
  newTitle: string,
): TreeNodeData[] {
  return nodes.map((n) => {
    if (n.key === key) return { ...n, title: newTitle }
    if (n.children?.length) return { ...n, children: updateTitle(n.children, key, newTitle) }
    return n
  })
}

function handleEdit({ key, value }: TreeEditInfo) {
  treeData.value = updateTitle(treeData.value, key, value)
}
</script>

<template>
  <SgTree :tree-data="treeData" default-expand-all editable show-line @edit="handleEdit" />
</template>
