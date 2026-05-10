<script setup lang="ts">
/**
 * Three sizes change height, stepper button width and input width.
 * Match Input/Select when mixing them on the same row.
 */
import { SgInputNumber } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; gap: 16px; align-items: center">
    <SgInputNumber size="small" :default-value="1" />
    <SgInputNumber :default-value="2" />
    <SgInputNumber size="large" :default-value="3" />
  </div>
</template>
