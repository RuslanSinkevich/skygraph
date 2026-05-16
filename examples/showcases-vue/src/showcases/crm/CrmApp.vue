<script setup lang="ts">
import { ref } from 'vue'
import { SgTabs, type TabItem } from '@skygraph/vue'
import { ShowcaseShell, StatsRow, type StatItem, money, useAppLocale } from '../_shared'
import { contacts, deals, pipelineStats } from './data'
import LeadsTab from './LeadsTab.vue'
import ContactsTab from './ContactsTab.vue'
import DealsTab from './DealsTab.vue'
import PipelineTab from './PipelineTab.vue'
import HierarchyTab from './HierarchyTab.vue'
import DeadlinesTab from './DeadlinesTab.vue'
import ActivityTab from './ActivityTab.vue'

const lc = useAppLocale('crm')
const tStats = lc.stats
const tTabs = lc.tabs

const active = ref('leads')

const tabs: TabItem[] = [
  { key: 'leads', label: tTabs.leads },
  { key: 'contacts', label: tTabs.contacts },
  { key: 'deals', label: tTabs.deals },
  { key: 'pipeline', label: tTabs.pipeline },
  { key: 'hierarchy', label: tTabs.hierarchy },
  { key: 'deadlines', label: tTabs.deadlines },
  { key: 'activity', label: tTabs.activity },
]

const totalRevenue = contacts.reduce((s, c) => s + c.revenue, 0)
const totalDeals = deals.reduce((s, d) => s + d.value, 0)
const wonDeals = pipelineStats['closed-won']
const wonValue = wonDeals.reduce((s, d) => s + d.value, 0)
const avgDealSize = deals.length ? Math.round(totalDeals / deals.length) : 0
const winRate = deals.length ? Math.round((wonDeals.length / deals.length) * 100) : 0
const customerCount = contacts.filter((c) => c.status === 'customer').length

const statItems: StatItem[] = [
  {
    key: 'contacts',
    label: tStats.contacts,
    value: contacts.length,
    sub: tStats.contactsSub(customerCount),
  },
  {
    key: 'pipeline',
    label: tStats.pipeline,
    value: money(totalDeals, { compact: true }),
    sub: tStats.pipelineSub(deals.length),
  },
  {
    key: 'won',
    label: tStats.won,
    value: money(wonValue, { compact: true }),
    sub: tStats.wonSub(wonDeals.length),
    subTone: 'success',
  },
  {
    key: 'avg',
    label: tStats.avgDeal,
    value: money(avgDealSize, { compact: true }),
    sub: tStats.avgDealSub(winRate),
  },
  {
    key: 'lifetime',
    label: tStats.lifetime,
    value: money(totalRevenue, { compact: true }),
    sub: tStats.lifetimeSub,
  },
]
</script>

<template>
  <ShowcaseShell>
    <template #header>
      <StatsRow :items="statItems" />
    </template>
    <SgTabs :items="tabs" :active-key="active" @change="(k) => (active = String(k))">
      <template #panel="{ item }">
        <LeadsTab v-if="item.key === 'leads'" />
        <ContactsTab v-else-if="item.key === 'contacts'" />
        <DealsTab v-else-if="item.key === 'deals'" />
        <PipelineTab v-else-if="item.key === 'pipeline'" />
        <HierarchyTab v-else-if="item.key === 'hierarchy'" />
        <DeadlinesTab v-else-if="item.key === 'deadlines'" />
        <ActivityTab v-else-if="item.key === 'activity'" />
      </template>
    </SgTabs>
  </ShowcaseShell>
</template>
