<script setup lang="ts">
/**
 * Most features combined — selection + expand + sort + filter + search +
 * resize + fixed columns + editable + summary. Use as a reference when wiring
 * up complex tables.
 */
import { h, ref } from 'vue'
import {
  SgTable,
  SgButton,
  SgTag,
  type TableColumn,
  type RowId,
  type TableSummaryCell as SummaryCell,
} from '@skygraph/vue'
import { people } from './_data'

const selected = ref<RowId[]>([])
const rows = ref(people.map((r) => ({ id: r.id, data: { ...r.data } })))

const columns: TableColumn[] = [
  { key: 'name', title: 'Name', width: 160, sortable: true, fixed: 'left', resizable: true },
  { key: 'age', title: 'Age', width: 80, sortable: true, align: 'center', editable: true },
  { key: 'email', title: 'Email', width: 200, resizable: true },
  { key: 'city', title: 'City', width: 130, sortable: true, resizable: true },
  {
    key: 'role',
    title: 'Role',
    width: 130,
    resizable: true,
    filters: [
      { text: 'Developer', value: 'Developer' },
      { text: 'Designer', value: 'Designer' },
      { text: 'Manager', value: 'Manager' },
      { text: 'QA', value: 'QA' },
    ],
    onFilter: (value, row) => row.role === value,
  },
  { key: 'salary', title: 'Salary', width: 110, align: 'right', sortable: true },
  { key: 'status', title: 'Status', width: 100 },
  { key: 'action', title: 'Action', width: 90, fixed: 'right' },
]

const rowSelection = {
  selectedKeys: selected.value,
  onChange: (keys: RowId[]) => {
    selected.value = keys
  },
}

const expandable = { expandedRowRender: () => h('div') }

function onCellEdit(id: RowId, col: string, val: unknown) {
  rows.value = rows.value.map((r) => (r.id === id ? { ...r, data: { ...r.data, [col]: val } } : r))
}

function summary(visible: Array<{ id: RowId; data: Record<string, unknown> }>): SummaryCell[][] {
  const total = visible.reduce((s, r) => s + (Number(r.data.salary) || 0), 0)
  return [
    [
      { content: `${visible.length} rows`, colSpan: 6 },
      { content: `$${total.toLocaleString()}` },
      { content: '' },
    ],
  ]
}
</script>

<template>
  <SgTable
    :columns="columns"
    :data="rows"
    :page-size="6"
    searchable
    bordered
    :scroll="{ x: 1100 }"
    :row-selection="rowSelection"
    :expandable="expandable"
    :on-cell-edit="onCellEdit"
    :summary="summary"
  >
    <template #cell="{ column, value }">
      <template v-if="column.key === 'status'">
        <SgTag :color="value === 'active' ? 'success' : 'default'">{{ String(value) }}</SgTag>
      </template>
      <template v-else-if="column.key === 'action'">
        <SgButton size="small" type="text">Edit</SgButton>
      </template>
      <template v-else>{{ value }}</template>
    </template>
    <template #expandedRow="{ row }">
      <div>
        Details for <strong>{{ row.name }}</strong
        >: {{ row.email }}, ${{ row.salary }}
      </div>
    </template>
  </SgTable>
</template>
