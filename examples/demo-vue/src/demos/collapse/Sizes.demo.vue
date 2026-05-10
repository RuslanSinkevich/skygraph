<script setup lang="ts">
/**
 * Three sizes change header padding, min-height, and (for `large`)
 * header font size. Pair with ConfigProvider to broadcast the same
 * size to siblings.
 */
import { SgCollapse } from '@skygraph/vue'
import { sampleItems } from './data'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <SgCollapse size="small" :items="sampleItems" :default-active-key="['1']" />
    <SgCollapse :items="sampleItems" :default-active-key="['1']" />
    <SgCollapse size="large" :items="sampleItems" :default-active-key="['1']" />
  </div>
</template>
