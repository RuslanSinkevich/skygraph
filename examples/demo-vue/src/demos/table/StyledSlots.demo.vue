<script setup lang="ts">
/**
 * Per-slot class hooks via the `classNames` prop — apply your own
 * BEM-style classes to header rows, body cells, pagination, etc.
 */
import { SgTable } from '@skygraph/vue'
import { makeUserRows, userColumns } from './_data'

const data = makeUserRows(6)
</script>

<template>
  <SgTable
    :columns="userColumns"
    :data="data"
    :class-names="{
      root: 'demo-table-root',
      headerRow: 'demo-table-header-row',
      bodyCell: 'demo-table-body-cell',
    }"
  />
</template>

<style>
.demo-table-root {
  border: 2px solid var(--sg-color-primary, #2563eb);
  border-radius: 12px;
  overflow: hidden;
}
.demo-table-header-row {
  background: linear-gradient(180deg, #eef2ff, #e0e7ff);
  font-weight: 700;
}
.demo-table-body-cell {
  letter-spacing: 0.2px;
}
</style>
