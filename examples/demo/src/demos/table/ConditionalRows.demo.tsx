import { Table, Tag } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { people } from './data'
import './styles.css'

/**
 * `rowClassName` is called per row with `(data, id)` and returns a class
 * name. Use it to tag rows by state (active / VIP / failed) and style
 * them with plain CSS. No re-render logic, no magic props.
 *
 * Here the first row is marked VIP, active rows get a green tint, and
 * inactive rows are muted.
 */
export function ConditionalRowsTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'city', title: 'City', width: 130 },
    { key: 'role', title: 'Role', width: 130 },
    {
      key: 'status',
      title: 'Status',
      width: 110,
      render: (val) => (
        <Tag color={val === 'active' ? 'success' : 'default'}>
          {String(val)}
        </Tag>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      data={people}
      pageSize={6}
      rowClassName={(row, id) => {
        if (id === 'r0') return 'demo-row-vip'
        return row.status === 'active' ? 'demo-row-active' : 'demo-row-inactive'
      }}
    />
  )
}
