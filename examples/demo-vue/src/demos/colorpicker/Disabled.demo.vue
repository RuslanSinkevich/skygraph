<script setup lang="ts">
/**
 * `disabled` greys out the trigger and stops the panel from opening,
 * but the current value remains readable next to the swatch when
 * `show-text` is on.
 */
import { SgColorPicker } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; gap: 12px; align-items: center">
    <SgColorPicker default-value="#1677ff" disabled show-text />
    <SgColorPicker default-value="#52c41a" disabled />
  </div>
</template>
