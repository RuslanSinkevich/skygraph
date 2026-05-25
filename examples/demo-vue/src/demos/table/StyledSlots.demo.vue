<script setup lang="ts">
/**
 * Each stable slot (`root`, `toolbar`, `headerCell`, `bodyCell`, `row`, …)
 * accepts a className and a style object. No deep selectors required —
 * these hooks are part of the public API.
 *
 * Column-level `headerClassName` styles only the matching header cell.
 */
import { SgTable, SgBadge, type TableColumn } from '@skygraph/vue'
import { people } from './_data'
import './styles.css'

const columns: TableColumn[] = [
  { key: 'name', title: 'Name', width: 180, headerClassName: 'demo-th-name' },
  { key: 'city', title: 'City', width: 120 },
  { key: 'role', title: 'Role', width: 120 },
  { key: 'salary', title: 'Salary', width: 110, align: 'right' },
  {
    key: 'status',
    title: 'Status',
    width: 120,
    headerClassName: 'demo-th-status',
  },
]
</script>

<template>
  <SgTable
    :columns="columns"
    :data="people"
    :page-size="6"
    searchable
    :class-names="{
      root: 'demo-table-root',
      toolbar: 'demo-table-toolbar',
      headerCell: 'demo-table-th',
      bodyCell: 'demo-table-td',
      row: 'demo-table-row',
    }"
    :styles="{
      headerCell: { fontSize: '13px', letterSpacing: '0.04em' },
      bodyCell: { fontFamily: 'SFMono-Regular, Consolas, Menlo, monospace' },
    }"
  >
    <template #cell="{ column, value }">
      <template v-if="column.key === 'status'">
        <SgBadge :status="value === 'active' ? 'success' : 'default'" :text="String(value)" />
      </template>
      <template v-else-if="column.key === 'salary'">
        ${{ Number(value).toLocaleString() }}
      </template>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>
</template>
