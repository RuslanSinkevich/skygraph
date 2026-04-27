import { Table, Tag, Progress } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { projects } from './data'

/**
 * `column.render` can return any ReactNode — drop in our `Progress`, `Tag`,
 * or any other component. Cell tone reacts to the value itself (red when
 * over-budget, amber when approaching it) without touching the Table.
 */
export function ProgressCellsTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Project', width: 200 },
    { key: 'owner', title: 'Owner', width: 110 },
    {
      key: 'progress',
      title: 'Progress',
      width: 220,
      render: (v) => {
        const n = Number(v)
        const status = n >= 100 ? 'success' : n < 50 ? 'active' : 'normal'
        return <Progress percent={n} status={status} size="small" />
      },
    },
    {
      key: 'budgetUsed',
      title: 'Budget used',
      width: 140,
      align: 'right',
      render: (v) => {
        const n = Number(v)
        const color =
          n >= 90 ? 'var(--sg-color-error)'
          : n >= 70 ? 'var(--sg-color-warning)'
          : 'var(--sg-color-success)'
        return <span style={{ color, fontWeight: 600 }}>{n}%</span>
      },
    },
    {
      key: 'deadline',
      title: 'Deadline',
      width: 130,
      render: (v) => {
        const d = new Date(String(v))
        const daysLeft = Math.round((d.getTime() - Date.now()) / 86_400_000)
        const tone = daysLeft < 14 ? 'error' : daysLeft < 45 ? 'warning' : 'default'
        return <Tag color={tone}>{String(v)}</Tag>
      },
    },
  ]

  return <Table columns={columns} data={projects} showPagination={false} />
}
