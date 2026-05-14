<script setup lang="ts">
/**
 * The `#cell` slot can return any Vue template — drop in `SgProgress`,
 * `SgTag`, or any other component. Cell tone reacts to the value itself
 * (red when over-budget, amber when approaching it) without touching
 * the Table.
 */
import { SgTable, SgProgress, SgTag, type TableColumn } from '@skygraph/vue'
import { projects } from './_data'

const columns: TableColumn[] = [
  { key: 'name', title: 'Project', width: 200 },
  { key: 'owner', title: 'Owner', width: 110 },
  { key: 'progress', title: 'Progress', width: 220 },
  { key: 'budgetUsed', title: 'Budget used', width: 140, align: 'right' },
  { key: 'deadline', title: 'Deadline', width: 130 },
]

function budgetColor(n: number): string {
  if (n >= 90) return 'var(--sg-color-error)'
  if (n >= 70) return 'var(--sg-color-warning)'
  return 'var(--sg-color-success)'
}

function deadlineTone(value: unknown): 'error' | 'warning' | 'default' {
  const d = new Date(String(value))
  const daysLeft = Math.round((d.getTime() - Date.now()) / 86_400_000)
  if (daysLeft < 14) return 'error'
  if (daysLeft < 45) return 'warning'
  return 'default'
}
</script>

<template>
  <SgTable :columns="columns" :data="projects" :show-pagination="false">
    <template #cell="{ column, value }">
      <template v-if="column.key === 'progress'">
        <SgProgress
          :percent="Number(value)"
          :status="Number(value) >= 100 ? 'success' : Number(value) < 50 ? 'active' : 'normal'"
          size="small"
        />
      </template>
      <template v-else-if="column.key === 'budgetUsed'">
        <span :style="{ color: budgetColor(Number(value)), fontWeight: 600 }">
          {{ Number(value) }}%
        </span>
      </template>
      <template v-else-if="column.key === 'deadline'">
        <SgTag :color="deadlineTone(value)">{{ String(value) }}</SgTag>
      </template>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>
</template>
