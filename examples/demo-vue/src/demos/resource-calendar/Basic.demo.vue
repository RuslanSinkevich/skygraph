<script setup lang="ts">
/**
 * Drag a block to move it (snaps to the day step), drag the left/right edges
 * to resize. The two overlapping bookings on Bob will surface as a hatched
 * red `conflict` block until you separate them.
 */
import { computed, ref, watch } from 'vue'
import { SgResourceCalendar } from '@skygraph/vue'
import type {
  ResourceCalendarAssignment as Assignment,
  ResourceCalendarResource as Resource,
} from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    discovery: 'Discovery',
    designReview: 'Design review',
    backendSpike: 'Backend spike',
    apiContract: 'API contract',
    onboarding: 'Onboarding',
    qaPass: 'QA pass',
  },
  ru: {
    discovery: 'Discovery',
    designReview: 'Дизайн-ревью',
    backendSpike: 'Backend spike',
    apiContract: 'API-контракт',
    onboarding: 'Онбординг',
    qaPass: 'QA-проверка',
  },
} as const

const t = useDemoStrings(STRINGS)

const resources = computed<Resource[]>(() => [
  { id: 'alice', name: 'Alice', color: '#3b82f6' },
  { id: 'bob', name: 'Bob', color: '#f97316' },
  { id: 'carol', name: 'Carol', color: '#10b981' },
  { id: 'dave', name: 'Dave', color: '#a855f7' },
])

function makeInitial(): Assignment[] {
  return [
    {
      id: 'a1',
      resourceId: 'alice',
      title: t.value.discovery,
      start: Date.UTC(2026, 0, 5),
      end: Date.UTC(2026, 0, 8),
    },
    {
      id: 'a2',
      resourceId: 'alice',
      title: t.value.designReview,
      start: Date.UTC(2026, 0, 9),
      end: Date.UTC(2026, 0, 11),
    },
    {
      id: 'b1',
      resourceId: 'bob',
      title: t.value.backendSpike,
      start: Date.UTC(2026, 0, 5),
      end: Date.UTC(2026, 0, 9),
    },
    {
      id: 'b2',
      resourceId: 'bob',
      title: t.value.apiContract,
      start: Date.UTC(2026, 0, 7),
      end: Date.UTC(2026, 0, 10),
    },
    {
      id: 'c1',
      resourceId: 'carol',
      title: t.value.onboarding,
      start: Date.UTC(2026, 0, 5),
      end: Date.UTC(2026, 0, 11),
    },
    {
      id: 'd1',
      resourceId: 'dave',
      title: t.value.qaPass,
      start: Date.UTC(2026, 0, 9),
      end: Date.UTC(2026, 0, 12),
    },
  ]
}

const assignments = ref<Assignment[]>(makeInitial())

watch(t, () => {
  assignments.value = makeInitial()
})

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
