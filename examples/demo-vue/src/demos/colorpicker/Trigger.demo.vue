<script setup lang="ts">
/**
 * `trigger="hover"` opens the panel on mouse enter (closes on outside
 * click) — useful for quick glanceable pickers in toolbars.
 */
import { SgColorPicker } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; gap: 16px; align-items: center">
    <SgColorPicker default-value="#1677ff" show-text trigger="click" />
    <SgColorPicker default-value="#fa541c" show-text trigger="hover" />
  </div>
</template>
