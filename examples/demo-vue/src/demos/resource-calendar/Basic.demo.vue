<script setup lang="ts">
/**
 * Drag a block to move it (snaps to the day step), drag the left/right edges
 * to resize. The two overlapping bookings on Bob will surface as a hatched
 * red `conflict` block until you separate them.
 */
import { ref } from 'vue'
import { SgResourceCalendar } from '@skygraph/vue'
import type {
  ResourceCalendarAssignment as Assignment,
  ResourceCalendarResource as Resource,
} from '@skygraph/vue'

const resources: Resource[] = [
  { id: 'alice', name: 'Alice', color: '#3b82f6' },
  { id: 'bob', name: 'Bob', color: '#f97316' },
  { id: 'carol', name: 'Carol', color: '#10b981' },
  { id: 'dave', name: 'Dave', color: '#a855f7' },
]

const initial: Assignment[] = [
  {
    id: 'a1',
    resourceId: 'alice',
    title: 'Discovery',
    start: Date.UTC(2026, 0, 5),
    end: Date.UTC(2026, 0, 8),
  },
  {
    id: 'a2',
    resourceId: 'alice',
    title: 'Design review',
    start: Date.UTC(2026, 0, 9),
    end: Date.UTC(2026, 0, 11),
  },
  {
    id: 'b1',
    resourceId: 'bob',
    title: 'Backend spike',
    start: Date.UTC(2026, 0, 5),
    end: Date.UTC(2026, 0, 9),
  },
  {
    id: 'b2',
    resourceId: 'bob',
    title: 'API contract',
    start: Date.UTC(2026, 0, 7),
    end: Date.UTC(2026, 0, 10),
  },
  {
    id: 'c1',
    resourceId: 'carol',
    title: 'Onboarding',
    start: Date.UTC(2026, 0, 5),
    end: Date.UTC(2026, 0, 11),
  },
  {
    id: 'd1',
    resourceId: 'dave',
    title: 'QA pass',
    start: Date.UTC(2026, 0, 9),
    end: Date.UTC(2026, 0, 12),
  },
]

const assignments = ref<Assignment[]>(initial)

function onAssignmentChange(next: Assignment) {
  assignments.value = assignments.value.map((a) => (a.id === next.id ? { ...a, ...next } : a))
}
</script>

<template>
  <SgResourceCalendar
    :resources="resources"
    :assignments="assignments"
    scale="day"
    :column-width="48"
    :row-height="48"
    :sidebar-width="140"
    draggable
    resizable
    :range="{ from: new Date(Date.UTC(2026, 0, 5)), to: new Date(Date.UTC(2026, 0, 12)) }"
    @assignment-change="onAssignmentChange"
  />
</template>
