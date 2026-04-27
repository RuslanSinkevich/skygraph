import { useState } from 'react'
import { Popconfirm, Button } from '@skygraph/react'

/**
 * Click-triggered confirm bubble. `onConfirm` fires when the user
 * hits the primary button; `onCancel` fires on the secondary button
 * (outside-click just dismisses silently).
 */
export function BasicPopconfirm() {
  const [status, setStatus] = useState<string | null>(null)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Popconfirm
        title="Are you sure you want to delete this?"
        onConfirm={() => setStatus('Deleted ✓')}
        onCancel={() => setStatus('Cancelled')}
      >
        <Button
          type="primary"
          style={{
            background: 'var(--sg-color-error)',
            borderColor: 'var(--sg-color-error)',
          }}
        >
          Delete
        </Button>
      </Popconfirm>
      {status && <span style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>{status}</span>}
    </div>
  )
}
