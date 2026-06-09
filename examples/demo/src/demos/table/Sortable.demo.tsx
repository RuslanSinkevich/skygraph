import { Table } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { people } from './data'

/**
 * Click a sortable header to toggle: asc → desc → unsorted. Shift-click a
 * second header to create a composite sort (name asc + age desc).
 */
export function SortableTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', sortable: true, width: 180 },
    { key: 'age', title: 'Age', sortable: true, width: 90, align: 'center' },
    { key: 'city', title: 'City', sortable: true, width: 130 },
    { key: 'role', title: 'Role', sortable: true, width: 130 },
    {
      key: 'salary',
      title: 'Salary',
      sortable: true,
      width: 120,
      align: 'right',
      render: (v) => `$${Number(v).toLocaleString()}`,
    },
  ]

  return (
    <Table
      columns={columns}
      data={people}
      pageSize={6}
      multiSort
      onSortsChange={(sorts) => console.log('[Table] sort change:', sorts)}
    />
  )
}
