<script setup lang="ts">
/**
 * Deterministic background colour from the name is a common pattern —
 * hash the initials into a palette, apply via inline `style`. The
 * avatar still inherits text colour from `--sg-color-white`.
 */
import { SgAvatar } from '@skygraph/vue'

const palette = ['#f97316', '#22c55e', '#3b82f6', '#a855f7', '#ef4444', '#0ea5e9', '#eab308']

function pickColor(seed: string) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0
  return palette[Math.abs(hash) % palette.length]
}

const people = ['Alice', 'Bob', 'Carol', 'Dmitry', 'Elena', 'Felix', 'Grace']
</script>

<template>
  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap">
    <SgAvatar
      v-for="name in people"
      :key="name"
      :style="{ background: pickColor(name), color: '#fff' }"
      :aria-label="name"
    >
      {{ name.slice(0, 1) }}
    </SgAvatar>
  </div>
</template>
