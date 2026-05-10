<script setup lang="ts">
/**
 * The default ring reads `--sg-color-primary`, the connector
 * reads `--sg-color-border-secondary`, and the pending content
 * colour reads `--sg-color-text-tertiary`. Scope them on a
 * wrapper to rebrand a whole timeline.
 */
import { SgTimeline } from '@skygraph/vue'
import { releaseItems } from './data'

const scope = {
  padding: '16px',
  borderRadius: '12px',
  background: '#0f172a',
  color: '#e2e8f0',
  '--sg-color-primary': '#38bdf8',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-text-secondary': '#94a3b8',
  '--sg-color-text-tertiary': '#64748b',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-bg': '#0f172a',
} as Record<string, string>
</script>

<template>
  <div :style="scope">
    <SgTimeline :items="releaseItems" pending="Awaiting approval…" />
  </div>
</template>
