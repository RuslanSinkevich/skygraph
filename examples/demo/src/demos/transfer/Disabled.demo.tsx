import { useState } from 'react'
import { Transfer } from '@skygraph/react'
import { rolePermissions } from './data'

/**
 * Whole-control `disabled` (also inherits from
 * `ConfigProvider`) vs per-item `disabled` on the data object.
 * Disabled items stay visible but can't be selected or moved.
 */
export function DisabledTransfer() {
  const [targetKeys, setTargetKeys] = useState<string[]>(['users.read', 'billing.write'])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Transfer
        dataSource={rolePermissions}
        targetKeys={targetKeys}
        onChange={(keys) => setTargetKeys(keys)}
      />
      <Transfer
        disabled
        dataSource={rolePermissions}
        targetKeys={targetKeys}
        onChange={(keys) => setTargetKeys(keys)}
      />
    </div>
  )
}
