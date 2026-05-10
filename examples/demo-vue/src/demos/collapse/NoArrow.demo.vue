<script setup lang="ts">
/**
 * `showArrow: false` per item hides the chevron while leaving the
 * header clickable. Useful for "always visible" panels where the
 * arrow adds no info (e.g. a single controlled pane).
 */
import { SgCollapse, type CollapseItem } from '@skygraph/vue'

const items: CollapseItem[] = [
  {
    key: '1',
    label: 'Spoiler-free header',
    showArrow: false,
    content: 'No chevron next to me.',
  },
  { key: '2', label: 'Regular header', content: 'Chevron visible on this one.' },
]
</script>

<template>
  <SgCollapse :items="items" :default-active-key="['1']" />
</template>
