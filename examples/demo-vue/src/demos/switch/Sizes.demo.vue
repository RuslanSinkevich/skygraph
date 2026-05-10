<script setup lang="ts">
/**
 * Two visual sizes: `small` (compact toolbars) and the default.
 * (`large` is accepted by the prop but currently renders like default.)
 */
import { SgSwitch } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; gap: 16px; align-items: center">
    <SgSwitch size="small" default-checked />
    <SgSwitch default-checked />
  </div>
</template>
