import { useState } from 'react'
import { Transfer } from '@skygraph/react'
import { mockData } from './data'

/**
 * Customize the two column headers in a single tuple — use it
 * to give the lists a domain name ("Available / Selected",
 * "Inactive / Active", ...).
 */
export function TitlesTransfer() {
  const [targetKeys, setTargetKeys] = useState<string[]>(['2', '4'])
  return (
    <Transfer
      titles={['Available', 'Selected']}
      dataSource={mockData}
      targetKeys={targetKeys}
      onChange={(keys) => setTargetKeys(keys)}
    />
  )
}
