<script setup lang="ts">
/**
 * Fix critical columns to the left (Name) and actions to the right (Action).
 * The middle scrolls horizontally if `scroll.x` exceeds the container.
 */
import { SgTable, SgButton, type TableColumn } from '@skygraph/vue'
import { people } from './_data'

const columns: TableColumn[] = [
  { key: 'name', title: 'Name', width: 150, fixed: 'left' },
  { key: 'age', title: 'Age', width: 80, align: 'center' },
  { key: 'email', title: 'Email', width: 220 },
  { key: 'city', title: 'City', width: 150 },
  { key: 'role', title: 'Role', width: 150 },
  { key: 'salary', title: 'Salary', width: 120, align: 'right' },
  { key: 'action', title: 'Action', width: 100, fixed: 'right' },
]
</script>

<template>
  <SgTable
    :columns="columns"
    :data="people"
    :page-size="6"
    :scroll="{ x: 1000 }"
    :show-pagination="false"
  >
    <template #cell="{ column, value }">
      <template v-if="column.key === 'action'">
        <SgButton size="small" type="text">Edit</SgButton>
      </template>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>
</template>
