<script setup lang="ts">
/**
 * Stress test: 10 000 employee rows with the full pro-feature set wired up
 * at once — virtualisation, sorting, filtering, fixed columns, row selection,
 * striped rows and hover highlight. Mirrors React `LargeDataset.demo.tsx`.
 */
import { ref } from 'vue'
import { SgTable, SgTag, type TableColumn, type RowId } from '@skygraph/vue'
import { makeEmployees } from './_data'

const data = makeEmployees(10_000)
const selected = ref<RowId[]>([])

const columns: TableColumn[] = [
  { key: 'id', title: '#', width: 80, align: 'right', sortable: true, fixed: 'left' },
  { key: 'name', title: 'Name', width: 200, sortable: true, fixed: 'left' },
  {
    key: 'department',
    title: 'Department',
    width: 150,
    sortable: true,
    filters: [
      { text: 'Engineering', value: 'Engineering' },
      { text: 'Sales', value: 'Sales' },
      { text: 'Marketing', value: 'Marketing' },
      { text: 'HR', value: 'HR' },
      { text: 'Finance', value: 'Finance' },
    ],
    onFilter: (v: unknown, row: Record<string, unknown>) => row.department === v,
  },
  {
    key: 'role',
    title: 'Role',
    width: 150,
    sortable: true,
    filters: [
      { text: 'Developer', value: 'Developer' },
      { text: 'Manager', value: 'Manager' },
      { text: 'Analyst', value: 'Analyst' },
      { text: 'Director', value: 'Director' },
    ],
    onFilter: (v: unknown, row: Record<string, unknown>) => row.role === v,
  },
  {
    key: 'salary',
    title: 'Salary',
    width: 140,
    align: 'right',
    sortable: true,
    aggregate: 'avg',
  },
  {
    key: 'status',
    title: 'Status',
    width: 130,
    filters: [
      { text: 'Active', value: 'Active' },
      { text: 'On Leave', value: 'On Leave' },
      { text: 'Terminated', value: 'Terminated' },
    ],
    onFilter: (v: unknown, row: Record<string, unknown>) => row.status === v,
  },
]
</script>

<template>
  <div style="width: 100%">
    <div
      style="
        margin-bottom: 8px;
        font-size: 12px;
        color: var(--sg-color-text-secondary);
        display: flex;
        justify-content: space-between;
        align-items: center;
      "
    >
      <span>{{ data.length.toLocaleString() }} rows · virtualised · sortable · filterable</span>
      <SgTag v-if="selected.length" color="processing">{{ selected.length }} selected</SgTag>
    </div>
    <SgTable
      :columns="columns"
      :data="data"
      :page-size="data.length"
      :show-pagination="false"
      :virtual="{ rowHeight: 40, overscan: 8, height: 560 }"
      :row-selection="{ selectedKeys: selected, onChange: (k: RowId[]) => (selected = k) }"
      bordered
      sticky
      striped
      highlight-on-hover
    >
      <template #cell="{ column, value }">
        <template v-if="column.key === 'salary'">
          ${{ (Number(value) / 1000).toFixed(0) }}k
        </template>
        <template v-else-if="column.key === 'status'">
          <SgTag
            :color="value === 'Active' ? 'success' : value === 'On Leave' ? 'warning' : 'default'"
          >
            {{ value }}
          </SgTag>
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </SgTable>
  </div>
</template>
