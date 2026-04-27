import { Table, Button } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { people } from './data'

/**
 * Fix critical columns to the left (Name) and actions to the right (Action).
 * The middle scrolls horizontally if `scroll.x` exceeds the container.
 */
export function FixedColumnsTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 150, fixed: 'left' },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    { key: 'email', title: 'Email', width: 220 },
    { key: 'city', title: 'City', width: 150 },
    { key: 'role', title: 'Role', width: 150 },
    { key: 'salary', title: 'Salary', width: 120, align: 'right' },
    {
      key: 'action',
      title: 'Action',
      width: 100,
      fixed: 'right',
      render: () => (
        <Button size="small" type="text">
          Edit
        </Button>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      data={people}
      pageSize={6}
      scroll={{ x: 1000 }}
      showPagination={false}
    />
  )
}
