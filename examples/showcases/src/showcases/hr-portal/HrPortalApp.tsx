import { useState } from 'react'
import type { TabItem } from '@skygraph/react'
import { employees } from './data'
import { ShowcaseShell, StatsRow, money } from '../_shared'
import { DirectoryTab } from './DirectoryTab'
import { OrgTab } from './OrgTab'
import { LeaveTab } from './LeaveTab'
import { TeamAssignTab } from './TeamAssignTab'
import { OnboardingTab } from './OnboardingTab'
import { ReviewsTab } from './ReviewsTab'

function HrStats() {
  const active = employees.filter(e => e.status === 'active').length
  const remote = employees.filter(e => e.status === 'remote').length
  const onLeave = employees.filter(e => e.status === 'on-leave').length
  const avgSalary = Math.round(employees.reduce((s, e) => s + e.salary, 0) / employees.length)

  return (
    <StatsRow
      items={[
        { label: 'Total Employees', value: employees.length },
        { label: 'Active / Remote', value: `${active} / ${remote}` },
        { label: 'On Leave', value: onLeave },
        { label: 'Avg Salary', value: money(avgSalary, { compact: true }) },
      ]}
    />
  )
}

export function HrPortalApp() {
  const [active, setActive] = useState('directory')

  const tabs: TabItem[] = [
    { key: 'directory', label: 'Directory', children: <DirectoryTab /> },
    { key: 'org', label: 'Org Chart', children: <OrgTab /> },
    { key: 'leave', label: 'Leave Calendar', children: <LeaveTab /> },
    { key: 'reviews', label: 'Performance Reviews', children: <ReviewsTab /> },
    { key: 'team', label: 'Team Assign', children: <TeamAssignTab /> },
    { key: 'onboarding', label: 'Onboarding', children: <OnboardingTab /> },
  ]

  return <ShowcaseShell header={<HrStats />} tabs={tabs} activeKey={active} onChange={setActive} />
}
