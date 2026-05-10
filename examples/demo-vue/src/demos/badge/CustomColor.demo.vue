<script setup lang="ts">
/**
 * `color` overrides the count / dot background with any CSS colour.
 * Pass a token reference like `var(--sg-color-primary)` to stay
 * theme-aware, or a raw hex for one-off colours.
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
    <SgBadge color="#722ed1" :count="5"><div :style="box" /></SgBadge>
    <SgBadge color="#eb2f96" :count="12"><div :style="box" /></SgBadge>
    <SgBadge color="#16a34a" dot><div :style="box" /></SgBadge>
    <SgBadge color="var(--sg-color-primary)" :count="3"><div :style="box" /></SgBadge>
  </div>
</template>
