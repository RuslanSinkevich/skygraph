import { useState } from 'react'
import { Table } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { people } from './data'

/**
 * Double-click a cell marked `editable` to start editing. Enter commits,
 * Escape cancels. `onCellEdit` is called with (rowId, columnKey, newValue).
 */
export function EditableTable() {
  const [data, setData] = useState(
    people.slice(0, 5).map((r) => ({ ...r, data: { ...r.data } })),
  )

  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180, editable: true },
    { key: 'age', title: 'Age', width: 80, align: 'center', editable: true },
    { key: 'city', title: 'City', width: 150, editable: true },
    { key: 'role', title: 'Role', width: 150 },
  ]

  return (
    <Table
      columns={columns}
      data={data}
      showPagination={false}
      onCellEdit={(id, col, val) => {
        setData((prev) =>
          prev.map((r) =>
            r.id === id ? { ...r, data: { ...r.data, [col]: val } } : r,
          ),
        )
      }}
    />
  )
}
