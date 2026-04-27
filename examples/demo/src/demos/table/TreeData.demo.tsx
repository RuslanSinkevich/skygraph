import { Table } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { treeData } from './data'

/**
 * Pass `tree` to enable hierarchical rendering from nested `data.children`.
 * Expand arrows appear in the first column automatically.
 */
export function TreeDataTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Organization Unit', width: 280 },
    { key: 'head', title: 'Head', width: 220 },
    { key: 'employees', title: 'People', width: 90, align: 'center' },
    {
      key: 'budget',
      title: 'Budget',
      width: 140,
      align: 'right',
      render: (v) => `$${Number(v).toLocaleString()}`,
    },
  ]

  return (
    <Table
      columns={columns}
      data={treeData}
      tree={{ defaultExpandAllRows: true, indentSize: 22 }}
      showPagination={false}
    />
  )
}
