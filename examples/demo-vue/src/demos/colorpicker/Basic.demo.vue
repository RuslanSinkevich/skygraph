<script setup lang="ts">
/**
 * Controlled ColorPicker. The value is the raw string in the active
 * `format` (hex by default), so it roundtrips to CSS variables and
 * network payloads without adapters.
 */
import { ref } from 'vue'
import { SgColorPicker } from '@skygraph/vue'

const color = ref('#1677ff')
</script>

<template>
  <div style="display: flex; gap: 16px; align-items: center">
    <SgColorPicker v-model="color" show-text />
    <div
      aria-hidden="true"
      :style="{
        width: '120px',
        height: '36px',
        borderRadius: '8px',
        background: color,
        border: '1px solid var(--sg-color-border)',
      }"
    />
  </div>
</template>
