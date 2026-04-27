import { Table } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { people } from './data'

/**
 * Set `searchable` to render a debounced search box in the toolbar. It does
 * substring match across every visible column (stringified).
 */
export function GlobalSearchTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'email', title: 'Email', width: 220 },
    { key: 'city', title: 'City', width: 150 },
    { key: 'role', title: 'Role', width: 150 },
  ]

  return <Table columns={columns} data={people} pageSize={6} searchable />
}
