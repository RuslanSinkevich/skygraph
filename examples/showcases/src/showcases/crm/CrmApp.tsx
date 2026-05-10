import { useState } from 'react'
import type { TabItem } from '@skygraph/react'
import { contacts, deals, pipelineStats } from './data'
import { ShowcaseShell, StatsRow, money, useAppLocale } from '../_shared'
import { LeadsTab } from './LeadsTab'
import { ContactsTab } from './ContactsTab'
import { DealsTab } from './DealsTab'
import { PipelineTab } from './PipelineTab'
import { ActivityTab } from './ActivityTab'
import { HierarchyTab } from './HierarchyTab'
import { DeadlinesTab } from './DeadlinesTab'

function CrmStats() {
  const l = useAppLocale('crm').stats
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
          label: l.contacts,
          value: contacts.length,
          sub: l.contactsSub(contacts.filter((c) => c.status === 'customer').length),
        },
        {
          label: l.pipeline,
          value: money(totalDeals, { compact: true }),
          sub: l.pipelineSub(deals.length),
        },
        {
          label: l.won,
          value: money(wonValue, { compact: true }),
          subTone: 'success',
          sub: l.wonSub(wonDeals.length),
        },
        {
          label: l.avgDeal,
          value: money(avgDealSize, { compact: true }),
          sub: l.avgDealSub(winRate),
        },
        {
          label: l.lifetime,
          value: money(totalRevenue, { compact: true }),
          sub: l.lifetimeSub,
        },
      ]}
    />
  )
}

export function CrmApp() {
  const t = useAppLocale('crm').tabs
  const [active, setActive] = useState('leads')

  const tabs: TabItem[] = [
    { key: 'leads', label: t.leads, children: <LeadsTab /> },
    { key: 'contacts', label: t.contacts, children: <ContactsTab /> },
    { key: 'deals', label: t.deals, children: <DealsTab /> },
    { key: 'pipeline', label: t.pipeline, children: <PipelineTab /> },
    { key: 'hierarchy', label: t.hierarchy, children: <HierarchyTab /> },
    { key: 'deadlines', label: t.deadlines, children: <DeadlinesTab /> },
    { key: 'activity', label: t.activity, children: <ActivityTab /> },
  ]

  return <ShowcaseShell header={<CrmStats />} tabs={tabs} activeKey={active} onChange={setActive} />
}
