<script setup lang="ts">
import { computed } from 'vue'
import { SgTable, SgTag, type TableColumn, type RowId } from '@skygraph/vue'
import { employees } from './data'
import { statusTag, ratingBar, salaryFmt, makeTableLocale } from './common'
import { useAppLocale } from '../_shared'

const l = useAppLocale('tableKitchenSink')
const v = computed(() => l.virtual)
const tableLocale = computed(() => makeTableLocale(l))

const largeData = computed<Array<{ id: RowId; data: Record<string, unknown> }>>(() => {
  const result: Array<{ id: RowId; data: Record<string, unknown> }> = []
  for (let i = 0; i < 5; i++) {
    for (const e of employees) {
      result.push({
        id: `v-${result.length}` as RowId,
        data: { ...e, name: `${e.name} #${result.length + 1}` } as Record<string, unknown>,
      })
    }
  }
  return result
})

const columns = computed<TableColumn[]>(() => [
  { key: 'name', title: v.value.columns.employee, width: 200, sortable: true, fixed: 'left' },
  { key: 'department', title: v.value.columns.department, width: 130, sortable: true },
  { key: 'role', title: v.value.columns.role, width: 100, sortable: true },
  {
    key: 'salary',
    title: v.value.columns.salary,
    width: 120,
    sortable: true,
    align: 'right',
  },
  { key: 'rating', title: v.value.columns.rating, width: 150 },
  { key: 'status', title: v.value.columns.status, width: 110 },
])
</script>

<template>
  <div>
    <p style="margin-bottom: 12px; color: var(--sg-color-text-secondary); font-size: 13px">
      {{ v.leadPrefix }}<strong>{{ largeData.length.toLocaleString() }}</strong
      >{{ v.leadSuffix }}
    </p>
    <SgTable
      :columns="columns"
      :data="largeData"
      :page-size="largeData.length"
      :show-pagination="false"
      :virtual="{ rowHeight: 44, overscan: 10 }"
      :scroll="{ y: 500 }"
      :locale="tableLocale"
      bordered
      sticky
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
