<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. The dialog teleports to <body> but copies the
// scoped tokens from its mount point, so the scope survives.
import { ref } from 'vue'
import { SgModal, SgButton } from '@skygraph/vue'

const open = ref(false)

const dark = {
  background: '#0f172a',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-text-tertiary': '#94a3b8',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-hover': '#93c5fd',
  '--sg-color-bg-elevated': '#1e293b',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-border': '#475569',
  '--sg-color-border-secondary': '#334155',
}
</script>

<template>
  <div :style="dark">
    <SgButton type="primary" @click="open = true">Open modal</SgButton>
    <SgModal :open="open" title="Scoped tokens" @close="open = false">
      <p>Primary palette is scoped here.</p>
      <template #footer>
        <SgButton @click="open = false">Cancel</SgButton>
        <SgButton type="primary" @click="open = false">Confirm</SgButton>
      </template>
    </SgModal>
  </div>
</template>
