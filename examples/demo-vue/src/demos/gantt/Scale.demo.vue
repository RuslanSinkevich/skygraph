<script setup lang="ts">
/**
 * Switch the time-axis granularity at runtime. Bars stay anchored to their
 * dates — only the column width and the snap step (when dragging) change.
 */
import { ref } from 'vue'
import { SgGantt, SgButton } from '@skygraph/vue'
import type { GanttTask } from '@skygraph/vue'

type Scale = 'day' | 'week' | 'month' | 'quarter'

const tasks: GanttTask[] = [
  {
    id: 'q1',
    name: 'Q1 launch',
    start: Date.UTC(2026, 0, 1),
    end: Date.UTC(2026, 2, 31),
    progress: 0.4,
  },
  {
    id: 'q2',
    name: 'Q2 follow-up',
    start: Date.UTC(2026, 3, 1),
    end: Date.UTC(2026, 5, 30),
    dependencies: ['q1'],
  },
  {
    id: 'q3',
    name: 'Q3 audit',
    start: Date.UTC(2026, 6, 1),
    end: Date.UTC(2026, 8, 30),
    dependencies: ['q2'],
  },
]

const scale = ref<Scale>('month')
const scales: Scale[] = ['day', 'week', 'month', 'quarter']
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; gap: 8px">
      <SgButton
        v-for="s in scales"
        :key="s"
        size="small"
        :type="scale === s ? 'primary' : 'default'"
        @click="scale = s"
      >
        {{ s }}
      </SgButton>
    </div>
    <SgGantt
      :tasks="tasks"
      :scale="scale"
      :column-width="scale === 'day' ? 24 : 60"
      :row-height="32"
      :sidebar-width="140"
    />
  </div>
</template>
