<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgResourceCalendar,
  SgTable,
  SgTag,
  SgButton,
  SgSegmented,
  notification,
  type ResourceCalendarResource,
  type ResourceCalendarAssignment,
  type TableColumn,
} from '@skygraph/vue'
import { employees, leaveRecords, leaveToRow } from './data'
import { statusColor, useAppLocale } from '../_shared'

const PALETTE = [
  '#3b82f6',
  '#f97316',
  '#10b981',
  '#a855f7',
  '#ef4444',
  '#0ea5e9',
  '#eab308',
  '#22c55e',
]

const TYPE_STATUS: Record<string, 'tentative' | 'confirmed'> = {
  vacation: 'confirmed',
  remote: 'tentative',
  personal: 'tentative',
  sick: 'tentative',
}

const DAY_MS = 86_400_000

function dateMs(s: string): number {
  return new Date(s + 'T00:00:00Z').getTime()
}

const lc = useAppLocale('hrPortal')
const lv = lc.leave
const view = ref<'calendar' | 'table'>('calendar')

function leaveTypeLabel(t: string): string {
  return (lc.leaveTypeLabel as Record<string, string>)[t] ?? t
}

function leaveStatusLabel(s: string): string {
  return (lc.leaveStatusLabel as Record<string, string>)[s] ?? s
}

const resources = computed<ResourceCalendarResource[]>(() => {
  const ids = new Set(leaveRecords.map((l) => l.employeeId))
  const list = employees.filter((e) => ids.has(e.id)).slice(0, 12)
  return list.map((e, i) => ({
    id: e.id,
    name: `${e.name} · ${e.role}`,
    color: PALETTE[i % PALETTE.length]!,
    capacityPerSlot: 1,
  }))
})

const initialAssignments = computed<ResourceCalendarAssignment[]>(() => {
  const allowed = new Set(resources.value.map((r) => r.id))
  return leaveRecords
    .filter((l) => l.status !== 'rejected' && allowed.has(l.employeeId))
    .map((l) => ({
      id: l.id,
      resourceId: l.employeeId,
      title: `${leaveTypeLabel(l.type)} · ${leaveStatusLabel(l.status)}`,
      start: dateMs(l.startDate),
      end: dateMs(l.endDate) + DAY_MS,
      status: l.status === 'pending' ? 'tentative' : (TYPE_STATUS[l.type] ?? 'tentative'),
    }))
})

const assignments = ref<ResourceCalendarAssignment[]>(initialAssignments.value)

const tableData = computed(() => leaveRecords.map(leaveToRow))

const columns: TableColumn[] = [
  { key: 'employeeName', title: lv.table.employee, width: 180, sortable: true, fixed: 'left' },
  {
    key: 'type',
    title: lv.table.type,
    width: 110,
    filters: (['vacation', 'sick', 'personal', 'remote'] as const).map((v) => ({
      text: lv.table.typeFilters[v],
      value: v,
    })),
    onFilter: (v, row) => row.type === v,
  },
  { key: 'startDate', title: lv.table.from, width: 120, sortable: true },
  { key: 'endDate', title: lv.table.to, width: 120, sortable: true },
  {
    key: 'status',
    title: lv.table.status,
    width: 110,
    filters: (['approved', 'pending', 'rejected'] as const).map((v) => ({
      text: lv.table.statusFilters[v],
      value: v,
    })),
    onFilter: (value, row) => row.status === value,
  },
  { key: 'actions', title: '', width: 180 },
]
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; justify-content: space-between; align-items: center">
      <SgSegmented
        :value="view"
        :options="[
          { label: lv.views.calendar, value: 'calendar' },
          { label: lv.views.table, value: 'table' },
        ]"
        @change="(v: string | number) => (view = String(v) as 'calendar' | 'table')"
      />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
        {{ lv.noOverlaps }}
      </span>
    </div>

    <div v-if="view === 'calendar'" class="hr-leave-cal">
      <SgResourceCalendar
        :resources="resources"
        :assignments="assignments"
        scale="week"
        :column-width="120"
        :row-height="56"
        :sidebar-width="220"
      />
    </div>

    <SgTable v-else :columns="columns" :data="tableData" :page-size="10" size="small">
      <template #cell="{ column, row, value }">
        <SgTag v-if="column.key === 'type'">{{ leaveTypeLabel(String(value)) }}</SgTag>
        <SgTag v-else-if="column.key === 'status'" :color="statusColor(String(value))">
          {{ leaveStatusLabel(String(value)) }}
        </SgTag>
        <div v-else-if="column.key === 'actions'" style="display: flex; gap: 4px">
          <template v-if="row.status === 'pending'">
            <SgButton
              size="small"
              type="primary"
              @click="notification.success(lv.toasts.approved(String(row.employeeName)))"
              >{{ lv.table.approve }}</SgButton
            >
            <SgButton
              size="small"
              @click="notification.error(lv.toasts.rejected(String(row.employeeName)))"
              >{{ lv.table.reject }}</SgButton
            >
          </template>
        </div>
        <template v-else>{{ value }}</template>
      </template>
    </SgTable>
  </div>
</template>

<style scoped>
.hr-leave-cal {
  overflow-x: auto;
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: 8px;
}
</style>
