<script setup lang="ts">
/**
 * Default week-scale view with daily columns.
 */
import { SgResourceCalendar } from '@skygraph/vue'
import type { ResourceCalendarAssignment, ResourceCalendarResource } from '@skygraph/vue'

const resources: ResourceCalendarResource[] = [
  { id: 'anna', name: 'Anna' },
  { id: 'boris', name: 'Boris' },
  { id: 'clara', name: 'Clara' },
]

function dt(s: string) {
  return new Date(s)
}

const assignments: ResourceCalendarAssignment[] = [
  { id: 'a1', resourceId: 'anna', start: dt('2026-05-04T09:00'), end: dt('2026-05-05T18:00'), title: 'Project A', status: 'confirmed' },
  { id: 'a2', resourceId: 'anna', start: dt('2026-05-07T09:00'), end: dt('2026-05-08T13:00'), title: 'Code review', status: 'tentative' },
  { id: 'a3', resourceId: 'boris', start: dt('2026-05-05T10:00'), end: dt('2026-05-06T16:00'), title: 'Design sprint', status: 'confirmed' },
  { id: 'a4', resourceId: 'clara', start: dt('2026-05-04T14:00'), end: dt('2026-05-05T17:00'), title: 'QA pass', status: 'confirmed' },
  { id: 'a5', resourceId: 'clara', start: dt('2026-05-08T10:00'), end: dt('2026-05-09T15:00'), title: 'Release', status: 'tentative' },
]
</script>

<template>
  <SgResourceCalendar :resources="resources" :assignments="assignments" />
</template>
