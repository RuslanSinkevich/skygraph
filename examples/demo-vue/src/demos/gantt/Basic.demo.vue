<script setup lang="ts">
/**
 * Drag bars to move them along the day axis (snaps to whole days), drag the
 * right edge to extend the deadline. The dependency arrows follow tasks live
 * thanks to `routeOrthogonal` from `@skygraph/core`.
 */
import { computed, ref, watch } from 'vue'
import { SgGantt } from '@skygraph/vue'
import type { GanttResource, GanttTask } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    design: 'Design',
    engineering: 'Engineering',
    qa: 'QA',
    spec: 'Spec',
    mocks: 'Mocks',
    core: 'Core impl',
    qaPass: 'QA pass',
  },
  ru: {
    design: 'Дизайн',
    engineering: 'Разработка',
    qa: 'QA',
    spec: 'Спецификация',
    mocks: 'Макеты',
    core: 'Core-реализация',
    qaPass: 'QA-проверка',
  },
} as const

const t = useDemoStrings(STRINGS)

const resources = computed<GanttResource[]>(() => [
  { id: 'design', name: t.value.design },
  { id: 'eng', name: t.value.engineering },
  { id: 'qa', name: t.value.qa },
])

function makeInitial(): GanttTask[] {
  return [
    {
      id: 'spec',
      name: t.value.spec,
      start: Date.UTC(2026, 0, 5),
      end: Date.UTC(2026, 0, 9),
      progress: 1,
      resourceId: 'design',
    },
    {
      id: 'mocks',
      name: t.value.mocks,
      start: Date.UTC(2026, 0, 8),
      end: Date.UTC(2026, 0, 14),
      progress: 0.6,
      resourceId: 'design',
      dependencies: ['spec'],
    },
    {
      id: 'core',
      name: t.value.core,
      start: Date.UTC(2026, 0, 12),
      end: Date.UTC(2026, 0, 22),
      progress: 0.3,
      resourceId: 'eng',
      dependencies: ['mocks'],
      color: '#7d4eff',
    },
    {
      id: 'qa-pass',
      name: t.value.qaPass,
      start: Date.UTC(2026, 0, 20),
      end: Date.UTC(2026, 0, 26),
      resourceId: 'qa',
      dependencies: ['core'],
    },
  ]
}

const tasks = ref<GanttTask[]>(makeInitial())

watch(t, () => {
  tasks.value = makeInitial()
})

function onTaskChange(next: GanttTask) {
  tasks.value = tasks.value.map((t) => (t.id === next.id ? { ...t, ...next } : t))
}
</script>

<template>
  <SgGantt
    :tasks="tasks"
    :resources="resources"
    scale="day"
    :column-width="36"
    :row-height="36"
    :sidebar-width="140"
    draggable
    resizable
    @task-change="onTaskChange"
  />
</template>
