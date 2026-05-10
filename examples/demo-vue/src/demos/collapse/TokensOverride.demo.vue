<script setup lang="ts">
/**
 * Collapse has no dedicated tokens — it reads the global surface
 * palette (`--sg-color-bg-container`, `--sg-color-bg-secondary`,
 * `--sg-color-bg-hover`) and border tokens. Scope them for a dark
 * panel look like this.
 */
import { SgCollapse } from '@skygraph/vue'
import { sampleItems } from './data'

const scoped = {
  '--sg-color-bg-container': '#1f2937',
  '--sg-color-bg-secondary': '#111827',
  '--sg-color-bg-hover': '#374151',
  '--sg-color-text': '#f9fafb',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-border-secondary': '#334155',
  '--sg-border-radius-lg': '10px',
  padding: '16px',
  background: '#0f172a',
  borderRadius: '12px',
} as Record<string, string>
</script>

<template>
  <div :style="scoped">
    <SgCollapse :items="sampleItems" :default-active-key="['1']" />
  </div>
</template>
