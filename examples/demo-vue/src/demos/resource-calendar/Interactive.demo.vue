<script setup lang="ts">
/**
 * Drag and resize on assignment bars (`draggable + resizable`).
 * Mirrors React `examples/demo/src/demos/resource-calendar/Basic.demo.tsx`
 * which also keeps interactive bars on by default.
 */
import { ref } from 'vue'
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

const assignments = ref<ResourceCalendarAssignment[]>([
  { id: 'a1', resourceId: 'anna', start: dt('2026-05-04T09:00'), end: dt('2026-05-05T18:00'), title: 'Project A', status: 'confirmed' },
  { id: 'a2', resourceId: 'boris', start: dt('2026-05-05T10:00'), end: dt('2026-05-06T16:00'), title: 'Design sprint', status: 'confirmed' },
  { id: 'a3', resourceId: 'clara', start: dt('2026-05-04T14:00'), end: dt('2026-05-05T17:00'), title: 'QA pass', status: 'tentative' },
])

function onAssignmentChange(next: ResourceCalendarAssignment) {
  const idx = assignments.value.findIndex((a) => a.id === next.id)
  if (idx >= 0) assignments.value.splice(idx, 1, next)
}
</script>

<template>
  <SgResourceCalendar
    draggable
    resizable
    :resources="resources"
    :assignments="assignments"
    @assignmentChange="onAssignmentChange"
  />
</template>
