<script setup lang="ts">
import { computed, ref } from 'vue'
import { SgResourceCalendar, SgTag, SgEmpty } from '@skygraph/vue'
import type {
  ResourceCalendarResource as Resource,
  ResourceCalendarAssignment as Assignment,
} from '@skygraph/vue'
import { activities, contacts, deals } from './data'
import { money, useAppLocale } from '../_shared'

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
const DAY_MS = 86_400_000

function dateMs(s: string): number {
  return new Date(s + 'T00:00:00Z').getTime()
}

const lc = useAppLocale('crm')
const dl = lc.deadlines
const stageLabel = (s: string) => lc.stageLabel[s] ?? s

const built = computed(() => {
  const byCompany = new Map<string, typeof contacts>()
  for (const c of contacts) {
    const list = byCompany.get(c.company) ?? []
    list.push(c)
    byCompany.set(c.company, list)
  }
  const top = [...byCompany.entries()]
    .sort((a, b) => {
      const sa = a[1].reduce((s, c) => s + c.revenue, 0)
      const sb = b[1].reduce((s, c) => s + c.revenue, 0)
      return sb - sa
    })
    .slice(0, 8)
  const rs: Resource[] = top.map(([company], i) => ({
    id: `co:${company}`,
    name: company,
    color: PALETTE[i % PALETTE.length]!,
  }))
  const lookup = new Map<string, string>()
  for (const [company, list] of top) for (const c of list) lookup.set(c.id, `co:${company}`)

  const items: Assignment[] = []
  let n = 0
  for (const a of activities) {
    const rid = lookup.get(a.contactId)
    if (!rid) continue
    const start = dateMs(a.date)
    items.push({
      id: `act-${a.id}`,
      resourceId: rid,
      title: `${a.type}: ${a.description}`,
      start,
      end: start + DAY_MS,
    })
    if (++n > 80) break
  }
  for (const d of deals) {
    if (d.stage === 'closed-won' || d.stage === 'closed-lost') continue
    const rid = lookup.get(d.contactId)
    if (!rid) continue
    const created = dateMs(d.createdAt)
    const target = created + Math.round((100 - d.probability) * 0.6 + 14) * DAY_MS
    items.push({
      id: `deal-${d.id}`,
      resourceId: rid,
      title: `${stageLabel(d.stage)} · ${d.title} (${money(d.value, { compact: true })})`,
      start: target - 2 * DAY_MS,
      end: target + 2 * DAY_MS,
    })
  }
  return { resources: rs, assignments: items }
})

const resources = computed(() => built.value.resources)
const assignments = ref<Assignment[]>(built.value.assignments)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <p style="color: var(--sg-color-text-secondary); font-size: 13px; margin: 0">
      {{ dl.intro }}
    </p>
    <div
      style="
        overflow-x: auto;
        border: 1px solid var(--sg-color-border-secondary);
        border-radius: 8px;
      "
    >
      <SgResourceCalendar
        :resources="resources"
        :assignments="assignments"
        scale="week"
        :column-width="100"
        :row-height="56"
        :sidebar-width="180"
      />
    </div>
    <div style="display: flex; align-items: center; gap: 8px">
      <strong style="font-size: 13px">{{ dl.conflictsLabel }}</strong>
      <SgTag color="success">{{ dl.conflictsNone }}</SgTag>
    </div>
    <SgEmpty v-if="assignments.length === 0" :description="dl.noActivities" />
  </div>
</template>
