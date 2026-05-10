<script setup lang="ts">
/**
 * `color` applies only to the default ring — it sets both
 * `border-color` and `color` inline. Any CSS colour works,
 * including token references like `var(--sg-color-success)`.
 */
import { SgTimeline, type TimelineItem } from '@skygraph/vue'

const items: TimelineItem[] = [
  { content: 'Primary (default ring)' },
  { content: 'Success ring', color: 'var(--sg-color-success)' },
  { content: 'Warning ring', color: '#d97706' },
  { content: 'Custom purple', color: '#7c3aed' },
]
</script>

<template>
  <SgTimeline :items="items" />
</template>
