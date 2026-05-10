<script setup lang="ts">
/**
 * Progress has no component-private tokens — scope the theme
 * primitives it reads (`--sg-color-primary`, `--sg-color-bg-hover`,
 * `--sg-color-success/error`) on a wrapper to rebrand every bar
 * and ring inside.
 */
import { SgProgress } from '@skygraph/vue'

const scoped = {
  '--sg-color-primary': '#7c3aed',
  '--sg-color-bg-hover': '#ede9fe',
  '--sg-color-success': '#0ea5e9',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  maxWidth: '400px',
} as Record<string, string>
</script>

<template>
  <div :style="scoped">
    <SgProgress :percent="35" />
    <SgProgress :percent="75" status="active" />
    <SgProgress :percent="100" />
  </div>
</template>
