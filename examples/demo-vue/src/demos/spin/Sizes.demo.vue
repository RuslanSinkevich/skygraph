<script setup lang="ts">
/**
 * Three discrete sizes — 12px / 24px / 36px. The border width
 * scales with the size so the ring keeps the same visual weight.
 */
import { SgSpin } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; gap: 24px; align-items: center">
    <SgSpin size="small" />
    <SgSpin />
    <SgSpin size="large" />
  </div>
</template>
