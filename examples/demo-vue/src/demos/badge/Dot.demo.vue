<script setup lang="ts">
/**
 * `dot` renders a pill-less 8×8 indicator — use it for "has
 * unread activity" signals where the exact number is noise.
 */
import { SgBadge } from '@skygraph/vue'

const box = {
  width: '42px',
  height: '42px',
  borderRadius: '6px',
  background: 'var(--sg-color-bg-container)',
  border: '1px solid var(--sg-color-border)',
  boxShadow: 'inset 0 0 0 1px color-mix(in srgb, white 55%, transparent)',
  display: 'inline-block',
}
</script>

<template>
  <div style="display: flex; gap: 24px">
    <SgBadge dot>
      <div :style="box" />
    </SgBadge>
    <SgBadge dot color="var(--sg-color-success)">
      <div :style="box" />
    </SgBadge>
    <SgBadge dot color="var(--sg-color-warning)">
      <div :style="box" />
    </SgBadge>
  </div>
</template>
