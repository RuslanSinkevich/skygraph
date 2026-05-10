<script setup lang="ts">
/**
 * Segmented reuses the global token scale. Override
 * `--sg-color-bg-secondary` for the track and
 * `--sg-color-bg-container` for the selected "thumb" (and
 * `--sg-shadow-sm` for its lift) to repaint the whole control
 * without writing component-specific CSS.
 */
import { SgSegmented } from '@skygraph/vue'
</script>

<template>
  <div
    :style="{
      padding: '12px',
      borderRadius: '12px',
      background: '#0f172a',
      '--sg-color-bg-secondary': '#1e293b',
      '--sg-color-bg-container': '#0ea5e9',
      '--sg-color-text': '#ffffff',
      '--sg-color-text-secondary': 'rgba(255,255,255,0.75)',
      '--sg-shadow-sm': '0 1px 2px rgba(0,0,0,0.45)',
    } as Record<string, string>"
  >
    <SgSegmented default-value="B" :options="['A', 'B', 'C', 'D']" />
  </div>
</template>
