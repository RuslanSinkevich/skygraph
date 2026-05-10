<script setup lang="ts">
/**
 * Two tokens matter for Spin: `--sg-spin-color` for the ring
 * and `--sg-spin-overlay-bg` for the backdrop covering wrapped
 * content. Both can be scoped on a wrapper for scoped rebrands.
 */
import { SgSpin } from '@skygraph/vue'

const scoped = {
  '--sg-spin-color': '#f59e0b',
  '--sg-spin-overlay-bg': 'rgba(251, 191, 36, 0.2)',
  padding: '16px',
  background: 'var(--sg-color-bg-container)',
  borderRadius: 'var(--sg-border-radius)',
  border: '1px solid var(--sg-color-border)',
} as Record<string, string>
</script>

<template>
  <div :style="scoped">
    <SgSpin spinning tip="Loading...">
      <div style="padding: 24px">
        <p>Wrapped content — blurred by the amber overlay.</p>
      </div>
    </SgSpin>
  </div>
</template>
