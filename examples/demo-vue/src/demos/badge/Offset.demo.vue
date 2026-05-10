<script setup lang="ts">
/**
 * `offset` shifts the count / dot by `[right, top]` pixels. Positive
 * right values push it outward, negative values pull it onto the
 * child — useful for overlaying circular avatars.
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
    <SgBadge :count="5" :offset="[-6, 6]">
      <div :style="{ ...box, borderRadius: '50%' }" />
    </SgBadge>
    <SgBadge :count="5" :offset="[8, -4]">
      <div :style="box" />
    </SgBadge>
    <SgBadge dot :offset="[-2, 2]">
      <div :style="{ ...box, borderRadius: '50%' }" />
    </SgBadge>
  </div>
</template>
