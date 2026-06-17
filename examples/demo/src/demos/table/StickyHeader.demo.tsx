import { Table, Tag } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { people } from './data'

/**
 * `sticky` pins the header row while the body scrolls inside the `scroll.y`
 * viewport. Pagination is off so every row lives in one scroll area.
 */
export function StickyHeaderTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'age', title: 'Age', width: 80, align: 'center', sortable: true },
    { key: 'email', title: 'Email' },
    { key: 'city', title: 'City', sortable: true },
    { key: 'role', title: 'Role' },
    {
      key: 'status',
      title: 'Status',
      render: (val) => <Tag color={val === 'active' ? 'success' : 'default'}>{String(val)}</Tag>,
    },
  ]

  return (
    <Table
      columns={columns}
      data={people}
      sticky
      scroll={{ y: 360 }}
      pageSize={people.length}
      showPagination={false}
      bordered
    />
  )
}
