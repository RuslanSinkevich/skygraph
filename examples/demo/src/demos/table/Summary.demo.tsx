import { Table } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { people } from './data'

/**
 * `summary` returns an array of rows, each row an array of cells. Useful for
 * totals, averages or any aggregate. Cells support colSpan/align like
 * header cells.
 */
export function SummaryTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'role', title: 'Role', width: 150 },
    { key: 'salary', title: 'Salary', width: 120, align: 'right' },
  ]

  return (
    <Table
      columns={columns}
      data={people}
      showPagination={false}
      summary={(rows) => {
        const total = rows.reduce(
          (sum, r) => sum + (Number(r.data.salary) || 0),
          0,
        )
        const avg = rows.length ? Math.round(total / rows.length) : 0
        return [
          [
            { content: `Total: ${rows.length} people`, colSpan: 2 },
            { content: `$${total.toLocaleString()}`, align: 'right' as const },
          ],
          [
            { content: 'Average', colSpan: 2 },
            { content: `$${avg.toLocaleString()}`, align: 'right' as const },
          ],
        ]
      }}
    />
  )
}
