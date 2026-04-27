import { useState } from 'react'
import { Transfer } from '@skygraph/react'
import { rolePermissions } from './data'

/**
 * `render` lets you swap the default title for a richer label —
 * here: primary title + grey description. The rendered node
 * still sits inside the per-row Checkbox.
 */
export function CustomRenderTransfer() {
  const [targetKeys, setTargetKeys] = useState<string[]>(['users.read'])
  return (
    <Transfer
      showSearch
      titles={['Available', 'Granted']}
      dataSource={rolePermissions}
      targetKeys={targetKeys}
      onChange={(keys) => setTargetKeys(keys)}
      render={(item) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <strong>{item.title}</strong>
          {item.description && (
            <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
              {item.description}
            </span>
          )}
        </div>
      )}
      listStyle={{ width: 280, height: 260 }}
    />
  )
}
