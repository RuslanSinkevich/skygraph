<script setup lang="ts">
/**
 * `show-line` draws guide lines connecting parents and children — the
 * classic filesystem look. Pairs well with `directory`.
 */
import { SgTree } from '@skygraph/vue'
import { fileTree } from './data'
</script>

<template>
  <SgTree :tree-data="fileTree" default-expand-all show-line directory />
</template>
