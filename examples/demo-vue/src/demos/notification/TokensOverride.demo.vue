<script setup lang="ts">
// Toasts render in a global container, so the scoped recipe is passed as the
// toast's own `style` — the same `--sg-*` variables, applied per popup.
import { SgButton, notification } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  '--sg-color-error-bg': 'rgba(248, 113, 113, 0.16)',
  '--sg-color-warning-bg': 'rgba(251, 191, 36, 0.16)',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.16)',
  '--sg-color-text-tertiary': '#94a3b8',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-primary': '#60a5fa',
}

const toast = {
  '--sg-color-bg-elevated': '#1e293b',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-success': '#34d399',
  '--sg-color-success-bg': 'rgba(52, 211, 153, 0.16)',
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
