<script setup lang="ts">
/**
 * `blockNode` makes the entire row clickable for selection — the title
 * stretches to the row width so the hit area is bigger.
 */
import { SgTree } from '@skygraph/vue'
import { orgTree } from './data'
</script>

<template>
  <SgTree block-node default-expand-all :tree-data="orgTree" />
</template>
