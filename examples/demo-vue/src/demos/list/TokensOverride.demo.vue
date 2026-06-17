<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgList } from '@skygraph/vue'
import { shortData } from './data'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-bg-secondary': '#0f172a',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-border': '#475569',
}
</script>

<template>
  <div :style="dark">
    <SgList bordered header="List" :data-source="shortData">
      <template #default="{ item }">
        <div style="padding: 8px 0">{{ item }}</div>
      </template>
    </SgList>
  </div>
</template>
