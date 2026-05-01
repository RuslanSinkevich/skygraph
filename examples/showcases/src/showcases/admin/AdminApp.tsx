import { useState } from 'react'
import type { TabItem } from '@skygraph/react'
import { systemUsers, auditLog, roles } from './data'
import { ShowcaseShell, StatsRow, percent } from '../_shared'
import { UsersTab } from './UsersTab'
import { AuditTab } from './AuditTab'
import { RolesTab } from './RolesTab'
import { SettingsTab } from './SettingsTab'
import { ApiKeysTab } from './ApiKeysTab'
import { SessionsTab } from './SessionsTab'

function AdminStats() {
  const active = systemUsers.filter(u => u.status === 'active').length
  const admins = systemUsers.filter(u => u.role === 'admin').length
  const twoFa = systemUsers.filter(u => u.twoFactor).length
  const pctTwoFa = Math.round((twoFa / systemUsers.length) * 100)
  const recentLogs = auditLog.filter(l => l.severity === 'critical').length

  return (
    <StatsRow
      items={[
        { label: 'Total Users', value: systemUsers.length, sub: `${active} active` },
        { label: 'Admins', value: admins, sub: `${roles.length} roles defined` },
        {
          label: '2FA Adoption',
          value: percent(pctTwoFa, 0),
          progress: pctTwoFa,
          progressStatus: pctTwoFa > 70 ? 'success' : 'active',
        },
        {
          label: 'Critical Events',
          value: recentLogs,
          subTone: recentLogs > 0 ? 'error' : 'default',
          sub: 'last 14 days',
        },
      ]}
    />
  )
}

export function AdminApp() {
  const [active, setActive] = useState('users')

  const tabs: TabItem[] = [
    { key: 'users', label: 'Users', children: <UsersTab /> },
    { key: 'sessions', label: 'Active Sessions', children: <SessionsTab /> },
    { key: 'apikeys', label: 'API Keys', children: <ApiKeysTab /> },
    { key: 'audit', label: 'Audit Log', children: <AuditTab /> },
    { key: 'roles', label: 'Access Control', children: <RolesTab /> },
    { key: 'settings', label: 'Settings', children: <SettingsTab /> },
  ]

  return <ShowcaseShell header={<AdminStats />} tabs={tabs} activeKey={active} onChange={setActive} />
}
