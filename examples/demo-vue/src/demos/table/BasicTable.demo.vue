<script setup lang="ts">
/**
 * Simplest possible table. Columns with no `width` share remaining space
 * evenly; `age` gets a fixed narrow width because numbers don't need room
 * to breathe.
 */
import { SgTable, SgTag, type TableColumn } from '@skygraph/vue'
import { people } from './_data'

const columns: TableColumn[] = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'age', title: 'Age', sortable: true, width: 80, align: 'center' },
  { key: 'city', title: 'City', sortable: true },
  { key: 'status', title: 'Status' },
]
</script>

<template>
  <SgTable :columns="columns" :data="people" :page-size="5">
    <template #cell="{ column, value }">
      <template v-if="column.key === 'status'">
        <SgTag :color="value === 'active' ? 'success' : 'default'">{{ String(value) }}</SgTag>
      </template>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>
</template>
