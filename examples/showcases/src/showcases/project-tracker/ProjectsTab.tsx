import { useState } from 'react'
import { Tag, Tree, Breadcrumb, Progress } from '@skygraph/react'
import { tasks, projectTree } from './data'
import { priorityColors, statusColors, statusLabels } from './common'

export function ProjectsTab() {
  const [selected, setSelected] = useState<string>('all')

  const projectTasks = selected === 'all'
    ? tasks
    : tasks.filter(t => t.project.toLowerCase().replace(/\s/g, '-') === selected
      || selected.startsWith(t.project.toLowerCase().replace(/\s/g, '-')))

  const done = projectTasks.filter(t => t.status === 'done').length
  const pct = projectTasks.length ? Math.round((done / projectTasks.length) * 100) : 0

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ width: 240, flexShrink: 0 }}>
        <Tree
          treeData={projectTree}
          defaultExpandAll
          selectedKeys={[selected]}
          onSelect={(keys) => { if (keys.length) setSelected(keys[0] as string) }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <Breadcrumb
          items={[
            { title: 'Projects' },
            { title: selected === 'all' ? 'All' : selected },
          ]}
        />
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
            {projectTasks.length} tasks · {done} done
          </span>
          <Progress percent={pct} style={{ flex: 1, maxWidth: 240 }} />
        </div>
        <div style={{ marginTop: 12 }}>
          {projectTasks.slice(0, 20).map(t => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid var(--sg-color-border-secondary)' }}>
              <Tag color={priorityColors[t.priority]} style={{ fontSize: 11 }}>{t.priority}</Tag>
              <span style={{ flex: 1, fontSize: 13 }}>{t.title}</span>
              <Tag color={statusColors[t.status]}>{statusLabels[t.status]}</Tag>
              <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>{t.assignee}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
