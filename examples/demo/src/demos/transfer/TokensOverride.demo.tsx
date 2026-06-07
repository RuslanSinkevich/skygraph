import { useState } from 'react'
import { Transfer } from '@skygraph/react'
import { mockData } from './data'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Transfer has no component-local tokens — borders, headers, hover and
 * selection read the global palette. Three scoped recipes — branded green,
 * dark field, glass pick — reskin both columns.
 */
function TransferCard() {
  const [targetKeys, setTargetKeys] = useState<string[]>(['1', '3'])
  return (
    <Transfer
      dataSource={mockData}
      targetKeys={targetKeys}
      onChange={(keys) => setTargetKeys(keys)}
    />
  )
}

export function TokensOverrideTransfer() {
  return <TokenScopeCards render={() => <TransferCard />} />
}
