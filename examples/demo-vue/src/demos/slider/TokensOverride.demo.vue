<script setup lang="ts">
/**
 * Slider uses only global tokens. The fill and handle follow
 * `--sg-color-primary`, the rail follows `--sg-color-border`, so
 * scoping those on a wrapper rebrands the whole control.
 */
import type { CSSProperties } from 'vue'
import { SgSlider } from '@skygraph/vue'

const scoped = {
  '--sg-color-primary': '#f97316',
  '--sg-color-primary-bg': 'rgba(249, 115, 22, 0.2)',
  '--sg-color-border': '#fed7aa',
} as CSSProperties
</script>

<template>
  <div :style="scoped">
    <SgSlider :default-value="60" />
  </div>
</template>
