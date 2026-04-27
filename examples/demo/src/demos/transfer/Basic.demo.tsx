import { useState } from 'react'
import { Transfer } from '@skygraph/react'
import { mockData } from './data'

/**
 * Controlled via `targetKeys` — the list is split between source
 * (left) and target (right) based on which keys are currently
 * present in the target.
 */
export function BasicTransfer() {
  const [targetKeys, setTargetKeys] = useState<string[]>(['1', '3', '5'])
  return (
    <Transfer
      dataSource={mockData}
      targetKeys={targetKeys}
      onChange={(keys) => setTargetKeys(keys)}
    />
  )
}
