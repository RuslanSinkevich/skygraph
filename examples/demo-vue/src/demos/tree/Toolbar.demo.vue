<script setup lang="ts">
/**
 * `showToolbar` adds Expand / Collapse / Check All / Uncheck All controls
 * above the tree. Pair with `checkable` to enable the bulk check
 * actions.
 */
import { SgTree } from '@skygraph/vue'
import { orgTree } from './data'
</script>

<template>
  <SgTree
    show-toolbar
    checkable
    default-expand-all
    :tree-data="orgTree"
  />
</template>
