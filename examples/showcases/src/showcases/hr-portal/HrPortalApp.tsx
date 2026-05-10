import { useState } from 'react'
import type { TabItem } from '@skygraph/react'
import { employees } from './data'
import { ShowcaseShell, StatsRow, money, useAppLocale } from '../_shared'
import { DirectoryTab } from './DirectoryTab'
import { OrgTab } from './OrgTab'
import { LeaveTab } from './LeaveTab'
import { TeamAssignTab } from './TeamAssignTab'
import { OnboardingTab } from './OnboardingTab'
import { ReviewsTab } from './ReviewsTab'

function HrStats() {
  const l = useAppLocale('hrPortal')
  const active = employees.filter((e) => e.status === 'active').length
  const remote = employees.filter((e) => e.status === 'remote').length
  const onLeave = employees.filter((e) => e.status === 'on-leave').length
  const avgSalary = Math.round(employees.reduce((s, e) => s + e.salary, 0) / employees.length)

  return (
    <StatsRow
      items={[
        { label: l.stats.total, value: employees.length },
        { label: l.stats.activeRemote, value: `${active} / ${remote}` },
        { label: l.stats.onLeave, value: onLeave },
        { label: l.stats.avgSalary, value: money(avgSalary, { compact: true }) },
      ]}
    />
  )
}

export function HrPortalApp() {
  const l = useAppLocale('hrPortal')
  const [active, setActive] = useState('directory')

  const tabs: TabItem[] = [
    { key: 'directory', label: l.tabs.directory, children: <DirectoryTab /> },
    { key: 'org', label: l.tabs.org, children: <OrgTab /> },
    { key: 'leave', label: l.tabs.leave, children: <LeaveTab /> },
    { key: 'reviews', label: l.tabs.reviews, children: <ReviewsTab /> },
    { key: 'team', label: l.tabs.team, children: <TeamAssignTab /> },
    { key: 'onboarding', label: l.tabs.onboarding, children: <OnboardingTab /> },
  ]

  return <ShowcaseShell header={<HrStats />} tabs={tabs} activeKey={active} onChange={setActive} />
}
