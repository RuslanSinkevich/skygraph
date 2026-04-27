import { useState } from 'react'
import { Transfer } from '@skygraph/react'
import { mockData } from './data'

/**
 * `showSearch` adds a filter input above each list. It matches
 * on `title` (case-insensitive) — override `render` if you
 * want more columns visible while searching.
 */
export function SearchTransfer() {
  const [targetKeys, setTargetKeys] = useState<string[]>([])
  return (
    <Transfer
      showSearch
      dataSource={mockData}
      targetKeys={targetKeys}
      onChange={(keys) => setTargetKeys(keys)}
    />
  )
}
