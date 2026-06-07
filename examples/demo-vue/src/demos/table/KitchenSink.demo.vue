<script setup lang="ts">
/**
 * Every filter style on the same table — preset checkbox list on city/role/status,
 * custom search dropdown on name (via #filterDropdown slot), plus selection + expand +
 * sort + global search + resize + fixed columns + editable + summary.
 */
import { computed, h, ref } from 'vue'
import {
  SgTable,
  SgButton,
  SgInput,
  SgTag,
  type TableColumn,
  type RowId,
  type TableSummaryCell as SummaryCell,
} from '@skygraph/vue'
import { people } from './_data'

const selected = ref<RowId[]>([])
const rows = ref(people.map((r) => ({ id: r.id, data: { ...r.data } })))

const columns: TableColumn[] = [
  {
    key: 'name',
    title: 'Name',
    width: 160,
    sortable: true,
    fixed: 'left',
    resizable: true,
    onFilter: (value, row) => String(row.name).toLowerCase().includes(String(value).toLowerCase()),
  },
  {
    key: 'age',
    title: 'Age',
    width: 90,
    sortable: true,
    align: 'center',
    editable: true,
  },
  { key: 'email', title: 'Email', width: 220, resizable: true },
  {
    key: 'city',
    title: 'City',
    width: 140,
    sortable: true,
    resizable: true,
    filters: [
      { text: 'Moscow', value: 'Moscow' },
      { text: 'Berlin', value: 'Berlin' },
      { text: 'Tokyo', value: 'Tokyo' },
      { text: 'London', value: 'London' },
      { text: 'Paris', value: 'Paris' },
      { text: 'New York', value: 'New York' },
    ],
    onFilter: (value, row) => row.city === value,
  },
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
  { key: 'salary', title: 'Salary', width: 130, align: 'right', sortable: true },
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
  { key: 'action', title: 'Action', width: 90, fixed: 'right' },
]

const rowSelection = computed(() => ({
  selectedKeys: selected.value,
  onChange: (keys: RowId[]) => {
    selected.value = keys
  },
}))

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
    :scroll="{ x: 1200 }"
    :row-selection="rowSelection"
    :expandable="expandable"
    :on-cell-edit="onCellEdit"
    :summary="summary"
  >
    <template #filterDropdown="{ column, selectedKeys, setSelectedKeys, confirm, clearFilters }">
      <div
        v-if="column.key === 'name'"
        style="padding: 8px; display: flex; flex-direction: column; gap: 8px; min-width: 200px"
        @click.stop
      >
        <SgInput
          placeholder="Search name..."
          size="small"
          :model-value="(selectedKeys[0] as string) ?? ''"
          @update:model-value="(v: string) => setSelectedKeys(v ? [v] : [])"
        />
        <div style="display: flex; gap: 4px; justify-content: space-between">
          <SgButton size="small" @click="clearFilters">Reset</SgButton>
          <SgButton size="small" type="primary" @click="confirm">Search</SgButton>
        </div>
      </div>
    </template>
    <template #cell="{ column, value }">
      <template v-if="column.key === 'status'">
        <SgTag :color="value === 'active' ? 'success' : 'default'">{{ String(value) }}</SgTag>
      </template>
      <template v-else-if="column.key === 'salary'">
        ${{ Number(value).toLocaleString() }}
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
