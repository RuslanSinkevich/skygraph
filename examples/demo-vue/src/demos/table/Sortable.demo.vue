<script setup lang="ts">
/**
 * Click a sortable header to toggle: asc → desc → unsorted. Built-in
 * single-column sort (Vue surface does not ship composite sorts yet).
 */
import { SgTable, type TableColumn } from '@skygraph/vue'
import { people } from './_data'

const columns: TableColumn[] = [
  { key: 'name', title: 'Name', sortable: true, width: 180 },
  { key: 'age', title: 'Age', sortable: true, width: 90, align: 'center' },
  { key: 'city', title: 'City', sortable: true, width: 130 },
  { key: 'role', title: 'Role', sortable: true, width: 130 },
  { key: 'salary', title: 'Salary', sortable: true, width: 120, align: 'right' },
]
</script>

<template>
  <SgTable :columns="columns" :data="people" :page-size="6">
    <template #cell="{ column, value }">
      <template v-if="column.key === 'salary'">${{ Number(value).toLocaleString() }}</template>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>
</template>
