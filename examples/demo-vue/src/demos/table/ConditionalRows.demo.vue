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
/* The Vue Table renders a CSS-grid of `.sg-table-td` cells (rows are
 * `display: contents`), not `<tr><td>`. Target the cell class and use
 * theme-aware tokens so the tint is visible on both light and dark
 * surfaces (a raw `rgba(0,0,0,.03)` vanished on the dark theme). */
.demo-row-archived .sg-table-td {
  color: var(--sg-color-text-tertiary);
  background: var(--sg-color-fill-tertiary);
}
.demo-row-paused .sg-table-td {
  background: var(--sg-color-warning-bg);
}
</style>
