<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgResult, SgButton } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-text-secondary': '#94a3b8',
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
