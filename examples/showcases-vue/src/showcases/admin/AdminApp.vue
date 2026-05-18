<script setup lang="ts">
import { ref } from 'vue'
import { SgTabs, type TabItem } from '@skygraph/vue'
import { ShowcaseShell, StatsRow, type StatItem, percent, useAppLocale } from '../_shared'
import { systemUsers, auditLog, roles } from './data'
import UsersTab from './UsersTab.vue'
import SessionsTab from './SessionsTab.vue'
import ApiKeysTab from './ApiKeysTab.vue'
import AuditTab from './AuditTab.vue'
import RolesTab from './RolesTab.vue'
import SettingsTab from './SettingsTab.vue'

const l = useAppLocale('admin')
const active = ref('users')

const tabs: TabItem[] = [
  { key: 'users', label: l.tabs.users },
  { key: 'sessions', label: l.tabs.sessions },
  { key: 'apikeys', label: l.tabs.apiKeys },
  { key: 'audit', label: l.tabs.audit },
  { key: 'roles', label: l.tabs.roles },
  { key: 'settings', label: l.tabs.settings },
]

const activeUsers = systemUsers.filter((u) => u.status === 'active').length
const admins = systemUsers.filter((u) => u.role === 'admin').length
const twoFa = systemUsers.filter((u) => u.twoFactor).length
const pctTwoFa = Math.round((twoFa / systemUsers.length) * 100)
const recentLogs = auditLog.filter((lg) => lg.severity === 'critical').length

const statItems: StatItem[] = [
  {
    key: 'total',
    label: l.stats.total,
    value: systemUsers.length,
    sub: l.stats.totalSub(activeUsers),
  },
  { key: 'admins', label: l.stats.admins, value: admins, sub: l.stats.adminsSub(roles.length) },
  {
    key: 'twoFa',
    label: l.stats.twoFa,
    value: percent(pctTwoFa, 0),
    progress: pctTwoFa,
    progressStatus: pctTwoFa > 70 ? 'success' : 'active',
  },
  {
    key: 'critical',
    label: l.stats.critical,
    value: recentLogs,
    subTone: recentLogs > 0 ? 'error' : 'default',
    sub: l.stats.criticalSub,
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
        <UsersTab v-if="item.key === 'users'" />
        <SessionsTab v-else-if="item.key === 'sessions'" />
        <ApiKeysTab v-else-if="item.key === 'apikeys'" />
        <AuditTab v-else-if="item.key === 'audit'" />
        <RolesTab v-else-if="item.key === 'roles'" />
        <SettingsTab v-else-if="item.key === 'settings'" />
      </template>
    </SgTabs>
  </ShowcaseShell>
</template>
