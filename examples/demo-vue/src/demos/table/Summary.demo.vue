<script setup lang="ts">
/**
 * `summary` returns an array of rows, each row an array of cells. Useful for
 * totals, averages or any aggregate. Cells support colSpan/align like header
 * cells.
 */
import {
  SgTable,
  type TableColumn,
  type TableSummaryCell as SummaryCell,
  type RowId,
} from '@skygraph/vue'
import { people } from './_data'

const columns: TableColumn[] = [
  { key: 'name', title: 'Name', width: 180 },
  { key: 'role', title: 'Role', width: 150 },
  { key: 'salary', title: 'Salary', width: 120, align: 'right' },
]

function summary(rows: Array<{ id: RowId; data: Record<string, unknown> }>): SummaryCell[][] {
  const total = rows.reduce((sum, r) => sum + (Number(r.data.salary) || 0), 0)
  const avg = rows.length ? Math.round(total / rows.length) : 0
  return [
    [
      { content: `Total: ${rows.length} people`, colSpan: 2 },
      { content: `$${total.toLocaleString()}`, align: 'right' as const },
    ],
    [
      { content: 'Average', colSpan: 2 },
      { content: `$${avg.toLocaleString()}`, align: 'right' as const },
    ],
  ]
}
</script>

<template>
  <SgTable :columns="columns" :data="people" :show-pagination="false" :summary="summary" />
</template>
