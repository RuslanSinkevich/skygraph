import { Table, Tag } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { people } from './data'

/**
 * Simplest possible table. Columns with no `width` share remaining space
 * evenly; `age` gets a fixed narrow width because numbers don't need room
 * to breathe.
 */
export function BasicTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'age', title: 'Age', sortable: true, width: 80, align: 'center' },
    { key: 'city', title: 'City', sortable: true },
    {
      key: 'status',
      title: 'Status',
      render: (val) => (
        <Tag color={val === 'active' ? 'success' : 'default'}>{String(val)}</Tag>
      ),
    },
  ]

  return <Table columns={columns} data={people} pageSize={5} />
}
