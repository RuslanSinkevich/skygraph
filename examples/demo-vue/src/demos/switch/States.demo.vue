<script setup lang="ts">
/**
 * Disabled keeps the visual state but blocks interaction. Vue
 * `SgSwitch` has no `loading` prop yet — see
 * `findings/T-Vue-Demo-Forms.md` (`switch-loading-not-in-vue`); the
 * loading row is dropped here.
 */
import { SgSwitch } from '@skygraph/vue'
</script>

<template>
  <div style="display: grid; gap: 12px">
    <div style="display: flex; gap: 16px; align-items: center">
      <SgSwitch disabled />
      <SgSwitch disabled default-checked />
    </div>
  </div>
</template>
