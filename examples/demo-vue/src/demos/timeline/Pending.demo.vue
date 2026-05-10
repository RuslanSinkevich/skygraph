<script setup lang="ts">
/**
 * `pending` adds a muted tail below the real items — pass a
 * string for custom copy ("Recording...") or `true` for an
 * empty placeholder.
 *
 * Vue note: there is no `pendingDot` prop in `@skygraph/vue` —
 * the React analogue accepts `ReactNode` for the pending dot.
 * See findings → `timeline-pending-dot-no-vue`.
 */
import { SgTimeline, type TimelineItem } from '@skygraph/vue'

const items: TimelineItem[] = [
  { content: 'Built release 1.2.0' },
  { content: 'Ran smoke tests', color: 'green' },
  { content: 'Queued deploy' },
]
</script>

<template>
  <SgTimeline :items="items" pending="Deploying to production..." />
</template>
