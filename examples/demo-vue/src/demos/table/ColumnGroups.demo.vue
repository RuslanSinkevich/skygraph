<script setup lang="ts">
/**
 * Multi-level header with grouped columns. Any column can have `children`;
 * the group cell is rendered as a spanning header above its children.
 */
import { SgTable, type TableColumn } from '@skygraph/vue'
import { people } from './_data'

const columns: TableColumn[] = [
  { key: 'name', title: 'Name', width: 160 },
  {
    key: 'contact-group',
    title: 'Contact Info',
    children: [
      { key: 'email', title: 'Email', width: 200 },
      { key: 'city', title: 'City', width: 120 },
    ],
  },
  {
    key: 'work-group',
    title: 'Work',
    children: [
      { key: 'role', title: 'Role', width: 120 },
      { key: 'salary', title: 'Salary', width: 110, align: 'right' },
    ],
  },
]
</script>

<template>
  <SgTable :columns="columns" :data="people" :page-size="6" bordered>
    <template #cell="{ column, value }">
      <template v-if="column.key === 'salary'">${{ Number(value).toLocaleString() }}</template>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>
</template>
