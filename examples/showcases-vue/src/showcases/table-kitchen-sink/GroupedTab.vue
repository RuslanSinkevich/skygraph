<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgTable,
  SgSegmented,
  SgTag,
  type TableColumn,
  type RowId,
  type TableCellSpan as CellSpan,
} from '@skygraph/vue'
import { treeEmployees } from './data'
import { tableData, statusTag, ratingBar, salaryFmt, makeTableLocale } from './common'
import { useAppLocale } from '../_shared'

type Mode = 'group' | 'tree' | 'colgroups' | 'cellspan'

const l = useAppLocale('tableKitchenSink')
const g = computed(() => l.grouped)
const tableLocale = computed(() => makeTableLocale(l))

const mode = ref<Mode>('group')

const modeOptions = computed(() => [
  { label: g.value.modes.group, value: 'group' },
  { label: g.value.modes.tree, value: 'tree' },
  { label: g.value.modes.colgroups, value: 'colgroups' },
  { label: g.value.modes.cellspan, value: 'cellspan' },
])

/* ------------------------- Group by demo ------------------------- */

const groupField = ref<'department' | 'role' | 'status' | 'location'>('department')

const groupFieldOptions = computed(() => [
  { label: g.value.groupOptions.department, value: 'department' },
  { label: g.value.groupOptions.role, value: 'role' },
  { label: g.value.groupOptions.status, value: 'status' },
  { label: g.value.groupOptions.location, value: 'location' },
])

/**
 * Vue's `<SgTable>` has no built-in `groupBy` prop, so we synthesise a tree
 * shape: one synthetic parent row per distinct value with `children`. Each
 * employee becomes a leaf child. The `tree` config then renders expand
 * controls and indentation, matching the React grouping UX functionally.
 */
const groupedRows = computed<Array<{ id: RowId; data: Record<string, unknown> }>>(() => {
  const buckets = new Map<string, Array<{ id: RowId; data: Record<string, unknown> }>>()
  for (const r of tableData) {
    const key = String(r.data[groupField.value] ?? '—')
    if (!buckets.has(key)) buckets.set(key, [])
    buckets.get(key)!.push(r)
  }
  const out: Array<{ id: RowId; data: Record<string, unknown> }> = []
  for (const [key, rows] of buckets) {
    const avgSalary = rows.length
      ? rows.reduce((s, r) => s + (Number(r.data.salary) || 0), 0) / rows.length
      : 0
    const avgRating = rows.length
      ? rows.reduce((s, r) => s + (Number(r.data.rating) || 0), 0) / rows.length
      : 0
    const sumProjects = rows.reduce((s, r) => s + (Number(r.data.projects) || 0), 0)
    out.push({
      id: `group-${groupField.value}-${key}` as RowId,
      data: {
        name: `${key} (${rows.length})`,
        department: groupField.value === 'department' ? key : '',
        role: '',
        salary: Math.round(avgSalary),
        rating: avgRating,
        projects: sumProjects,
        status: '',
        children: rows,
      },
    })
  }
  return out
})

const groupCols = computed<TableColumn[]>(() => [
  { key: 'name', title: g.value.columns.employee, width: 220, sortable: true, fixed: 'left' },
  { key: 'department', title: g.value.columns.department, width: 130, sortable: true },
  { key: 'role', title: g.value.columns.role, width: 100, sortable: true },
  {
    key: 'salary',
    title: g.value.columns.salary,
    width: 120,
    sortable: true,
    align: 'right',
    aggregate: 'avg',
  },
  { key: 'rating', title: g.value.columns.rating, width: 150, aggregate: 'avg' },
  {
    key: 'projects',
    title: g.value.columns.projects,
    width: 90,
    sortable: true,
    align: 'center',
    aggregate: 'sum',
  },
  { key: 'status', title: g.value.columns.status, width: 110 },
])

/* ------------------------- Tree demo ------------------------- */

const treeCols = computed<TableColumn[]>(() => [
  { key: 'name', title: g.value.columns.name, width: 250, sortable: true },
  { key: 'role', title: g.value.columns.role, width: 120 },
  { key: 'salary', title: g.value.columns.salary, width: 120, aggregate: 'sum' },
  { key: 'status', title: g.value.columns.status, width: 110 },
])

/* ------------------------- Column groups demo ------------------------- */

const groupedColumns = computed<TableColumn[]>(() => [
  { key: 'name', title: g.value.columns.employee, width: 180, sortable: true, fixed: 'left' },
  {
    key: 'personal',
    title: g.value.columnGroups.personal,
    children: [
      { key: 'department', title: g.value.columns.department, width: 130, sortable: true },
      { key: 'role', title: g.value.columns.role, width: 100, sortable: true, editable: true },
      { key: 'location', title: g.value.columnGroups.location, width: 130 },
    ],
  },
  {
    key: 'compensation',
    title: g.value.columnGroups.compensation,
    children: [
      {
        key: 'salary',
        title: g.value.columns.salary,
        width: 120,
        sortable: true,
        align: 'right',
        aggregate: 'avg',
      },
      {
        key: 'experience',
        title: g.value.columnGroups.experience,
        width: 90,
        sortable: true,
        align: 'center',
        aggregate: 'avg',
      },
      { key: 'rating', title: g.value.columns.rating, width: 150, aggregate: 'avg' },
      {
        key: 'projects',
        title: g.value.columns.projects,
        width: 90,
        sortable: true,
        align: 'center',
        aggregate: 'sum',
      },
    ],
  },
  {
    key: 'meta',
    title: g.value.columnGroups.meta,
    children: [
      { key: 'status', title: g.value.columns.status, width: 110 },
      { key: 'hireDate', title: g.value.columnGroups.hireDate, width: 110 },
    ],
  },
])

const groupSliceData = computed(() => tableData.slice(0, 30))

/* ------------------------- Cell-span demo ------------------------- */

const cellSpanSlice = computed(() => tableData.slice(0, 15))

const cellSpanCols = computed<TableColumn[]>(() => [
  { key: 'name', title: g.value.columns.employee, width: 200, sortable: true },
  {
    key: 'department',
    title: g.value.columns.department,
    width: 140,
    onCell: (_row, idx): CellSpan => {
      if (idx === 0) return { rowSpan: 3 }
      if (idx === 1 || idx === 2) return { rowSpan: 0 }
      if (idx === 5) return { colSpan: 2 }
      return {}
    },
  },
  {
    key: 'role',
    title: g.value.columns.role,
    width: 120,
    onCell: (_row, idx): CellSpan => {
      if (idx === 5) return { colSpan: 0 }
      return {}
    },
  },
  { key: 'salary', title: g.value.columns.salary, width: 120, align: 'right' },
  { key: 'status', title: g.value.columns.status, width: 110 },
])
</script>

<template>
  <div>
    <SgSegmented
      :value="mode"
      :options="modeOptions"
      style="margin-bottom: 16px"
      @change="(v: string) => (mode = v as Mode)"
    />

    <template v-if="mode === 'group'">
      <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center">
        <span style="font-size: 13px">{{ g.groupByLabel }}</span>
        <SgSegmented
          :value="groupField"
          :options="groupFieldOptions"
          @change="(v: string) => (groupField = v as typeof groupField)"
        />
      </div>
      <SgTable
        :columns="groupCols"
        :data="groupedRows"
        :tree="{ defaultExpandAllRows: true, indentSize: 22 }"
        :show-pagination="false"
        :scroll="{ x: 1100, y: 500 }"
        :locale="tableLocale"
        footer
        bordered
        searchable
      >
        <template #cell="{ column, value }">
          <template v-if="column.key === 'salary'">
            <template v-if="Number(value) > 0">{{ salaryFmt(value) }}</template>
            <template v-else>-</template>
          </template>
          <template v-else-if="column.key === 'rating'">
            <div
              v-if="Number(value) > 0"
              style="display: flex; align-items: center; gap: 8px; width: 100%"
            >
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
            <template v-else>-</template>
          </template>
          <template v-else-if="column.key === 'status'">
            <SgTag v-if="value" :color="statusTag(value, l.statusLabel).color">
              {{ statusTag(value, l.statusLabel).label }}
            </SgTag>
            <template v-else>-</template>
          </template>
          <template v-else>{{ value }}</template>
        </template>
      </SgTable>
    </template>

    <template v-if="mode === 'tree'">
      <SgTable
        :columns="treeCols"
        :data="treeEmployees"
        :tree="{ defaultExpandAllRows: true, indentSize: 24 }"
        :show-pagination="false"
        :locale="tableLocale"
        bordered
        footer
      >
        <template #cell="{ column, value }">
          <template v-if="column.key === 'salary'">
            <template v-if="Number(value) > 0">{{ salaryFmt(value) }}</template>
            <template v-else>-</template>
          </template>
          <template v-else-if="column.key === 'status'">
            <SgTag v-if="value" :color="statusTag(value, l.statusLabel).color">
              {{ statusTag(value, l.statusLabel).label }}
            </SgTag>
            <template v-else>-</template>
          </template>
          <template v-else>{{ value }}</template>
        </template>
      </SgTable>
    </template>

    <template v-if="mode === 'colgroups'">
      <SgTable
        :columns="groupedColumns"
        :data="groupSliceData"
        :page-size="30"
        :show-pagination="false"
        :scroll="{ x: 1300 }"
        :locale="tableLocale"
        bordered
        footer
        striped
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
    </template>

    <template v-if="mode === 'cellspan'">
      <div>
        <p style="margin-bottom: 12px; color: var(--sg-color-text-secondary); font-size: 13px">
          {{ g.cellSpanLead }}
        </p>
        <SgTable
          :columns="cellSpanCols"
          :data="cellSpanSlice"
          :page-size="15"
          :show-pagination="false"
          :locale="tableLocale"
          bordered
        >
          <template #cell="{ column, value }">
            <template v-if="column.key === 'name'">
              <span style="font-weight: 500">{{ String(value) }}</span>
            </template>
            <template v-else-if="column.key === 'salary'">{{ salaryFmt(value) }}</template>
            <template v-else-if="column.key === 'status'">
              <SgTag :color="statusTag(value, l.statusLabel).color">
                {{ statusTag(value, l.statusLabel).label }}
              </SgTag>
            </template>
            <template v-else>{{ value }}</template>
          </template>
        </SgTable>
      </div>
    </template>
  </div>
</template>
