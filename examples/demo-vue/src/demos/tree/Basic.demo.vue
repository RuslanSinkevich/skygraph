<script setup lang="ts">
/**
 * Default tree — click a title to select, the arrow to expand.
 * `defaultExpandAll` is convenient for demos; prefer controlled
 * `expandedKeys` in production.
 */
import { SgTree } from '@skygraph/vue'
import { orgTree } from './data'
</script>

<template>
  <SgTree :tree-data="orgTree" default-expand-all />
</template>
