import { useState } from 'react'
import { Popconfirm, Button } from '@skygraph/react'

/**
 * Canonical pattern: row-level "Delete" buttons wrapped in Popconfirm
 * so the user doesn't wipe data by accident. Use `placement="left"`
 * so the bubble opens into the table body instead of clipping.
 */
type Row = { id: number; name: string }

export function InTablePopconfirm() {
  const [rows, setRows] = useState<Row[]>([
    { id: 1, name: 'Launch checklist' },
    { id: 2, name: 'Design review' },
    { id: 3, name: 'Q4 postmortem' },
  ])

  return (
    <table style={{ borderCollapse: 'collapse', fontSize: 14 }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '6px 12px' }}>Task</th>
          <th style={{ padding: '6px 12px' }}></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} style={{ borderTop: '1px solid var(--sg-color-border)' }}>
            <td style={{ padding: '6px 12px' }}>{row.name}</td>
            <td style={{ padding: '6px 12px' }}>
              <Popconfirm
                title={`Delete "${row.name}"?`}
                description="This cannot be undone."
                okText="Delete"
                placement="left"
                onConfirm={() => setRows((r) => r.filter((x) => x.id !== row.id))}
              >
                <Button size="small">Delete</Button>
              </Popconfirm>
            </td>
          </tr>
        ))}
        {rows.length === 0 && (
          <tr>
            <td colSpan={2} style={{ padding: '12px', color: 'var(--sg-color-text-secondary)' }}>
              All tasks deleted.{' '}
              <Button size="small" onClick={() => setRows([
                { id: 1, name: 'Launch checklist' },
                { id: 2, name: 'Design review' },
                { id: 3, name: 'Q4 postmortem' },
              ])}>Reset</Button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
