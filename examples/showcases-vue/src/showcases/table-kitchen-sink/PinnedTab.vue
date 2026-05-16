<script setup lang="ts">
import { computed } from 'vue'
import { SgTable, SgTag, type TableColumn } from '@skygraph/vue'
import { tableData, statusTag, ratingBar, salaryFmt, makeTableLocale } from './common'
import { useAppLocale } from '../_shared'

const l = useAppLocale('tableKitchenSink')
const p = computed(() => l.pinned)
const tableLocale = computed(() => makeTableLocale(l))

const slice = tableData.slice(0, 20)

const columns = computed<TableColumn[]>(() => [
  { key: 'name', title: p.value.columns.employee, width: 200, sortable: true, fixed: 'left' },
  { key: 'department', title: p.value.columns.department, width: 130, sortable: true },
  { key: 'role', title: p.value.columns.role, width: 100 },
  {
    key: 'salary',
    title: p.value.columns.salary,
    width: 120,
    sortable: true,
    align: 'right',
  },
  { key: 'rating', title: p.value.columns.rating, width: 150 },
  { key: 'status', title: p.value.columns.status, width: 110 },
])
</script>

<template>
  <div>
    <p style="margin-bottom: 12px; color: var(--sg-color-text-secondary); font-size: 13px">
      {{ p.lead }}
    </p>
    <SgTable
      :columns="columns"
      :data="slice"
      :page-size="20"
      :show-pagination="false"
      :scroll="{ x: 900 }"
      :locale="tableLocale"
      bordered
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
  </div>
</template>
