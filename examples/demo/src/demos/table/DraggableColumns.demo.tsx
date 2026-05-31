import { useState } from 'react'
import { Table, Tag } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { people } from './data'

/**
 * `draggable` enables column reordering via drag-and-drop on the header.
 * The component manages internal order; subscribe to `onColumnOrderChange`
 * to persist it (URL, localStorage, server) and reflect the new order in
 * other UI (column chooser, exports).
 */
export function DraggableColumnsTable() {
  const [order, setOrder] = useState<string[]>(['name', 'age', 'city', 'role', 'status'])

  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', sortable: true, width: 180 },
    { key: 'age', title: 'Age', sortable: true, width: 90, align: 'center' },
    { key: 'city', title: 'City', sortable: true, width: 140 },
    { key: 'role', title: 'Role', width: 140 },
    {
      key: 'status',
      title: 'Status',
      width: 120,
      render: (val) => <Tag color={val === 'active' ? 'success' : 'default'}>{String(val)}</Tag>,
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      <div
        style={{
          padding: '8px 12px',
          borderRadius: 'var(--sg-border-radius, 6px)',
          background: 'var(--sg-color-bg-secondary)',
          border: '1px solid var(--sg-color-border-secondary)',
          fontSize: 12,
          fontFamily: 'var(--sg-font-mono, monospace)',
          color: 'var(--sg-color-text-secondary)',
        }}
      >
        order: [{order.join(', ')}]
      </div>
      <Table
        columns={columns}
        data={people}
        pageSize={6}
        draggable
        bordered
        onColumnOrderChange={setOrder}
      />
    </div>
  )
}
