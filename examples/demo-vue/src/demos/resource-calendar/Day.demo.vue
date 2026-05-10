<script setup lang="ts">
/**
 * Hour-level columns. Same dataset, `scale="day"`.
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
  { id: 'a1', resourceId: 'anna', start: dt('2026-05-04T09:00'), end: dt('2026-05-04T13:00'), title: 'Standup', status: 'confirmed' },
  { id: 'a2', resourceId: 'anna', start: dt('2026-05-04T14:00'), end: dt('2026-05-04T18:00'), title: 'Design review', status: 'tentative' },
  { id: 'a3', resourceId: 'boris', start: dt('2026-05-04T10:00'), end: dt('2026-05-04T16:00'), title: 'Coding', status: 'confirmed' },
  { id: 'a4', resourceId: 'clara', start: dt('2026-05-04T11:00'), end: dt('2026-05-04T17:00'), title: 'QA pass', status: 'confirmed' },
]
</script>

<template>
  <SgResourceCalendar
    scale="day"
    :resources="resources"
    :assignments="assignments"
  />
</template>
