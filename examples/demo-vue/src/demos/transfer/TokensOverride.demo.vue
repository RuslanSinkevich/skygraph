<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { ref } from 'vue'
import { SgTransfer } from '@skygraph/vue'
import { mockData } from './data'

const targetKeys = ref(['1', '3'])

const dark = {
  background: '#0f172a',
  '--sg-color-bg': '#0f172a',
  '--sg-color-bg-disabled': '#1e293b',
  '--sg-color-text-placeholder': '#94a3b8',
  '--sg-color-error-bg': 'rgba(248, 113, 113, 0.16)',
  '--sg-color-warning-bg': 'rgba(251, 191, 36, 0.16)',
  '--sg-color-fill-tertiary': 'rgba(255, 255, 255, 0.08)',
  '--sg-color-fill': 'rgba(255, 255, 255, 0.16)',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-text-disabled': '#64748b',
  '--sg-color-text-tertiary': '#94a3b8',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-text': '#f8fafc',
  '--sg-color-border': '#475569',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.16)',
}
</script>

<template>
  <div :style="dark">
    <SgTransfer v-model="targetKeys" :data-source="mockData" />
  </div>
</template>
