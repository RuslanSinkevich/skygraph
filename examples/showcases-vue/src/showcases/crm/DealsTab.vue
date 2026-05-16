<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgTable,
  SgTag,
  SgButton,
  SgProgress,
  SgSegmented,
  SgDropdown,
  notification,
  type TableColumn,
} from '@skygraph/vue'
import { deals as initialDeals, contacts } from './data'
import type { Deal } from './data'
import { Toolbar, money, statusColor, shortDate, useAppLocale } from '../_shared'
import { pipelineStages } from './common'

type StageFilter = 'all' | Deal['stage']

const lc = useAppLocale('crm')
const dl = lc.deals
const stageLabel = (s: string) => lc.stageLabel[s] ?? s
const search = ref('')
const stageFilter = ref<StageFilter>('all')
const deals = ref<Deal[]>([...initialDeals])

function contactName(id: string): string {
  return contacts.find((c) => c.id === id)?.name ?? '—'
}
function contactCompany(id: string): string {
  return contacts.find((c) => c.id === id)?.company ?? '—'
}

const enrichedDeals = computed(() =>
  deals.value.map((d) => ({
    ...d,
    contactName: contactName(d.contactId),
    company: contactCompany(d.contactId),
  })),
)

const filteredByStage = computed(() =>
  stageFilter.value === 'all'
    ? enrichedDeals.value
    : enrichedDeals.value.filter((d) => d.stage === stageFilter.value),
)

const filtered = computed(() => {
  if (!search.value.trim()) return filteredByStage.value
  const q = search.value.toLowerCase()
  return filteredByStage.value.filter(
    (d) =>
      d.title.toLowerCase().includes(q) ||
      d.contactName.toLowerCase().includes(q) ||
      d.company.toLowerCase().includes(q),
  )
})

const tableData = computed(() =>
  filtered.value.map((d) => ({ id: d.id, data: d as unknown as Record<string, unknown> })),
)

const columns: TableColumn[] = [
  { key: 'title', title: dl.columns.deal, width: 280, sortable: true },
  { key: 'value', title: dl.columns.value, width: 120, sortable: true, align: 'right' },
  {
    key: 'stage',
    title: dl.columns.stage,
    width: 130,
    sortable: true,
    filters: pipelineStages.map((s) => ({ text: stageLabel(s), value: s })),
    onFilter: (value, row) => row.stage === value,
  },
  { key: 'probability', title: dl.columns.probability, width: 140, sortable: true },
  { key: 'createdAt', title: dl.columns.created, width: 110, sortable: true },
  { key: 'actions', title: '', width: 140 },
]

const segmentedOptions = computed(() => [
  { label: dl.filterAll(deals.value.length), value: 'all' },
  ...pipelineStages.map((s) => ({
    label: `${stageLabel(s)} (${deals.value.filter((d) => d.stage === s).length})`,
    value: s,
  })),
])

const totals = computed(() => {
  const open = deals.value.filter((d) => d.stage !== 'closed-won' && d.stage !== 'closed-lost')
  const won = deals.value.filter((d) => d.stage === 'closed-won')
  return {
    openValue: open.reduce((s, d) => s + d.value, 0),
    wonValue: won.reduce((s, d) => s + d.value, 0),
    weighted: open.reduce((s, d) => s + (d.value * d.probability) / 100, 0),
  }
})

function handleAction(key: string | number, rowId: string) {
  const k = String(key)
  if (k === 'won') {
    deals.value = deals.value.map((d) => (d.id === rowId ? { ...d, stage: 'closed-won' } : d))
    notification.success(dl.toasts.won)
  } else if (k === 'lost') {
    deals.value = deals.value.map((d) => (d.id === rowId ? { ...d, stage: 'closed-lost' } : d))
    notification.error(dl.toasts.lost)
  } else {
    notification.info(`${k}: ${rowId}`)
  }
}
</script>

<template>
  <Toolbar v-model:searchValue="search" :search-placeholder="dl.searchPlaceholder">
    <template #filters>
      <SgSegmented
        :value="stageFilter"
        :options="segmentedOptions"
        @change="(v: string | number) => (stageFilter = String(v) as StageFilter)"
      />
    </template>
    <template #actions>
      <SgTag color="processing">{{ dl.open(money(totals.openValue, { compact: true })) }}</SgTag>
      <SgTag color="warning">{{ dl.weighted(money(totals.weighted, { compact: true })) }}</SgTag>
      <SgTag color="success">{{ dl.won(money(totals.wonValue, { compact: true })) }}</SgTag>
    </template>
  </Toolbar>

  <SgTable :columns="columns" :data="tableData" :page-size="10" size="small" striped>
    <template #cell="{ column, row, id, value }">
      <template v-if="column.key === 'title'">
        <div>
          <div style="font-weight: 500">{{ String(value) }}</div>
          <div style="font-size: 12px; color: var(--sg-color-text-secondary)">
            {{ String(row.contactName) }} · {{ String(row.company) }}
          </div>
        </div>
      </template>
      <span v-else-if="column.key === 'value'" style="font-weight: 500">
        {{ money(Number(value)) }}
      </span>
      <SgTag v-else-if="column.key === 'stage'" :color="statusColor(String(value))">{{
        stageLabel(String(value))
      }}</SgTag>
      <template v-else-if="column.key === 'probability'">
        <div style="display: flex; align-items: center; gap: 8px">
          <SgProgress :percent="Number(value)" size="small" :show-info="false" style="flex: 1" />
          <span style="font-size: 12px; min-width: 32px">{{ Number(value) }}%</span>
        </div>
      </template>
      <template v-else-if="column.key === 'createdAt'">{{ shortDate(String(value)) }}</template>
      <div v-else-if="column.key === 'actions'" style="display: flex; gap: 4px">
        <SgButton size="small" @click="notification.info(`${dl.rowActions.details}: ${id}`)">
          {{ dl.rowActions.details }}
        </SgButton>
        <SgDropdown
          :items="[
            { key: 'won', label: dl.rowActions.markWon },
            { key: 'lost', label: dl.rowActions.markLost, danger: true },
            { key: 'reassign', label: dl.rowActions.reassign },
          ]"
          @select="(k: string | number) => handleAction(k, String(id))"
        >
          <SgButton size="small">⋯</SgButton>
        </SgDropdown>
      </div>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>
</template>
