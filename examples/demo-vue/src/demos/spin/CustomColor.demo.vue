<script setup lang="ts">
/**
 * `--sg-spin-color` is the one token that controls the ring.
 * Scope it on a wrapper for per-section brand tints without
 * touching the global `--sg-color-primary`.
 */
import { SgSpin } from '@skygraph/vue'

const rose = { '--sg-spin-color': '#e11d48' } as Record<string, string>
const green = { '--sg-spin-color': '#059669' } as Record<string, string>
</script>

<template>
  <div style="display: flex; gap: 24px; align-items: center">
    <div :style="rose">
      <SgSpin size="large" />
    </div>
    <div :style="green">
      <SgSpin size="large" />
    </div>
    <SgSpin size="large" />
  </div>
</template>
