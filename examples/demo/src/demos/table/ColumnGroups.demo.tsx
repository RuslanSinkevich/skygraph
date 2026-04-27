import { Table } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { people } from './data'

/**
 * Multi-level header with grouped columns. Any column can have `children`;
 * the group cell is rendered as a spanning header above its children.
 */
export function ColumnGroupsTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 160 },
    {
      key: 'contact-group',
      title: 'Contact Info',
      children: [
        { key: 'email', title: 'Email', width: 200 },
        { key: 'city', title: 'City', width: 120 },
      ],
    },
    {
      key: 'work-group',
      title: 'Work',
      children: [
        { key: 'role', title: 'Role', width: 120 },
        {
          key: 'salary',
          title: 'Salary',
          width: 110,
          align: 'right',
          render: (v) => `$${Number(v).toLocaleString()}`,
        },
      ],
    },
  ]

  return <Table columns={columns} data={people} pageSize={6} bordered />
}
