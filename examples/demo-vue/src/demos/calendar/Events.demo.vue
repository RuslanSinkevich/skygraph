<script setup lang="ts">
/**
 * Pass an `events` array — Calendar renders coloured dots per cell. The
 * `max-events` prop caps the visible dot count; the rest is collapsed
 * into a `+N` overflow indicator.
 */
import { SgCalendar } from '@skygraph/vue'
import type { CalendarEvent } from '@skygraph/vue'

const today = new Date()
const d = (delta: number) =>
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + delta)

const events: CalendarEvent[] = [
  { id: 'standup', date: d(0), title: 'Standup', type: 'primary', color: 'var(--sg-blue-6)' },
  { id: 'review', date: d(0), title: 'Design review', type: 'warning', color: 'var(--sg-gold-6)' },
  { id: 'release', date: d(1), title: 'Release v0.4', type: 'success', color: 'var(--sg-green-6)' },
  {
    id: 'onboard',
    date: d(1),
    title: 'New hire onboarding',
    type: 'success',
    color: 'var(--sg-green-6)',
  },
  { id: 'q-plan', date: d(3), title: 'Quarter planning', type: 'error', color: 'var(--sg-red-6)' },
  { id: 'sync', date: d(-2), title: 'Customer sync', type: 'primary', color: 'var(--sg-blue-6)' },
]
</script>

<template>
  <div style="max-width: 520px">
    <SgCalendar :events="events" :max-events="3" />
  </div>
</template>
