<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgBreadcrumb, type BreadcrumbItem } from '@skygraph/vue'

const items: BreadcrumbItem[] = [
  { title: 'Home', href: '#' },
  { title: 'Docs', href: '#' },
  { title: 'Breadcrumb' },
]

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-text-secondary': '#94a3b8',
  '--sg-color-primary': '#60a5fa',
}
</script>

<template>
  <div :style="dark">
    <SgBreadcrumb :items="items" />
  </div>
</template>
