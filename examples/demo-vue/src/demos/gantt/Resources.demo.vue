<script setup lang="ts">
/**
 * Group tasks by resource — three lanes (Anna / Boris / Clara).
 */
import { SgGantt } from '@skygraph/vue'
import type { GanttResource, GanttTask } from '@skygraph/vue'

function days(n: number, base = new Date('2026-05-01')) {
  return new Date(base.getTime() + n * 24 * 3600 * 1000)
}

const resources: GanttResource[] = [
  { id: 'r1', name: 'Anna' },
  { id: 'r2', name: 'Boris' },
  { id: 'r3', name: 'Clara' },
]

const tasks: GanttTask[] = [
  { id: 't1', name: 'Discovery', start: days(0), end: days(4), progress: 100, resourceId: 'r1' },
  { id: 't2', name: 'Design', start: days(3), end: days(8), progress: 70, resourceId: 'r2' },
  { id: 't3', name: 'Build', start: days(7), end: days(15), progress: 40, resourceId: 'r3' },
]
</script>

<template>
  <SgGantt :tasks="tasks" :resources="resources" />
</template>
