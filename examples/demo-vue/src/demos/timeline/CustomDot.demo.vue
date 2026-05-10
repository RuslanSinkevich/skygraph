<script setup lang="ts">
/**
 * `dot` replaces the ring with any text — emoji, character or
 * letter badge. The connector still threads through its centre,
 * so aim for a ~16px glyph for a tidy line.
 *
 * Vue note: `TimelineItem.dot` is `string` only — React allows
 * `ReactNode`. Emoji / single letter still works.
 * See findings → `timeline-rich-dot-no-vue`.
 */
import { SgTimeline, type TimelineItem } from '@skygraph/vue'

const items: TimelineItem[] = [
  { content: 'Created account', dot: '🧑' },
  { content: 'Purchased plan', dot: '💳' },
  { content: 'Shipped project', dot: '🚀', color: 'green' },
  { content: 'Investigating outage', dot: '⚠️', color: '#dc2626' },
]
</script>

<template>
  <SgTimeline :items="items" />
</template>
