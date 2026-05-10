<script setup lang="ts">
/**
 * Empty has no component-private tokens. The illustration uses
 * `--sg-color-text-disabled`, the caption uses
 * `--sg-color-text-tertiary`. Scope those to tweak the mood.
 */
import { SgEmpty } from '@skygraph/vue'

const scoped = {
  '--sg-color-text-disabled': '#7c3aed',
  '--sg-color-text-tertiary': '#4c1d95',
  background: '#faf5ff',
  border: '1px dashed #c4b5fd',
  borderRadius: '12px',
  padding: '16px',
} as Record<string, string>
</script>

<template>
  <div :style="scoped">
    <SgEmpty description="Rebrand me via CSS variables" />
  </div>
</template>
