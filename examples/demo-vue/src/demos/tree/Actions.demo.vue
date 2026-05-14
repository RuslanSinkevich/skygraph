<script setup lang="ts">
/**
 * Per-row actions render on hover. Use `danger` for destructive ops and
 * `visible(node)` / `disabled(node)` for conditional logic.
 */
import { SgTree } from '@skygraph/vue'
import type { TreeNodeAction } from '@skygraph/vue'
import { orgTree } from './data'

const actions: TreeNodeAction[] = [
  {
    key: 'edit',
    icon: '✏',
    title: 'Rename',
    onClick: (node) => alert(`Rename "${node.title as string}"`),
  },
  {
    key: 'delete',
    icon: '✕',
    title: 'Delete',
    danger: true,
    disabled: (node) => !!node.disabled,
    onClick: (node) => alert(`Delete "${node.title as string}"`),
  },
]
</script>

<template>
  <SgTree :tree-data="orgTree" default-expand-all :actions="actions" />
</template>
