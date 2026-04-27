import { useState } from 'react'
import { Transfer } from '@skygraph/react'
import { mockData } from './data'

/**
 * `oneWay` hides the "move left" button — good for permission
 * grants where items can only ever be added to the target
 * side.
 */
export function OneWayTransfer() {
  const [targetKeys, setTargetKeys] = useState<string[]>([])
  return (
    <Transfer
      oneWay
      dataSource={mockData}
      targetKeys={targetKeys}
      onChange={(keys) => setTargetKeys(keys)}
    />
  )
}
