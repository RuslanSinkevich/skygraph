<script setup lang="ts">
/**
 * Week-scale Gantt — wider columns, fewer ticks.
 * Mirrors the spirit of React `Scale.demo.tsx` (which adds a runtime
 * scale-switcher); Vue page kept it simpler at one fixed scale.
 */
import { SgGantt } from '@skygraph/vue'
import type { GanttTask } from '@skygraph/vue'

function days(n: number, base = new Date('2026-05-01')) {
  return new Date(base.getTime() + n * 24 * 3600 * 1000)
}

const tasks: GanttTask[] = [
  { id: 't1', name: 'Discovery', start: days(0), end: days(4), progress: 100 },
  { id: 't2', name: 'Design', start: days(3), end: days(8), progress: 70 },
  { id: 't3', name: 'Build', start: days(7), end: days(15), progress: 40 },
  { id: 't4', name: 'QA', start: days(13), end: days(18), progress: 10 },
  { id: 't5', name: 'Launch', start: days(17), end: days(20), progress: 0 },
]
</script>

<template>
  <SgGantt :tasks="tasks" scale="week" :column-width="60" />
</template>
