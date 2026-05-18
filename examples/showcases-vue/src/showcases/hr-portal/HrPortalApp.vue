<script setup lang="ts">
import { ref } from 'vue'
import { SgTabs, type TabItem } from '@skygraph/vue'
import { ShowcaseShell, StatsRow, type StatItem, money, useAppLocale } from '../_shared'
import { employees } from './data'
import DirectoryTab from './DirectoryTab.vue'
import OrgTab from './OrgTab.vue'
import LeaveTab from './LeaveTab.vue'
import ReviewsTab from './ReviewsTab.vue'
import TeamAssignTab from './TeamAssignTab.vue'
import OnboardingTab from './OnboardingTab.vue'

const l = useAppLocale('hrPortal')
const active = ref('directory')

const tabs: TabItem[] = [
  { key: 'directory', label: l.tabs.directory },
  { key: 'org', label: l.tabs.org },
  { key: 'leave', label: l.tabs.leave },
  { key: 'reviews', label: l.tabs.reviews },
  { key: 'team', label: l.tabs.team },
  { key: 'onboarding', label: l.tabs.onboarding },
]

const activeCount = employees.filter((e) => e.status === 'active').length
const remoteCount = employees.filter((e) => e.status === 'remote').length
const onLeaveCount = employees.filter((e) => e.status === 'on-leave').length
const avgSalary = Math.round(employees.reduce((s, e) => s + e.salary, 0) / employees.length)

const statItems: StatItem[] = [
  { key: 'total', label: l.stats.total, value: employees.length },
  {
    key: 'activeRemote',
    label: l.stats.activeRemote,
    value: `${activeCount} / ${remoteCount}`,
  },
  { key: 'onLeave', label: l.stats.onLeave, value: onLeaveCount },
  { key: 'avgSalary', label: l.stats.avgSalary, value: money(avgSalary, { compact: true }) },
]
</script>

<template>
  <ShowcaseShell>
    <template #header>
      <StatsRow :items="statItems" />
    </template>
    <SgTabs :items="tabs" :active-key="active" @change="(k) => (active = String(k))">
      <template #panel="{ item }">
        <DirectoryTab v-if="item.key === 'directory'" />
        <OrgTab v-else-if="item.key === 'org'" />
        <LeaveTab v-else-if="item.key === 'leave'" />
        <ReviewsTab v-else-if="item.key === 'reviews'" />
        <TeamAssignTab v-else-if="item.key === 'team'" />
        <OnboardingTab v-else-if="item.key === 'onboarding'" />
      </template>
    </SgTabs>
  </ShowcaseShell>
</template>
