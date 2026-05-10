<script setup lang="ts">
/**
 * ColorPicker has no component-specific tokens — it composes the
 * global form tokens for the trigger and the global surface tokens
 * for the dropdown. Scope those globals on a wrapper to rebrand.
 */
import type { CSSProperties } from 'vue'
import { SgColorPicker } from '@skygraph/vue'

const scoped = {
  '--sg-color-border': '#c4b5fd',
  '--sg-color-primary': '#7c3aed',
  '--sg-color-primary-hover': '#a855f7',
  '--sg-color-primary-bg': 'rgba(124, 58, 237, 0.15)',
  '--sg-border-radius': '10px',
  '--sg-border-radius-sm': '6px',
  '--sg-color-bg-elevated': '#f5f3ff',
} as CSSProperties
</script>

<template>
  <div :style="scoped">
    <SgColorPicker default-value="#7c3aed" show-text />
  </div>
</template>
