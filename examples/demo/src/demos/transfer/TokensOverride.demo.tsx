import { useState, type CSSProperties } from 'react'
import { Transfer } from '@skygraph/react'
import { mockData } from './data'

/**
 * Transfer has no component-local tokens. Rebrand via the
 * global palette: border / header / hover / selected rely on
 * `--sg-color-border`, `--sg-color-bg-secondary`,
 * `--sg-color-bg-hover`, `--sg-color-primary-bg`.
 */
const scope: CSSProperties = {
  ['--sg-color-border' as never]: '#cbd5e1',
  ['--sg-color-border-secondary' as never]: '#e2e8f0',
  ['--sg-color-bg-secondary' as never]: '#f1f5f9',
  ['--sg-color-bg-hover' as never]: '#e0f2fe',
  ['--sg-color-primary-bg' as never]: '#bae6fd',
  ['--sg-border-radius' as never]: '10px',
}

export function TokensOverrideTransfer() {
  const [targetKeys, setTargetKeys] = useState<string[]>(['1', '3'])
  return (
    <div style={scope}>
      <Transfer
        dataSource={mockData}
        targetKeys={targetKeys}
        onChange={(keys) => setTargetKeys(keys)}
        showSearch
      />
    </div>
  )
}
