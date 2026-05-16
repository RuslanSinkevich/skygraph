<script setup lang="ts">
import { computed } from 'vue'
import {
  SgTable,
  SgTag,
  type TableColumn,
  type RowId,
  type TableSummaryCell as SummaryCell,
} from '@skygraph/vue'
import { statusTag, ratingBar, salaryFmt, tableData, makeTableLocale } from './common'
import { useAppLocale } from '../_shared'

const l = useAppLocale('tableKitchenSink')
const sf = computed(() => l.sortFilter)

const tableLocale = computed(() => makeTableLocale(l))

const columns = computed<TableColumn[]>(() => [
  {
    key: 'name',
    title: l.basic.columns.employee,
    width: 200,
    sortable: true,
    onFilter: (v, row) => String(row.name).toLowerCase().includes(String(v).toLowerCase()),
  },
  {
    key: 'department',
    title: l.basic.columns.department,
    width: 130,
    sortable: true,
    filters: ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Support'].map(
      (d) => ({
        text: d,
        value: d,
      }),
    ),
    onFilter: (v, row) => row.department === v,
    filterMultiple: true,
  },
  {
    key: 'role',
    title: l.basic.columns.role,
    width: 110,
    sortable: true,
    filters: ['Junior', 'Middle', 'Senior', 'Lead', 'Manager', 'Director'].map((r) => ({
      text: r,
      value: r,
    })),
    onFilter: (v, row) => row.role === v,
    filterMultiple: true,
  },
  {
    key: 'salary',
    title: l.basic.columns.salary,
    width: 120,
    sortable: true,
    align: 'right',
    aggregate: 'avg',
  },
  {
    key: 'experience',
    title: sf.value.expColumn,
    width: 90,
    sortable: true,
    align: 'center',
    aggregate: 'avg',
  },
  {
    key: 'rating',
    title: l.basic.columns.rating,
    width: 150,
    sortable: true,
    aggregate: 'avg',
  },
  {
    key: 'status',
    title: l.basic.columns.status,
    width: 110,
    sortable: true,
    filters: ['active', 'on-leave', 'remote', 'terminated'].map((s) => ({
      text: l.statusLabel[s as keyof typeof l.statusLabel] ?? s,
      value: s,
    })),
    onFilter: (v, row) => row.status === v,
    filterMultiple: true,
  },
])

function summaryFn(rows: Array<{ id: RowId; data: Record<string, unknown> }>): SummaryCell[][] {
  const totalSalary = rows.reduce((s, r) => s + (Number(r.data.salary) || 0), 0)
  const avgSalary = rows.length ? totalSalary / rows.length : 0
  const avgExp = rows.length
    ? rows.reduce((s, r) => s + (Number(r.data.experience) || 0), 0) / rows.length
    : 0
  const avgRating = rows.length
    ? rows.reduce((s, r) => s + (Number(r.data.rating) || 0), 0) / rows.length
    : 0
  return [
    [
      { content: sf.value.summaryEmployees(rows.length), colSpan: 3 },
      { content: '' },
      { content: '' },
      { content: sf.value.summaryAvg(salaryFmt(Math.round(avgSalary))), align: 'right' },
      { content: sf.value.summaryYears(avgExp.toFixed(1)), align: 'center' },
      { content: sf.value.summaryRating(avgRating.toFixed(1)) },
      { content: '' },
    ],
  ]
}
</script>

<template>
  <div>
    <p style="margin-bottom: 12px; color: var(--sg-color-text-secondary); font-size: 13px">
      {{ sf.lead }}
    </p>
    <SgTable
      :columns="columns"
      :data="tableData"
      :page-size="15"
      :summary="summaryFn"
      :locale="tableLocale"
      searchable
      bordered
      striped
      highlight-on-hover
      sticky
      footer
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
  </div>
</template>
