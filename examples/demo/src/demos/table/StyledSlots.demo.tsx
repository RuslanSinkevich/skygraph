import { Table, Badge } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { people } from './data'
import './styles.css'

/**
 * Each stable slot (`root`, `toolbar`, `headerCell`, `bodyCell`, `row`, …)
 * accepts a className and a style object. No deep selectors required —
 * these hooks are part of the public API.
 *
 * Column-level `headerClassName` styles only the matching header cell.
 */
export function StyledSlotsTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180, headerClassName: 'demo-th-name' },
    { key: 'city', title: 'City', width: 120 },
    { key: 'role', title: 'Role', width: 120 },
    {
      key: 'salary',
      title: 'Salary',
      width: 110,
      align: 'right',
      render: (v) => `$${Number(v).toLocaleString()}`,
    },
    {
      key: 'status',
      title: 'Status',
      width: 120,
      headerClassName: 'demo-th-status',
      render: (val) => (
        <Badge status={val === 'active' ? 'success' : 'default'} text={String(val)} />
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      data={people}
      pageSize={6}
      searchable
      classNames={{
        root: 'demo-table-root',
        toolbar: 'demo-table-toolbar',
        headerCell: 'demo-table-th',
        bodyCell: 'demo-table-td',
        row: 'demo-table-row',
      }}
      styles={{
        headerCell: { fontSize: 13, letterSpacing: '0.04em' },
        bodyCell: { fontFamily: 'SFMono-Regular, Consolas, Menlo, monospace' },
      }}
    />
  )
}
