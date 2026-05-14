<script setup lang="ts">
/**
 * Per-column `filters` array renders a header dropdown. `onFilter` decides
 * whether a row matches the chosen value.
 */
import { SgTable, SgBadge, type TableColumn } from '@skygraph/vue'
import { people } from './_data'

const columns: TableColumn[] = [
  { key: 'name', title: 'Name', width: 180, sortable: true },
  { key: 'age', title: 'Age', width: 80, align: 'center', sortable: true },
  { key: 'city', title: 'City', width: 150 },
  {
    key: 'role',
    title: 'Role',
    width: 150,
    filters: [
      { text: 'Developer', value: 'Developer' },
      { text: 'Designer', value: 'Designer' },
      { text: 'Manager', value: 'Manager' },
      { text: 'QA', value: 'QA' },
    ],
    onFilter: (value, row) => row.role === value,
  },
  {
    key: 'status',
    title: 'Status',
    width: 110,
    filters: [
      { text: 'Active', value: 'active' },
      { text: 'Inactive', value: 'inactive' },
    ],
    onFilter: (value, row) => row.status === value,
  },
]
</script>

<template>
  <SgTable :columns="columns" :data="people" :page-size="6">
    <template #cell="{ column, value }">
      <template v-if="column.key === 'status'">
        <SgBadge :status="value === 'active' ? 'success' : 'default'" :text="String(value)" />
      </template>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>
</template>
