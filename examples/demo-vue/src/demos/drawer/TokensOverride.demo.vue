<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. The drawer teleports to <body> but copies the
// scoped tokens from its mount point, so the scope survives.
import { ref } from 'vue'
import { SgDrawer, SgButton } from '@skygraph/vue'

const open = ref(false)

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-bg-elevated': '#1e293b',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-shadow-lg': '0 18px 38px -16px rgba(0, 0, 0, 0.55)',
}
</script>

<template>
  <div :style="dark">
    <SgButton type="primary" @click="open = true">Open drawer</SgButton>
    <SgDrawer :open="open" title="Scoped drawer" @close="open = false">
      <p>Panel, mask and shadow follow the scoped tokens.</p>
    </SgDrawer>
  </div>
</template>
