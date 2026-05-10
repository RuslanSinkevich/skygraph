<script setup lang="ts">
/**
 * `format` decides the shape of `update:modelValue` and the trigger
 * label: `hex` emits "#rrggbb", `rgb` emits "rgb(r, g, b)".
 */
import { SgColorPicker } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; gap: 16px; align-items: center">
    <SgColorPicker default-value="#52c41a" format="hex" show-text />
    <SgColorPicker default-value="#f5222d" format="rgb" show-text />
  </div>
</template>
