<script setup lang="ts">
/**
 * `rowClassName` accepts a string or a `(row, id) => string` to
 * decorate rows based on their data. Here, archived rows are dimmed
 * and paused rows highlighted.
 */
import { SgTable } from '@skygraph/vue'
import { makeUserRows, userColumns } from './_data'

const data = makeUserRows(8)

function rowClass(row: Record<string, unknown>): string {
  if (row.status === 'archived') return 'demo-row-archived'
  if (row.status === 'paused') return 'demo-row-paused'
  return ''
}
</script>

<template>
  <SgTable :columns="userColumns" :data="data" :row-class-name="rowClass" />
</template>

<style>
.demo-row-archived td {
  color: var(--sg-color-text-secondary);
  background: rgba(0, 0, 0, 0.03);
}
.demo-row-paused td {
  background: rgba(217, 119, 6, 0.1);
}
</style>
