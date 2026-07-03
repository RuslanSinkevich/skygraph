<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgResult, SgButton } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg': '#1e293b',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-success': '#34d399',
  '--sg-color-primary': '#60a5fa',
}
</script>

<template>
  <div :style="dark">
    <SgResult status="success" title="All good" sub-title="Scoped via tokens">
      <template #extra>
        <SgButton type="primary">Continue</SgButton>
      </template>
    </SgResult>
  </div>
</template>
