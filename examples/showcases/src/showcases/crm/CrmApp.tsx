import { useState } from 'react'
import type { TabItem } from '@skygraph/react'
import { contacts, deals, pipelineStats } from './data'
import { ShowcaseShell, StatsRow, money } from '../_shared'
import { LeadsTab } from './LeadsTab'
import { ContactsTab } from './ContactsTab'
import { DealsTab } from './DealsTab'
import { PipelineTab } from './PipelineTab'
import { ActivityTab } from './ActivityTab'

function CrmStats() {
  const totalRevenue = contacts.reduce((s, c) => s + c.revenue, 0)
  const totalDeals = deals.reduce((s, d) => s + d.value, 0)
  const wonDeals = pipelineStats['closed-won']
  const wonValue = wonDeals.reduce((s, d) => s + d.value, 0)
  const avgDealSize = deals.length ? Math.round(totalDeals / deals.length) : 0
  const winRate = deals.length ? Math.round((wonDeals.length / deals.length) * 100) : 0

  return (
    <StatsRow
      items={[
        {
          label: 'Total Contacts',
          value: contacts.length,
          sub: `${contacts.filter(c => c.status === 'customer').length} customers`,
        },
        {
          label: 'Pipeline Value',
          value: money(totalDeals, { compact: true }),
          sub: `${deals.length} active deals`,
        },
        {
          label: 'Won Revenue',
          value: money(wonValue, { compact: true }),
          subTone: 'success',
          sub: `${wonDeals.length} deals closed`,
        },
        {
          label: 'Avg Deal Size',
          value: money(avgDealSize, { compact: true }),
          sub: `win rate ${winRate}%`,
        },
        {
          label: 'Total Revenue',
          value: money(totalRevenue, { compact: true }),
          sub: 'lifetime value',
        },
      ]}
    />
  )
}

export function CrmApp() {
  const [active, setActive] = useState('leads')

  const tabs: TabItem[] = [
    { key: 'leads', label: 'Leads', children: <LeadsTab /> },
    { key: 'contacts', label: 'Contacts', children: <ContactsTab /> },
    { key: 'deals', label: 'Deals', children: <DealsTab /> },
    { key: 'pipeline', label: 'Pipeline (Kanban)', children: <PipelineTab /> },
    { key: 'activity', label: 'Activity', children: <ActivityTab /> },
  ]

  return <ShowcaseShell header={<CrmStats />} tabs={tabs} activeKey={active} onChange={setActive} />
}
