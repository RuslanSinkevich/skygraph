import { Table } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { people } from './data'

/**
 * Override `--sg-table-*` tokens on a local wrapper to restyle one table
 * without touching the globals. Great for themed pages or dashboard widgets.
 *
 * The full list of table tokens lives in `styles/components/table.css`.
 */
export function CustomTokensTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    {
      key: 'salary',
      title: 'Salary',
      width: 120,
      align: 'right',
      render: (v) => `$${Number(v).toLocaleString()}`,
    },
  ]

  return (
    <div
      style={{
        width: '100%',
        ['--sg-table-header-bg' as never]:
          'color-mix(in srgb, var(--sg-color-primary-bg) 55%, var(--sg-color-bg) 45%)',
        ['--sg-table-row-hover-bg' as never]: 'var(--sg-color-primary-bg)',
        ['--sg-table-border-color' as never]:
          'color-mix(in srgb, var(--sg-color-primary) 25%, var(--sg-color-border-secondary) 75%)',
        ['--sg-table-cell-padding' as never]: '10px 12px',
      }}
    >
      <Table columns={columns} data={people} pageSize={5} />
    </div>
  )
}
