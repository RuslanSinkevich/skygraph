<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgTable,
  SgDrawer,
  SgDescriptions,
  SgTag,
  notification,
  type TableColumn,
  type RowId,
} from '@skygraph/vue'
import { statusTag, ratingBar, salaryFmt, tableData, makeTableLocale } from './common'
import { useAppLocale } from '../_shared'

const l = useAppLocale('tableKitchenSink')
const e = computed(() => l.editing)
const tableLocale = computed(() => makeTableLocale(l))

const data = ref([...tableData])
const selectedKeys = ref<RowId[]>([])
const detailDrawer = ref<Record<string, unknown> | null>(null)

const rowSelection = computed(() => ({
  selectedKeys: selectedKeys.value,
  type: 'checkbox' as const,
  onChange: (keys: RowId[]) => {
    selectedKeys.value = keys
  },
}))

const columns = computed<TableColumn[]>(() => [
  {
    key: 'name',
    title: e.value.columns.employee,
    width: 200,
    fixed: 'left',
    sortable: true,
    resizable: true,
  },
  {
    key: 'department',
    title: e.value.columns.department,
    width: 130,
    sortable: true,
    resizable: true,
    editable: true,
  },
  {
    key: 'role',
    title: e.value.columns.role,
    width: 110,
    sortable: true,
    resizable: true,
    editable: true,
  },
  {
    key: 'location',
    title: e.value.columns.location,
    width: 130,
    sortable: true,
    resizable: true,
    editable: true,
  },
  {
    key: 'salary',
    title: e.value.columns.salary,
    width: 120,
    sortable: true,
    align: 'right',
    editable: true,
  },
  { key: 'rating', title: e.value.columns.rating, width: 150 },
  { key: 'status', title: e.value.columns.status, width: 110, sortable: true },
])

function handleCellEdit(id: RowId, column: string, value: unknown) {
  data.value = data.value.map((r) =>
    r.id === id ? { ...r, data: { ...r.data, [column]: value } } : r,
  )
  notification.success(e.value.toasts.cellEdit(column, String(id)))
}

function onRowClick(_id: RowId, row: Record<string, unknown>) {
  detailDrawer.value = row
}

function closeDrawer() {
  detailDrawer.value = null
}

function rowClassName(row: Record<string, unknown>): string {
  if (row.status === 'terminated') return 'row-terminated'
  if (Number(row.overtime) > 30) return 'row-overtime-warn'
  return ''
}

const drawerItems = computed(() => {
  if (!detailDrawer.value) return []
  return Object.entries(detailDrawer.value).map(([k, v]) => ({
    label: k,
    value: typeof v === 'object' ? JSON.stringify(v) : String(v),
  }))
})
</script>

<template>
  <div>
    <p style="margin-bottom: 12px; color: var(--sg-color-text-secondary); font-size: 13px">
      {{ e.lead }}
    </p>
    <SgTable
      :columns="columns"
      :data="data"
      :page-size="15"
      :row-selection="rowSelection"
      :row-class-name="rowClassName"
      :scroll="{ x: 1000 }"
      :locale="tableLocale"
      size="small"
      bordered
      striped
      highlight-on-hover
      sticky
      searchable
      @cell-edit="handleCellEdit"
      @row-click="onRowClick"
    >
      <template #cell="{ column, value }">
        <template v-if="column.key === 'salary'">{{ salaryFmt(value) }}</template>
        <template v-else-if="column.key === 'rating'">
          <div style="display: flex; align-items: center; gap: 8px; width: 100%">
            <div
              style="
                flex: 1;
                height: 6px;
                background: var(--sg-color-border-secondary, #f0f0f0);
                border-radius: 3px;
                overflow: hidden;
              "
            >
              <div
                :style="{
                  width: `${ratingBar(value).percent}%`,
                  height: '100%',
                  background: ratingBar(value).color,
                  borderRadius: '3px',
                }"
              />
            </div>
            <span style="font-size: 12px; min-width: 28px">{{
              ratingBar(value).value.toFixed(1)
            }}</span>
          </div>
        </template>
        <template v-else-if="column.key === 'status'">
          <SgTag :color="statusTag(value, l.statusLabel).color">
            {{ statusTag(value, l.statusLabel).label }}
          </SgTag>
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </SgTable>

    <SgDrawer
      :open="!!detailDrawer"
      :title="String(detailDrawer?.name ?? '')"
      :width="420"
      @close="closeDrawer"
    >
      <SgDescriptions v-if="detailDrawer" :items="drawerItems" :column="1" size="small" />
    </SgDrawer>
  </div>
</template>
