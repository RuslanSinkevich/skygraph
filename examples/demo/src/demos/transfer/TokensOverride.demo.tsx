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
  return (
    <TokenScopeCards
      minCardWidth={620}
      contentMinWidth={560}
      contentAlign="center"
      extra={{
        brand: { ['--sg-color-bg-secondary' as never]: '#ecfdf5' },
        dark: { ['--sg-color-primary-bg' as never]: 'rgba(96, 165, 250, 0.28)' },
        glass: {
          ['--sg-color-bg-secondary' as never]: 'rgba(255, 255, 255, 0.7)',
          ['--sg-color-border-secondary' as never]: 'rgba(79, 70, 229, 0.18)',
        },
      }}
      render={() => <TransferCard />}
    />
  )
}
