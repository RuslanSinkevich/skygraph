<script setup lang="ts">
/**
 * `node-status(node)` returns one of `success | warning | error | info |
 * default` — the library paints a status dot + left border accordingly.
 * Useful for build trees, deployment environments, or health dashboards.
 */
import { SgTree } from '@skygraph/vue'
import type { TreeNodeData, TreeNodeStatus } from '@skygraph/vue'
import { orgTree } from './data'

function status(node: TreeNodeData): TreeNodeStatus {
  const k = String(node.key)
  if (k === 'eng-web-fe') return 'success'
  if (k === 'eng-web-be') return 'warning'
  if (k === 'eng-mobile-ios') return 'error'
  if (k === 'ops-finance') return 'info'
  return 'default'
}
</script>

<template>
  <SgTree :tree-data="orgTree" default-expand-all :node-status="status" />
</template>
