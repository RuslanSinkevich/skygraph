import { Table } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'

/**
 * When `data` is empty, the default empty-state is shown. Override the
 * copy via `locale.emptyText`. Pass a ReactNode for fully custom content.
 */
export function EmptyStateTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'age', title: 'Age', width: 80 },
    { key: 'city', title: 'City', width: 150 },
  ]

  return (
    <Table
      columns={columns}
      data={[]}
      showPagination={false}
      locale={{ emptyText: '🔍 No results found. Try adjusting your filters.' }}
    />
  )
}
