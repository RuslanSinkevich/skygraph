<script setup lang="ts">
// Toasts render in a global container, so the scoped recipe is passed as the
// toast's own `style` — the same `--sg-*` variables, applied per popup.
import { SgButton, notification } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-primary': '#60a5fa',
}

const toast = {
  '--sg-color-bg-elevated': '#1f2937',
  '--sg-color-border-secondary': '#475569',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-success': '#34d399',
  '--sg-color-success-bg': 'rgba(52, 211, 153, 0.18)',
}

function fire() {
  notification.open({
    type: 'success',
    message: 'Backup complete',
    description: 'Tint follows --sg-color-success.',
    style: toast,
  })
}
</script>

<template>
  <div :style="dark">
    <SgButton type="primary" @click="fire">Open styled toast</SgButton>
  </div>
</template>
