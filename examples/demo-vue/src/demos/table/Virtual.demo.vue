<script setup lang="ts">
/**
 * Virtualised body — only the rows in the visible viewport (+ overscan) are
 * mounted, so DOM stays flat even with thousands of rows.
 */
import { computed } from 'vue'
import { SgTable, type TableColumn } from '@skygraph/vue'
import { makeEmployees } from './_data'

const data = computed(() => makeEmployees(1000))

const columns: TableColumn[] = [
  { key: 'id', title: 'ID', width: 80, sortable: true },
  { key: 'name', title: 'Name', width: 200, sortable: true, fixed: 'left' },
  { key: 'department', title: 'Department', width: 150, sortable: true },
  { key: 'role', title: 'Role', width: 150, sortable: true },
  { key: 'salary', title: 'Salary', width: 120, sortable: true },
  { key: 'status', title: 'Status', width: 120 },
]
</script>

<template>
  <div style="width: 100%">
    <SgTable
      :columns="columns"
      :data="data"
      :show-pagination="false"
      :virtual="{ rowHeight: 40, overscan: 10, height: 400 }"
      bordered
    >
      <template #cell="{ column, value }">
        <template v-if="column.key === 'salary'">${{ Number(value).toLocaleString() }}</template>
        <template v-else>{{ value }}</template>
      </template>
    </SgTable>
  </div>
</template>
