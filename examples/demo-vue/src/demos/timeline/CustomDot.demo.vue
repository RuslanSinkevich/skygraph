<script setup lang="ts">
/**
 * `dot` slot replaces the ring with any VNode — emoji, icon, letter
 * badge. The connector still threads through its centre, so aim for a
 * ~16px glyph for a tidy line. Mirrors React's `dot: ReactNode`.
 */
import { SgTimeline, type TimelineItem } from '@skygraph/vue'

interface DotItem extends TimelineItem {
  glyph: string
}

const items: DotItem[] = [
  { content: 'Created account', glyph: '🧑' },
  { content: 'Purchased plan', glyph: '💳' },
  { content: 'Shipped project', glyph: '🚀', color: 'green' },
  { content: 'Investigating outage', glyph: '⚠️', color: '#dc2626' },
]
</script>

<template>
  <SgTimeline :items="items">
    <template #dot="{ item }">
      <span aria-hidden="true">{{ (item as DotItem).glyph }}</span>
    </template>
  </SgTimeline>
</template>
