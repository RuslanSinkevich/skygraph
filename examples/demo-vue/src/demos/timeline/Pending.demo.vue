<script setup lang="ts">
/**
 * `pending` adds a muted tail below the real items — pass a string
 * for custom copy ("Recording...") or `true` for an empty placeholder.
 * Pair with the `dot` slot (and `isPending` flag) to swap the marker,
 * mirroring React's `pendingDot` prop.
 */
import { SgTimeline, type TimelineItem } from '@skygraph/vue'

const items: TimelineItem[] = [
  { content: 'Built release 1.2.0' },
  { content: 'Ran smoke tests', color: 'green' },
  { content: 'Queued deploy' },
]
</script>

<template>
  <SgTimeline :items="items" pending="Deploying to production...">
    <template #dot="{ isPending }">
      <span v-if="isPending" aria-hidden="true">⏳</span>
    </template>
  </SgTimeline>
</template>
