<script setup lang="ts">
import { computed, ref } from 'vue'
import { SgTree, SgBreadcrumb, SgTag, SgProgress, SgEmpty } from '@skygraph/vue'
import type { TreeNodeData } from '@skygraph/vue'
import { contacts, deals } from './data'
import { money, statusColor, useAppLocale } from '../_shared'

const lc = useAppLocale('crm')
const h = lc.hierarchy
const stageLabel = (s: string) => lc.stageLabel[s] ?? s

const tree = computed<TreeNodeData[]>(() => {
  const byCompany = new Map<string, typeof contacts>()
  for (const c of contacts) {
    const list = byCompany.get(c.company) ?? []
    list.push(c)
    byCompany.set(c.company, list)
  }
  const companies: TreeNodeData[] = [...byCompany.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([company, list]) => ({
      key: `co:${company}`,
      title: `${company}`,
      children: list.map((c) => ({
        key: `ct:${c.id}`,
        title: `${c.name} — ${money(c.revenue, { compact: true })}`,
      })),
    }))
  return [
    {
      key: 'all',
      title: h.allAccounts(contacts.length, byCompany.size),
      children: companies,
    },
  ]
})

const selected = ref<string>('all')

const path = computed(() => {
  if (selected.value === 'all') return [h.breadcrumbRoot, h.breadcrumbAll]
  if (selected.value.startsWith('co:')) return [h.breadcrumbRoot, selected.value.slice(3)]
  if (selected.value.startsWith('ct:')) {
    const c = contacts.find((x) => x.id === selected.value.slice(3))
    return c ? [h.breadcrumbRoot, c.company, c.name] : [h.breadcrumbRoot]
  }
  return [h.breadcrumbRoot]
})

const view = computed(() => {
  if (selected.value.startsWith('ct:')) {
    const id = selected.value.slice(3)
    const contact = contacts.find((c) => c.id === id) ?? null
    const dealsFor = deals.filter((d) => d.contactId === id)
    return { kind: 'contact' as const, contact, deals: dealsFor }
  }
  if (selected.value.startsWith('co:')) {
    const company = selected.value.slice(3)
    const cs = contacts.filter((c) => c.company === company)
    const ids = new Set(cs.map((c) => c.id))
    const dealsFor = deals.filter((d) => ids.has(d.contactId))
    return { kind: 'company' as const, company, contacts: cs, deals: dealsFor }
  }
  return { kind: 'all' as const, contacts, deals }
})

const totalRevenue = computed(() => {
  if (view.value.kind === 'contact') return view.value.contact?.revenue ?? 0
  if (view.value.kind === 'company') return view.value.contacts.reduce((s, c) => s + c.revenue, 0)
  return view.value.contacts.reduce((s, c) => s + c.revenue, 0)
})

const dealValue = computed(() => view.value.deals.reduce((s, d) => s + d.value, 0))

const customers = computed(() => {
  if (view.value.kind === 'contact') return view.value.contact?.status === 'customer' ? 1 : 0
  return view.value.contacts.filter((c) => c.status === 'customer').length
})

const breadcrumbItems = computed(() => path.value.map((title) => ({ title })))

function onSelect(keys: (string | number)[]) {
  if (keys.length) selected.value = String(keys[0])
}
</script>

<template>
  <div style="display: flex; gap: 16px; min-height: 480px">
    <div
      style="
        width: 300px;
        flex-shrink: 0;
        border-right: 1px solid var(--sg-color-border-secondary);
        padding-right: 12px;
      "
    >
      <SgTree :tree-data="tree" :selected-keys="[selected]" default-expand-all @select="onSelect" />
    </div>
    <div style="flex: 1; min-width: 0">
      <SgBreadcrumb :items="breadcrumbItems" />
      <div
        style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 16px"
      >
        <div class="hier-kpi">
          <div class="hier-kpi-label">{{ h.kpi.lifetime }}</div>
          <div class="hier-kpi-value">{{ money(totalRevenue, { compact: true }) }}</div>
        </div>
        <div class="hier-kpi">
          <div class="hier-kpi-label">{{ h.kpi.pipeline }}</div>
          <div class="hier-kpi-value">{{ money(dealValue, { compact: true }) }}</div>
          <div class="hier-kpi-sub">{{ h.kpi.pipelineSub(view.deals.length) }}</div>
        </div>
        <div class="hier-kpi">
          <div class="hier-kpi-label">{{ h.kpi.customers }}</div>
          <div class="hier-kpi-value">{{ customers }}</div>
        </div>
      </div>

      <h4 style="margin-top: 24px; margin-bottom: 8px">
        {{ h.dealsHeading(view.deals.length) }}
      </h4>
      <SgEmpty v-if="view.deals.length === 0" :description="h.noDeals" />
      <div v-else style="display: flex; flex-direction: column; gap: 6px">
        <div
          v-for="d of view.deals.slice(0, 12)"
          :key="d.id"
          style="
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px 12px;
            border: 1px solid var(--sg-color-border-secondary);
            border-radius: 6px;
          "
        >
          <SgTag :color="statusColor(d.stage)">{{ stageLabel(d.stage) }}</SgTag>
          <span style="flex: 1; font-size: 13px; font-weight: 500">{{ d.title }}</span>
          <SgProgress :percent="d.probability" :show-info="false" :style="{ width: '80px' }" />
          <span style="width: 84px; text-align: right; font-weight: 600">
            {{ money(d.value, { compact: true }) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hier-kpi {
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: 8px;
  padding: 10px 14px;
  background: var(--sg-color-bg-container);
}
.hier-kpi-label {
  font-size: 11px;
  color: var(--sg-color-text-secondary);
  text-transform: uppercase;
}
.hier-kpi-value {
  font-size: 22px;
  font-weight: 600;
  margin-top: 4px;
}
.hier-kpi-sub {
  font-size: 11px;
  color: var(--sg-color-text-secondary);
  margin-top: 2px;
}
</style>
