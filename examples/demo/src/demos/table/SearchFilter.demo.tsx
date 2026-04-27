import { Table } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { people } from './data'

/**
 * `filterMode: 'search'` replaces the checkbox list with a text input.
 * Useful for high-cardinality columns like Name or Email.
 */
export function SearchFilterTable() {
  const columns: TableColumn[] = [
    {
      key: 'name',
      title: 'Name',
      width: 180,
      filterMode: 'search',
      onFilter: (value, row) =>
        String(row.name).toLowerCase().includes(String(value).toLowerCase()),
    },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    {
      key: 'email',
      title: 'Email',
      width: 220,
      filterMode: 'search',
      onFilter: (value, row) =>
        String(row.email).toLowerCase().includes(String(value).toLowerCase()),
    },
    { key: 'city', title: 'City', width: 150 },
  ]

  return <Table columns={columns} data={people} pageSize={6} />
}
