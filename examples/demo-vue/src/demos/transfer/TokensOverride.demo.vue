<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { ref } from 'vue'
import { SgTransfer } from '@skygraph/vue'
import { mockData } from './data'

const targetKeys = ref(['1', '3'])

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-bg-secondary': '#0f172a',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-border': '#475569',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.28)',
}
</script>

<template>
  <div :style="dark">
    <SgTransfer v-model="targetKeys" :data-source="mockData" />
  </div>
</template>
