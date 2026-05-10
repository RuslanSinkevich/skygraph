<script setup lang="ts">
/**
 * `showSearch` renders the built-in filter field. Parents stay visible
 * while any descendant matches; matched substrings are highlighted.
 */
import { SgTree } from '@skygraph/vue'
import { orgTree } from './data'
</script>

<template>
  <SgTree
    show-search
    default-expand-all
    auto-expand-parent
    :tree-data="orgTree"
  />
</template>
