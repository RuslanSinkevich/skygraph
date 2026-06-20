<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgTabs, type TabItem } from '@skygraph/vue'

const items: TabItem[] = [
  { key: '1', label: 'Overview', content: 'Tab panel content.' },
  { key: '2', label: 'Activity', content: 'Tab panel content.' },
  { key: '3', label: 'Settings', content: 'Tab panel content.' },
]

const dark = {
  background: '#0f172a',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-color-text-disabled': '#64748b',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg': '#0f172a',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-primary': '#60a5fa',
}
</script>

<template>
  <div :style="dark">
    <SgTabs type="line" :items="items" />
  </div>
</template>
