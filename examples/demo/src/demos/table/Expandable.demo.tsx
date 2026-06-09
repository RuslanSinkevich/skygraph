import { Table } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { people } from './data'

/**
 * Each row can be expanded to reveal arbitrary details. `expandedRowRender`
 * receives the row data and returns any ReactNode.
 */
export function ExpandableTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    { key: 'city', title: 'City', width: 120 },
    { key: 'role', title: 'Role', width: 120 },
  ]

  return (
    <Table
      columns={columns}
      data={people}
      pageSize={6}
      expandable={{
        onExpand: (expanded, id) => console.log('[Table] expand:', id, expanded),
        expandedRowRender: (row) => (
          <div style={{ padding: '4px 0' }}>
            <strong>{String(row.name)}</strong> works as {String(row.role)} in {String(row.city)}.
            Email: {String(row.email ?? 'N/A')}. Salary: ${String(row.salary ?? 'N/A')}.
          </div>
        ),
      }}
    />
  )
}
