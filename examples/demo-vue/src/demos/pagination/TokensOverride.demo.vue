<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { ref } from 'vue'
import { SgPagination } from '@skygraph/vue'

const page = ref(3)

const dark = {
  background: '#0f172a',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.16)',
  '--sg-color-text-disabled': '#64748b',
  '--sg-color-text-secondary': '#cbd5e1',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg': '#0f172a',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-text': '#f8fafc',
  '--sg-color-border': '#475569',
  '--sg-color-primary': '#60a5fa',
}
</script>

<template>
  <div :style="dark">
    <SgPagination :current="page" :total="120" @change="(p: number) => (page = p)" />
  </div>
</template>
