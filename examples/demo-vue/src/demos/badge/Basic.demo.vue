<script setup lang="ts">
/**
 * Badge wraps a child and pins a count to its top-right corner.
 * A `count` of 0 is hidden unless `showZero` is set — that lets you
 * drop the Badge in unconditionally without conditionals upstream.
 */
import { ref } from 'vue'
import { SgBadge, SgButton } from '@skygraph/vue'

const count = ref(5)

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
  <div>
    <div style="display: flex; gap: 24px">
      <SgBadge :count="count">
        <div :style="box" />
      </SgBadge>
      <SgBadge :count="0" show-zero>
        <div :style="box" />
      </SgBadge>
    </div>
    <div style="margin-top: 12px; display: flex; gap: 8px">
      <SgButton size="small" @click="count = Math.max(0, count - 1)">−</SgButton>
      <SgButton size="small" @click="count = count + 1">+</SgButton>
    </div>
  </div>
</template>
