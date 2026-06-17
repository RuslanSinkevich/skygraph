<script setup lang="ts">
/**
 * Sticky header. Combine `sticky` with `scroll.y` to cap the body height —
 * the header row then stays pinned while the rows scroll beneath it.
 */
import { SgTable, SgTag, type TableColumn } from '@skygraph/vue'
import { makeEmployees } from './_data'

const columns: TableColumn[] = [
  { key: 'id', title: '#', width: 60, align: 'center' },
  { key: 'name', title: 'Name' },
  { key: 'department', title: 'Department' },
  { key: 'role', title: 'Role' },
  { key: 'status', title: 'Status', align: 'center' },
]

const data = makeEmployees(40)
</script>

<template>
  <SgTable
    :columns="columns"
    :data="data"
    :sticky="true"
    :scroll="{ y: 360 }"
    :show-pagination="false"
  >
    <template #cell="{ column, value }">
      <template v-if="column.key === 'status'">
        <SgTag :color="value === 'Active' ? 'success' : 'default'">{{ String(value) }}</SgTag>
      </template>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>
</template>
