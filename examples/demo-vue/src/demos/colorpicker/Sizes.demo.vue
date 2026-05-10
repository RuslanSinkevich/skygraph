<script setup lang="ts">
/**
 * Three sizes change trigger height and swatch size. The dropdown is
 * the same width at every size.
 */
import { SgColorPicker } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; gap: 16px; align-items: center">
    <SgColorPicker size="small" default-value="#52c41a" show-text />
    <SgColorPicker default-value="#1677ff" show-text />
    <SgColorPicker size="large" default-value="#722ed1" show-text />
  </div>
</template>
