<script setup lang="ts">
/**
 * InputNumber has no component-specific tokens. It reuses the global
 * form sizing (`--sg-height-*`), border (`--sg-color-border`,
 * `--sg-border-radius`) and background tokens, so scoping those on a
 * wrapper restyles the whole control.
 */
import type { CSSProperties } from 'vue'
import { SgInputNumber } from '@skygraph/vue'

const scoped = {
  '--sg-color-border': '#6366f1',
  '--sg-border-radius': '10px',
  '--sg-color-bg-secondary': '#eef2ff',
  '--sg-color-bg-hover': '#e0e7ff',
  '--sg-color-text': '#312e81',
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
} as CSSProperties
</script>

<template>
  <div :style="scoped">
    <SgInputNumber :default-value="7" :min="0" :max="20" />
    <SgInputNumber size="large" :default-value="1.25" :step="0.25" :precision="2" />
  </div>
</template>
