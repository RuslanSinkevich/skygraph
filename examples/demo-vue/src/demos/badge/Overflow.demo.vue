<script setup lang="ts">
/**
 * Numbers above `overflowCount` collapse to `{overflowCount}+`. The
 * default cap is 99 — bump it up to 999 for inbox-style counters.
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
    <SgBadge :count="99"><div :style="box" /></SgBadge>
    <SgBadge :count="100"><div :style="box" /></SgBadge>
    <SgBadge :count="1000" :overflow-count="999"><div :style="box" /></SgBadge>
  </div>
</template>
