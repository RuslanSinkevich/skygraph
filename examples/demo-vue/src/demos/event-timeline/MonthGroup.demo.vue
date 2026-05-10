<script setup lang="ts">
/**
 * Coarser grouping for long ranges (groupBy="month").
 * Vue-only example — React uses `groupBy="day"` everywhere.
 */
import { SgEventTimeline } from '@skygraph/vue'
import type { TimelineEvent } from '@skygraph/vue'

function date(s: string) {
  return new Date(s)
}

const events: TimelineEvent[] = [
  { id: '1', date: date('2026-04-12T08:30'), title: 'Repo created', description: 'Project bootstrap' },
  { id: '2', date: date('2026-04-12T14:00'), title: 'CI pipeline added' },
  { id: '3', date: date('2026-04-15T11:00'), title: 'First release', color: 'var(--sg-color-success)' },
  { id: '4', date: date('2026-04-22T10:00'), title: 'Schema v2', description: 'Breaking change' },
  { id: '5', date: date('2026-05-01T16:00'), title: 'New theme', color: 'var(--sg-color-warning)' },
  { id: '6', date: date('2026-05-05T09:00'), title: 'Performance pass' },
]
</script>

<template>
  <SgEventTimeline group-by="month" :events="events" />
</template>
