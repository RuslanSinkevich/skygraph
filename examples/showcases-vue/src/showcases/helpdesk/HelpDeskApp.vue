<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgTable,
  SgTag,
  SgButton,
  SgSegmented,
  SgModal,
  SgDescriptions,
  SgNotificationContainer,
  notification,
  type TableColumn,
} from '@skygraph/vue'
import { tickets as initialTickets, STATUS_COLOR, PRIORITY_COLOR } from './data'
import type { Ticket, TicketStatus, TicketPriority } from './data'
import { ShowcaseShell, StatsRow, Toolbar, type StatItem, useAppLocale } from '../_shared'

type FilterKey = 'all' | 'open' | 'pending' | 'resolved' | 'urgent'

const l = useAppLocale('helpdesk')
const tickets = ref<Ticket[]>([...initialTickets])
const filter = ref<FilterKey>('all')
const search = ref('')
const selected = ref<Ticket | null>(null)

const stats = computed(() => ({
  open: tickets.value.filter((t) => t.status === 'new' || t.status === 'open').length,
  pending: tickets.value.filter((t) => t.status === 'pending').length,
  urgent: tickets.value.filter((t) => t.priority === 'urgent').length,
  resolved: tickets.value.filter((t) => t.status === 'resolved').length,
}))

const filterFn = (t: Ticket) => {
  if (filter.value === 'all') return true
  if (filter.value === 'open') return t.status === 'new' || t.status === 'open'
  if (filter.value === 'pending') return t.status === 'pending'
  if (filter.value === 'resolved') return t.status === 'resolved' || t.status === 'closed'
  if (filter.value === 'urgent') return t.priority === 'urgent' || t.priority === 'high'
  return true
}

const filtered = computed(() => {
  const base = tickets.value.filter(filterFn)
  if (!search.value.trim()) return base
  const q = search.value.toLowerCase()
  return base.filter(
    (t) =>
      t.subject.toLowerCase().includes(q) ||
      t.customerName.toLowerCase().includes(q) ||
      t.assigneeName.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q),
  )
})

const tableData = computed(() =>
  filtered.value.map((t) => ({ id: t.id, data: t as unknown as Record<string, unknown> })),
)

const columns: TableColumn[] = [
  { key: 'id', title: l.columns.id, width: 100, sortable: true, fixed: 'left' },
  { key: 'subject', title: l.columns.subject, sortable: true },
  { key: 'customerName', title: l.columns.customer, width: 140 },
  { key: 'assigneeName', title: l.columns.assignee, width: 140 },
  { key: 'priority', title: l.columns.priority, width: 100 },
  { key: 'status', title: l.columns.status, width: 100 },
  { key: 'actions', title: '', width: 110 },
]

const statItems = computed<StatItem[]>(() => [
  {
    key: 'open',
    label: l.stats.open,
    value: stats.value.open,
    sub: l.stats.openSub,
  },
  {
    key: 'pending',
    label: l.stats.pending,
    value: stats.value.pending,
    sub: l.stats.pendingSub,
  },
  {
    key: 'urgent',
    label: l.stats.urgent,
    value: stats.value.urgent,
    sub: l.stats.urgentSub,
    subTone: 'error',
  },
  {
    key: 'resolved',
    label: l.stats.resolved,
    value: stats.value.resolved,
    sub: l.stats.resolvedSub,
    subTone: 'success',
  },
])

const segmentedOptions = computed(() => [
  { label: l.filters.all, value: 'all' },
  { label: l.filters.open, value: 'open' },
  { label: l.filters.pending, value: 'pending' },
  { label: l.filters.urgent, value: 'urgent' },
  { label: l.filters.resolved, value: 'resolved' },
])

function openTicket(id: string) {
  const t = tickets.value.find((x) => x.id === id) ?? null
  selected.value = t
}

function resolveSelected() {
  if (!selected.value) return
  const id = selected.value.id
  tickets.value = tickets.value.map((t) =>
    t.id === id ? { ...t, status: 'resolved' as TicketStatus } : t,
  )
  notification.success(l.toasts.statusUpdate(id, l.statusLabel.resolved))
  selected.value = null
}
</script>

<template>
  <ShowcaseShell>
    <template #header>
      <StatsRow :items="statItems" />
    </template>
    <SgNotificationContainer />
    <Toolbar v-model:searchValue="search" :search-placeholder="l.searchPlaceholder">
      <template #filters>
        <SgSegmented
          :value="filter"
          :options="segmentedOptions"
          @change="(v: string | number) => (filter = String(v) as FilterKey)"
        />
      </template>
      <template #actions>
        <SgButton type="primary" @click="notification.info(l.newTicket)">
          {{ l.newTicket }}
        </SgButton>
      </template>
    </Toolbar>

    <SgTable :columns="columns" :data="tableData" :page-size="10" size="small" bordered>
      <template #cell="{ column, row, id, value }">
        <code v-if="column.key === 'id'" style="font-size: 12px">{{ String(value) }}</code>
        <div v-else-if="column.key === 'subject'">
          <div style="font-weight: 500">{{ String(value) }}</div>
          <div style="font-size: 11px; color: var(--sg-color-text-secondary); margin-top: 2px">
            {{ String(row.product) }} · {{ String(row.channel) }}
          </div>
        </div>
        <SgTag
          v-else-if="column.key === 'priority'"
          :color="PRIORITY_COLOR[row.priority as TicketPriority]"
          >{{ l.priorityLabel[row.priority as TicketPriority] ?? String(value) }}</SgTag
        >
        <SgTag
          v-else-if="column.key === 'status'"
          :color="STATUS_COLOR[row.status as TicketStatus]"
          >{{ l.statusLabel[row.status as TicketStatus] ?? String(value) }}</SgTag
        >
        <div v-else-if="column.key === 'actions'">
          <SgButton size="small" @click="openTicket(String(id))">
            {{ l.rowActions.open }}
          </SgButton>
        </div>
        <template v-else>{{ value }}</template>
      </template>
    </SgTable>

    <SgModal
      :open="!!selected"
      :title="selected?.subject ?? ''"
      :width="640"
      :ok-text="l.drawer.resolveBtn"
      @close="selected = null"
      @ok="resolveSelected"
    >
      <template v-if="selected">
        <div style="display: flex; flex-direction: column; gap: 12px">
          <div style="display: flex; gap: 8px">
            <SgTag :color="STATUS_COLOR[selected.status]">
              {{ l.statusLabel[selected.status] }}
            </SgTag>
            <SgTag :color="PRIORITY_COLOR[selected.priority]">
              {{ l.priorityLabel[selected.priority] }}
            </SgTag>
          </div>
          <SgDescriptions
            :items="[
              {
                label: l.drawer.customer,
                value: `${selected.customerName} (${selected.customerEmail})`,
              },
              { label: l.drawer.assignee, value: selected.assigneeName },
              { label: l.drawer.channel, value: selected.channel },
              { label: l.drawer.product, value: selected.product },
            ]"
            :column="2"
            size="small"
          />
          <p>{{ selected.description }}</p>
        </div>
      </template>
    </SgModal>
  </ShowcaseShell>
</template>
