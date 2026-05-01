import { useState } from 'react'
import type { TabItem } from '@skygraph/react'
import { sprintProgress } from './data'
import { ShowcaseShell, StatsRow } from '../_shared'
import { TasksTab } from './TasksTab'
import { BoardTab } from './BoardTab'
import { ProjectsTab } from './ProjectsTab'
import { CalendarTab } from './CalendarTab'

function ProjectStats() {
  const pct = Math.round((sprintProgress.done / sprintProgress.total) * 100)
  return (
    <StatsRow
      items={[
        {
          label: 'Sprint Progress',
          value: `${pct}%`,
          progress: pct,
          progressStatus: pct >= 80 ? 'success' : 'active',
          sub: `${sprintProgress.done} of ${sprintProgress.total} done`,
        },
        { label: 'In Progress', value: sprintProgress.inProgress },
        { label: 'In Review', value: sprintProgress.review },
        { label: 'To Do', value: sprintProgress.todo },
      ]}
    />
  )
}

export function ProjectTrackerApp() {
  const [active, setActive] = useState('board')

  const tabs: TabItem[] = [
    { key: 'board', label: 'Board (Kanban)', children: <BoardTab /> },
    { key: 'tasks', label: 'Tasks', children: <TasksTab /> },
    { key: 'projects', label: 'Projects', children: <ProjectsTab /> },
    { key: 'calendar', label: 'Calendar', children: <CalendarTab /> },
  ]

  return <ShowcaseShell header={<ProjectStats />} tabs={tabs} activeKey={active} onChange={setActive} />
}
