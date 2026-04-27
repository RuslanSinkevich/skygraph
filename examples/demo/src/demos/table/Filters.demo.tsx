import { Table, Badge } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { people } from './data'

/**
 * Checkbox-based multi-select filter in the column header. `filters` lists
 * the options, `onFilter` decides whether a row passes for a given value.
 */
export function FiltersTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180, sortable: true },
    { key: 'age', title: 'Age', width: 80, align: 'center', sortable: true },
    { key: 'city', title: 'City', width: 150 },
    {
      key: 'role',
      title: 'Role',
      width: 150,
      filters: [
        { text: 'Developer', value: 'Developer' },
        { text: 'Designer', value: 'Designer' },
        { text: 'Manager', value: 'Manager' },
        { text: 'QA', value: 'QA' },
      ],
      onFilter: (value, row) => row.role === value,
    },
    {
      key: 'status',
      title: 'Status',
      width: 110,
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
      ],
      onFilter: (value, row) => row.status === value,
      render: (val) => (
        <Badge
          status={val === 'active' ? 'success' : 'default'}
          text={String(val)}
        />
      ),
    },
  ]

  return <Table columns={columns} data={people} pageSize={6} />
}
