import { Table } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { people } from './data'

/**
 * Drag the right edge of a header to resize it. Useful when column content
 * varies (long emails, cities). Width survives re-render via internal state.
 */
export function ResizableTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180, resizable: true },
    { key: 'email', title: 'Email', width: 220, resizable: true },
    { key: 'city', title: 'City', width: 130, resizable: true },
    { key: 'role', title: 'Role', width: 130, resizable: true },
    { key: 'salary', title: 'Salary', width: 110, align: 'right', resizable: true },
  ]

  return <Table columns={columns} data={people} pageSize={6} bordered />
}
