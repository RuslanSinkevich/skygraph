import { useState } from 'react'
import { Table, Button } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { people } from './data'

/**
 * `loading` shows an overlay and disables interactions while true. Toggle
 * the button to see the spinner appear and disappear.
 */
export function LoadingTable() {
  const [loading, setLoading] = useState(true)

  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    { key: 'city', title: 'City', width: 150 },
    { key: 'role', title: 'Role', width: 120 },
  ]

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: 8 }}>
        <Button size="small" onClick={() => setLoading((v) => !v)}>
          {loading ? 'Stop loading' : 'Start loading'}
        </Button>
      </div>
      <Table
        columns={columns}
        data={people.slice(0, 4)}
        loading={loading}
        showPagination={false}
      />
    </div>
  )
}
