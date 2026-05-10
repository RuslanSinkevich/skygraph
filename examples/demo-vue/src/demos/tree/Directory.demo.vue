<script setup lang="ts">
/**
 * `directory` mode renders the selected node with a filled background
 * (filesystem explorer style). Clicking a folder also expands it.
 */
import { SgTree } from '@skygraph/vue'
import { fileTree } from './data'
</script>

<template>
  <SgTree
    directory
    default-expand-all
    :tree-data="fileTree"
    :default-selected-keys="['src-components-button']"
  />
</template>
