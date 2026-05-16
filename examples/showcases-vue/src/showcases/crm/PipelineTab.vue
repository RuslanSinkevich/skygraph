<script setup lang="ts">
import { computed, ref } from 'vue'
import { SgTag, SgModal, SgButton, SgDescriptions, SgProgress, notification } from '@skygraph/vue'
import { deals as initialDeals, contacts as initialContacts } from './data'
import type { Deal } from './data'
import { Kanban, money, statusColor, useAppLocale } from '../_shared'
import { pipelineStages } from './common'

const lc = useAppLocale('crm')
const p = lc.pipeline
const stageLabel = (s: string) => lc.stageLabel[s] ?? s

const deals = ref<Deal[]>([...initialDeals])
const detail = ref<Deal | null>(null)

function colorForStage(stage: string): string {
  const sc = statusColor(stage)
  if (sc === 'success') return '#52c41a'
  if (sc === 'error') return '#ff4d4f'
  if (sc === 'warning') return '#faad14'
  if (sc === 'processing') return '#1677ff'
  return '#bfbfbf'
}

const columns = computed(() =>
  pipelineStages.map((stage) => {
    const stageDeals = deals.value.filter((d) => d.stage === stage)
    const total = stageDeals.reduce((s, d) => s + d.value, 0)
    return {
      key: stage,
      title: stageLabel(stage),
      color: colorForStage(stage),
      items: stageDeals,
      meta: `${stageDeals.length} · ${money(total, { compact: true })}`,
    }
  }),
)

function handleDrop(id: string | number, _from: string, to: string) {
  deals.value = deals.value.map((d) => (d.id === id ? { ...d, stage: to as Deal['stage'] } : d))
  notification.success(p.movedToast(stageLabel(to)))
}

function contactName(id: string): string {
  return initialContacts.find((c) => c.id === id)?.name ?? '—'
}

function markStage(stage: 'closed-won' | 'closed-lost') {
  if (!detail.value) return
  const id = detail.value.id
  deals.value = deals.value.map((d) => (d.id === id ? { ...d, stage } : d))
  if (stage === 'closed-won') notification.success(p.drawer.wonToast)
  else notification.error(p.drawer.lostToast)
  detail.value = null
}

function probabilityColor(probability: number): string {
  if (probability >= 70) return 'success'
  if (probability >= 40) return 'warning'
  return 'default'
}
</script>

<template>
  <p style="color: var(--sg-color-text-secondary); font-size: 13px; margin-bottom: 12px">
    {{ p.intro }}
  </p>
  <Kanban :columns="columns" @drop="handleDrop" @cardClick="(d) => (detail = d)">
    <template #card="{ item }">
      <div style="font-weight: 500; margin-bottom: 4px">{{ item.title }}</div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        "
      >
        <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
          {{ contactName(item.contactId) }}
        </span>
        <span style="font-weight: 600">{{ money(item.value, { compact: true }) }}</span>
      </div>
      <div style="display: flex; gap: 6px; align-items: center; font-size: 11px">
        <SgTag :color="probabilityColor(item.probability)">{{ item.probability }}%</SgTag>
        <span style="color: var(--sg-color-text-tertiary, var(--sg-color-text-secondary))">
          {{ item.createdAt }}
        </span>
      </div>
    </template>
  </Kanban>

  <SgModal
    :open="!!detail"
    :title="detail?.title ?? ''"
    :width="520"
    footer="none"
    @close="detail = null"
  >
    <template v-if="detail">
      <div style="display: flex; flex-direction: column; gap: 16px">
        <SgTag :color="statusColor(detail.stage)">{{ stageLabel(detail.stage) }}</SgTag>
        <SgDescriptions
          :items="[
            { label: p.drawer.value, value: money(detail.value) },
            { label: p.drawer.probability, value: `${detail.probability}%` },
            { label: p.drawer.created, value: detail.createdAt },
            { label: p.drawer.contact, value: contactName(detail.contactId) },
          ]"
          :column="2"
          size="small"
        />
        <h4>{{ p.drawer.winProbability }}</h4>
        <SgProgress
          :percent="detail.probability"
          :status="
            detail.stage === 'closed-won'
              ? 'success'
              : detail.stage === 'closed-lost'
                ? 'error'
                : 'active'
          "
        />
        <div style="display: flex; gap: 8px; justify-content: flex-end">
          <SgButton @click="detail = null">{{ p.drawer.close }}</SgButton>
          <template v-if="detail.stage !== 'closed-won' && detail.stage !== 'closed-lost'">
            <SgButton type="primary" @click="markStage('closed-won')">
              {{ p.drawer.markWon }}
            </SgButton>
            <SgButton @click="markStage('closed-lost')">{{ p.drawer.markLost }}</SgButton>
          </template>
        </div>
      </div>
    </template>
  </SgModal>
</template>
