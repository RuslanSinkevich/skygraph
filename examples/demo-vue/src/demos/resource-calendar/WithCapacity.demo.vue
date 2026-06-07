<script setup lang="ts">
/**
 * `capacityPerSlot=2` for the room. Three concurrent bookings on 2026-01-05
 * trip the over-capacity rule — the engine emits a `conflict` event which
 * the panel below mirrors.
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
    room: 'Meeting Room A',
    standup: 'Standup',
    designCrit: 'Design crit',
    oneOnOne: '1:1',
    conflicts: 'Conflicts',
  },
  ru: {
    room: 'Переговорная A',
    standup: 'Standup',
    designCrit: 'Дизайн-критика',
    oneOnOne: '1:1',
    conflicts: 'Конфликты',
  },
} as const

const t = useDemoStrings(STRINGS)

const resources = computed<Resource[]>(() => [
  { id: 'room-a', name: t.value.room, color: '#0ea5e9', capacityPerSlot: 2 },
])

function makeInitial(): Assignment[] {
  return [
    {
      id: 'a1',
      resourceId: 'room-a',
      title: t.value.standup,
      start: Date.UTC(2026, 0, 5),
      end: Date.UTC(2026, 0, 6),
    },
    {
      id: 'a2',
      resourceId: 'room-a',
      title: t.value.designCrit,
      start: Date.UTC(2026, 0, 5),
      end: Date.UTC(2026, 0, 7),
    },
    {
      id: 'a3',
      resourceId: 'room-a',
      title: t.value.oneOnOne,
      start: Date.UTC(2026, 0, 5),
      end: Date.UTC(2026, 0, 6),
    },
  ]
}

const assignments = ref<Assignment[]>(makeInitial())
const conflicts = ref<Array<{ a: Assignment; b: Assignment }>>([])

watch(t, () => {
  assignments.value = makeInitial()
  conflicts.value = []
})

function onAssignmentChange(next: Assignment) {
  assignments.value = assignments.value.map((a) => (a.id === next.id ? { ...a, ...next } : a))
}

function onConflict(list: Array<{ a: Assignment; b: Assignment }>) {
  conflicts.value = list
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <SgResourceCalendar
      :resources="resources"
      :assignments="assignments"
      scale="day"
      :column-width="64"
      :row-height="48"
      :sidebar-width="180"
      draggable
      resizable
      :range="{ from: new Date(Date.UTC(2026, 0, 5)), to: new Date(Date.UTC(2026, 0, 10)) }"
      @assignment-change="onAssignmentChange"
      @conflict="onConflict"
    />
    <div class="demo-rc-conflicts">
      <strong>{{ t.conflicts }} ({{ conflicts.length }}):</strong>
      <ul style="margin: 6px 0 0; padding-left: 20px">
        <li v-for="(c, i) in conflicts" :key="i">
          <code>{{ c.a.id }}</code> &amp; <code>{{ c.b.id }}</code>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.demo-rc-conflicts {
  background: var(--sg-color-bg-elevated);
  border: 1px solid var(--sg-color-border);
  border-radius: 6px;
  padding: 12px;
  font-size: 13px;
  color: var(--sg-color-text);
}
</style>
