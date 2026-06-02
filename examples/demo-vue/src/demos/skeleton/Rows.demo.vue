<script setup lang="ts">
/**
 * Control the paragraph block with `{ rows, width }`. Match the
 * expected content shape — too few lines feel off when the real
 * paragraph is a wall of text, too many look spammy.
 * Mirrors React `skeleton/Rows.demo.tsx`.
 */
import { SgSkeleton } from '@skygraph/vue'

const cardStyle = {
  padding: '14px 16px',
  border: '1px solid var(--sg-color-border-secondary)',
  borderRadius: '12px',
  background: 'var(--sg-color-bg-container)',
}

const labelStyle = {
  display: 'inline-block',
  marginBottom: '12px',
  padding: '2px 8px',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase' as const,
  color: 'var(--sg-color-primary)',
  background: 'var(--sg-color-primary-bg)',
  borderRadius: '6px',
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <div :style="cardStyle">
      <span :style="labelStyle">2 rows · default widths</span>
      <SgSkeleton active :paragraph="{ rows: 2 }" />
    </div>
    <div :style="cardStyle">
      <span :style="labelStyle">5 rows · default widths</span>
      <SgSkeleton active :paragraph="{ rows: 5 }" />
    </div>
    <div :style="cardStyle">
      <span :style="labelStyle">4 rows · custom widths [100%, 90%, 80%, 40%]</span>
      <SgSkeleton active :paragraph="{ rows: 4, width: ['100%', '90%', '80%', '40%'] }" />
    </div>
  </div>
</template>
