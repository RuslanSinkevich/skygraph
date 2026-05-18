<script setup lang="ts">
import { computed, ref } from 'vue'
import { SgTable, SgTag, SgAvatar, SgSegmented, type TableColumn } from '@skygraph/vue'
import { employees, employeeToRow, type Employee } from './data'
import { Toolbar, useFilteredList, money, statusColor, useAppLocale } from '../_shared'

const l = useAppLocale('hrPortal')
const d = l.directory
const search = ref('')
const view = ref<string>('table')

const empRef = ref<Employee[]>(employees)
const filtered = useFilteredList(empRef, search, ['name', 'email', 'role', 'department'])
const tableData = computed(() => (filtered.value as Employee[]).map(employeeToRow))

function statusLabel(status: string): string {
  return (l.statusLabel as Record<string, string>)[status] ?? status
}

const columns: TableColumn[] = [
  { key: 'name', title: d.table.employee, width: 220, sortable: true },
  {
    key: 'department',
    title: d.table.department,
    width: 120,
    sortable: true,
    filters: ['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'HR', 'Finance'].map(
      (dep) => ({ text: dep, value: dep }),
    ),
    onFilter: (value, row) => row.department === value,
  },
  { key: 'role', title: d.table.role, width: 150 },
  {
    key: 'status',
    title: d.table.status,
    width: 100,
    filters: (['active', 'on-leave', 'remote'] as const).map((v) => ({
      text: statusLabel(v),
      value: v,
    })),
    onFilter: (value, row) => row.status === value,
  },
  { key: 'startDate', title: d.table.startDate, width: 110, sortable: true },
  { key: 'salary', title: d.table.salary, width: 100, sortable: true, align: 'right' },
]
</script>

<template>
  <Toolbar
    v-model:searchValue="search"
    :search-placeholder="d.searchPlaceholder"
    :search-width="220"
  >
    <template #actions>
      <SgSegmented
        :value="view"
        :options="[
          { label: d.views.table, value: 'table' },
          { label: d.views.cards, value: 'cards' },
        ]"
        @change="(v: string | number) => (view = String(v))"
      />
    </template>
  </Toolbar>

  <SgTable
    v-if="view === 'table'"
    :columns="columns"
    :data="tableData"
    :page-size="10"
    size="small"
  >
    <template #cell="{ column, row, value }">
      <template v-if="column.key === 'name'">
        <div style="display: flex; align-items: center; gap: 8px">
          <SgAvatar size="small">{{ row.avatar }}</SgAvatar>
          <div>
            <div style="font-weight: 500">{{ value }}</div>
            <div style="font-size: 12px; color: var(--sg-color-text-secondary)">
              {{ row.email }}
            </div>
          </div>
        </div>
      </template>
      <SgTag v-else-if="column.key === 'status'" :color="statusColor(String(value))">
        {{ statusLabel(String(value)) }}
      </SgTag>
      <template v-else-if="column.key === 'salary'">{{ money(Number(value)) }}</template>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>

  <div v-else class="sc-card-grid">
    <div
      v-for="e of filtered as Employee[]"
      :key="e.id"
      class="sc-card"
      style="align-items: center; text-align: center"
    >
      <SgAvatar size="large">{{ e.avatar }}</SgAvatar>
      <div style="font-weight: 600">{{ e.name }}</div>
      <div style="font-size: 12px; color: var(--sg-color-text-secondary)">{{ e.role }}</div>
      <SgTag :color="statusColor(e.status)">{{ statusLabel(e.status) }}</SgTag>
      <div style="font-size: 12px; color: var(--sg-color-text-secondary)">{{ e.department }}</div>
    </div>
  </div>
</template>
