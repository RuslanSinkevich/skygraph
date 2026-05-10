import { useState } from 'react'
import type { TabItem } from '@skygraph/react'
import { systemUsers, auditLog, roles } from './data'
import { ShowcaseShell, StatsRow, percent, useAppLocale } from '../_shared'
import { UsersTab } from './UsersTab'
import { AuditTab } from './AuditTab'
import { RolesTab } from './RolesTab'
import { SettingsTab } from './SettingsTab'
import { ApiKeysTab } from './ApiKeysTab'
import { SessionsTab } from './SessionsTab'

function AdminStats() {
  const l = useAppLocale('admin')
  const active = systemUsers.filter((u) => u.status === 'active').length
  const admins = systemUsers.filter((u) => u.role === 'admin').length
  const twoFa = systemUsers.filter((u) => u.twoFactor).length
  const pctTwoFa = Math.round((twoFa / systemUsers.length) * 100)
  const recentLogs = auditLog.filter((lg) => lg.severity === 'critical').length

  return (
    <StatsRow
      items={[
        { label: l.stats.total, value: systemUsers.length, sub: l.stats.totalSub(active) },
        { label: l.stats.admins, value: admins, sub: l.stats.adminsSub(roles.length) },
        {
          label: l.stats.twoFa,
          value: percent(pctTwoFa, 0),
          progress: pctTwoFa,
          progressStatus: pctTwoFa > 70 ? 'success' : 'active',
        },
        {
          label: l.stats.critical,
          value: recentLogs,
          subTone: recentLogs > 0 ? 'error' : 'default',
          sub: l.stats.criticalSub,
        },
      ]}
    />
  )
}

export function AdminApp() {
  const l = useAppLocale('admin')
  const [active, setActive] = useState('users')

  const tabs: TabItem[] = [
    { key: 'users', label: l.tabs.users, children: <UsersTab /> },
    { key: 'sessions', label: l.tabs.sessions, children: <SessionsTab /> },
    { key: 'apikeys', label: l.tabs.apiKeys, children: <ApiKeysTab /> },
    { key: 'audit', label: l.tabs.audit, children: <AuditTab /> },
    { key: 'roles', label: l.tabs.roles, children: <RolesTab /> },
    { key: 'settings', label: l.tabs.settings, children: <SettingsTab /> },
  ]

  return (
    <ShowcaseShell header={<AdminStats />} tabs={tabs} activeKey={active} onChange={setActive} />
  )
}
