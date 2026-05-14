<script setup lang="ts">
/**
 * Drag bars to move them along the day axis (snaps to whole days), drag the
 * right edge to extend the deadline. The dependency arrows follow tasks live
 * thanks to `routeOrthogonal` from `@skygraph/core`.
 */
import { ref } from 'vue'
import { SgGantt } from '@skygraph/vue'
import type { GanttResource, GanttTask } from '@skygraph/vue'

const resources: GanttResource[] = [
  { id: 'design', name: 'Design' },
  { id: 'eng', name: 'Engineering' },
  { id: 'qa', name: 'QA' },
]

const initial: GanttTask[] = [
  {
    id: 'spec',
    name: 'Spec',
    start: Date.UTC(2026, 0, 5),
    end: Date.UTC(2026, 0, 9),
    progress: 1,
    resourceId: 'design',
  },
  {
    id: 'mocks',
    name: 'Mocks',
    start: Date.UTC(2026, 0, 8),
    end: Date.UTC(2026, 0, 14),
    progress: 0.6,
    resourceId: 'design',
    dependencies: ['spec'],
  },
  {
    id: 'core',
    name: 'Core impl',
    start: Date.UTC(2026, 0, 12),
    end: Date.UTC(2026, 0, 22),
    progress: 0.3,
    resourceId: 'eng',
    dependencies: ['mocks'],
    color: '#7d4eff',
  },
  {
    id: 'qa-pass',
    name: 'QA pass',
    start: Date.UTC(2026, 0, 20),
    end: Date.UTC(2026, 0, 26),
    resourceId: 'qa',
    dependencies: ['core'],
  },
]

const tasks = ref<GanttTask[]>(initial)

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
