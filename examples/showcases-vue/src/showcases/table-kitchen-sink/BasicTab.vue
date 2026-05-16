<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgTable,
  SgButton,
  SgEmpty,
  SgSegmented,
  SgTag,
  notification,
  type TableColumn,
} from '@skygraph/vue'
import { statusTag, ratingBar, salaryFmt, tableData, makeTableLocale } from './common'
import { useAppLocale } from '../_shared'

const l = useAppLocale('tableKitchenSink')
const section = ref<'basic' | 'empty'>('basic')

const basicCols = computed<TableColumn[]>(() => [
  { key: 'name', title: l.basic.columns.employee, width: 200, sortable: true },
  { key: 'department', title: l.basic.columns.department, width: 130, sortable: true },
  { key: 'role', title: l.basic.columns.role, width: 120, sortable: true },
  { key: 'salary', title: l.basic.columns.salary, width: 120, sortable: true, align: 'right' },
  { key: 'rating', title: l.basic.columns.rating, width: 150 },
  { key: 'status', title: l.basic.columns.status, width: 110 },
  { key: 'hireDate', title: l.basic.columns.hireDate, width: 110, sortable: true },
])

const emptyCols = computed<TableColumn[]>(() => [
  { key: 'name', title: l.basic.columns.employee, width: 200, sortable: true },
  { key: 'department', title: l.basic.columns.department, width: 130, sortable: true },
  { key: 'role', title: l.basic.columns.role, width: 120, sortable: true },
  { key: 'salary', title: l.basic.columns.salary, width: 120, sortable: true, align: 'right' },
])

const tableLocale = computed(() => makeTableLocale(l))

const sectionOptions = computed(() => [
  { label: l.basic.sectionBasic, value: 'basic' },
  { label: l.basic.sectionEmpty, value: 'empty' },
])

function notifyAdd() {
  notification.info(l.basic.addEmployeeToast)
}
</script>

<template>
  <div>
    <SgSegmented
      :value="section"
      :options="sectionOptions"
      style="margin-bottom: 16px"
      @change="(v: string) => (section = v as typeof section)"
    />

    <div v-if="section === 'basic'">
      <p style="margin-bottom: 12px; color: var(--sg-color-text-secondary); font-size: 13px">
        {{ l.basic.basicLead }}
      </p>
      <SgTable
        :columns="basicCols"
        :data="tableData"
        :page-size="10"
        :locale="tableLocale"
        searchable
        striped
        bordered
        highlight-on-hover
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

    <div v-else>
      <p style="margin-bottom: 12px; color: var(--sg-color-text-secondary); font-size: 13px">
        {{ l.basic.emptyLead }}
      </p>
      <SgTable :columns="emptyCols" :data="[]" :locale="tableLocale" searchable bordered>
        <template #empty>
          <SgEmpty :description="l.basic.emptyDescription">
            <SgButton type="primary" size="small" @click="notifyAdd">
              {{ l.basic.addEmployee }}
            </SgButton>
          </SgEmpty>
        </template>
      </SgTable>
    </div>
  </div>
</template>
