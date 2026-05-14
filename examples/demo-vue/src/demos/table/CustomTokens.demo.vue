<script setup lang="ts">
/**
 * Override `--sg-table-*` tokens on a local wrapper to restyle one table
 * without touching the globals. Great for themed pages or dashboard widgets.
 */
import { SgTable, type TableColumn } from '@skygraph/vue'
import { people } from './_data'

const columns: TableColumn[] = [
  { key: 'name', title: 'Name', width: 180 },
  { key: 'age', title: 'Age', width: 80, align: 'center' },
  { key: 'salary', title: 'Salary', width: 120, align: 'right' },
]
</script>

<template>
  <div class="demo-table-tokens">
    <SgTable :columns="columns" :data="people" :page-size="5">
      <template #cell="{ column, value }">
        <template v-if="column.key === 'salary'">${{ Number(value).toLocaleString() }}</template>
        <template v-else>{{ value }}</template>
      </template>
    </SgTable>
  </div>
</template>

<style>
.demo-table-tokens {
  width: 100%;
  --sg-table-header-bg: color-mix(in srgb, var(--sg-color-primary-bg) 55%, var(--sg-color-bg) 45%);
  --sg-table-row-hover-bg: var(--sg-color-primary-bg);
  --sg-table-border-color: color-mix(
    in srgb,
    var(--sg-color-primary) 25%,
    var(--sg-color-border-secondary) 75%
  );
  --sg-table-cell-padding: 10px 12px;
}
</style>
