<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgMenu } from '@skygraph/vue'
import { sidebarItems } from './data'

const dark = {
  background: '#0f172a',
  '--sg-color-error-bg': 'rgba(248, 113, 113, 0.16)',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-fill-secondary': 'rgba(255, 255, 255, 0.1)',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-bg-elevated': '#1e293b',
  '--sg-color-text-disabled': '#64748b',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-text-tertiary': '#94a3b8',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-text': '#f8fafc',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.16)',
}
</script>

<template>
  <div :style="dark">
    <SgMenu
      mode="inline"
      :items="sidebarItems"
      :default-open-keys="['team']"
      :default-selected-keys="['members']"
    />
  </div>
</template>
