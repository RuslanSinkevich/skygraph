<script setup lang="ts">
/**
 * Pass an `events` array — Calendar renders them as plain text rows
 * inside each cell.
 *
 * Vue delta: `CalendarEvent` shape uses `id` / `title` / `type` (no
 * `key` / `color`); there is no `maxEvents` cap, the cell scrolls all
 * matched events. See `findings/T-Vue-Demo-Forms.md` →
 * `calendar-vue-feature-gaps`.
 */
import { SgCalendar } from '@skygraph/vue'
import type { CalendarEvent } from '@skygraph/vue'

const today = new Date()
const d = (delta: number) =>
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + delta)

const events: CalendarEvent[] = [
  { id: 'standup', date: d(0), title: 'Standup', type: 'primary' },
  { id: 'review', date: d(0), title: 'Design review', type: 'warning' },
  { id: 'release', date: d(1), title: 'Release v0.4', type: 'success' },
  { id: 'onboard', date: d(1), title: 'New hire onboarding', type: 'success' },
  { id: 'q-plan', date: d(3), title: 'Quarter planning', type: 'error' },
  { id: 'sync', date: d(-2), title: 'Customer sync', type: 'primary' },
]
</script>

<template>
  <div style="max-width: 520px">
    <SgCalendar :events="events" />
  </div>
</template>
