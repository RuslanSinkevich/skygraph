<script setup lang="ts">
/**
 * Per-column `filters` array renders a header dropdown. `onFilter`
 * decides whether a row matches the chosen value.
 */
import { computed } from 'vue'
import { SgTable, type TableColumn } from '@skygraph/vue'
import { makeUserRows } from './_data'

const data = makeUserRows(20)

const columns = computed<TableColumn[]>(() => [
  { key: 'name', title: 'Name', sortable: true },
  {
    key: 'role',
    title: 'Role',
    filters: [
      { text: 'Admin', value: 'Admin' },
      { text: 'Editor', value: 'Editor' },
      { text: 'Viewer', value: 'Viewer' },
    ],
    onFilter: (value, row) => row.role === value,
  },
  {
    key: 'team',
    title: 'Team',
    filters: [
      { text: 'Apollo', value: 'Apollo' },
      { text: 'Hermes', value: 'Hermes' },
      { text: 'Zeus', value: 'Zeus' },
      { text: 'Hera', value: 'Hera' },
      { text: 'Athena', value: 'Athena' },
    ],
    onFilter: (value, row) => row.team === value,
  },
  { key: 'status', title: 'Status', align: 'center' },
])
</script>

<template>
  <SgTable :page-size="8" :columns="columns" :data="data" />
</template>
