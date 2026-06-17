<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { ref } from 'vue'
import { SgPagination } from '@skygraph/vue'

const page = ref(3)

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-border': '#475569',
  '--sg-color-primary': '#60a5fa',
}
</script>

<template>
  <div :style="dark">
    <SgPagination :current="page" :total="120" @change="(p: number) => (page = p)" />
  </div>
</template>
