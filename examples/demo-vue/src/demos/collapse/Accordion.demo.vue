<script setup lang="ts">
/**
 * `accordion` enforces the single-open rule. Clicking the active
 * panel again closes it (empty active set); clicking another swaps
 * which one is open.
 */
import { SgCollapse } from '@skygraph/vue'
import { sampleItems } from './data'
</script>

<template>
  <SgCollapse :items="sampleItems" accordion default-active-key="1" />
</template>
