import { useState } from 'react'
import { Table, Button } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { people } from './data'

/**
 * Controlled row selection. `selectedKeys` and `onChange` drive the state;
 * a header checkbox toggles all visible rows.
 */
export function SelectionTable() {
  const [selected, setSelected] = useState<string[]>([])

  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    { key: 'email', title: 'Email', width: 220 },
    { key: 'role', title: 'Role', width: 120 },
  ]

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          marginBottom: 8,
          fontSize: 13,
          color: 'var(--sg-color-text-secondary)',
        }}
      >
        Selected: {selected.length}
        {selected.length > 0 && (
          <Button
            size="small"
            type="text"
            onClick={() => setSelected([])}
            style={{ marginLeft: 8 }}
          >
            Clear
          </Button>
        )}
      </div>
      <Table
        columns={columns}
        data={people}
        pageSize={6}
        rowSelection={{
          selectedKeys: selected,
          onChange: (keys, rows) => {
            console.log('[Table] selection', keys, rows)
            setSelected(keys as string[])
          },
        }}
      />
    </div>
  )
}
