<script setup lang="ts">
/**
 * Default tree — click a title to select, the arrow to expand.
 * `defaultExpandAll` is convenient for demos; prefer controlled
 * `expandedKeys` in production.
 */
import { SgTree } from '@skygraph/vue'
import { orgTree } from './data'

function onSelect(keys: unknown, info: { node: { title?: unknown } }) {
  console.log('[Tree] select', keys, info.node.title)
}
function onExpand(keys: unknown) {
  console.log('[Tree] expand', keys)
}
</script>

<template>
  <SgTree :tree-data="orgTree" default-expand-all @select="onSelect" @expand="onExpand" />
</template>
