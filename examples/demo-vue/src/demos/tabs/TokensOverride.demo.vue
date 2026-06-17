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
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-text-secondary': '#94a3b8',
  '--sg-color-border-secondary': '#475569',
  '--sg-color-primary': '#60a5fa',
}
</script>

<template>
  <div :style="dark">
    <SgTabs type="line" :items="items" />
  </div>
</template>
