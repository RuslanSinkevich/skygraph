<script setup lang="ts">
/**
 * `unstyled` keeps the semantic tree (role="tree", `data-key`-attrs,
 * keyboard navigation) but drops Skygraph's CSS classes — bring your
 * own design system.
 */
import { SgTree } from '@skygraph/vue'
import { orgTree } from './data'
</script>

<template>
  <SgTree unstyled :tree-data="orgTree" default-expand-all />
</template>
