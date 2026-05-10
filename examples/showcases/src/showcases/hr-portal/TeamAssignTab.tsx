import { useState } from 'react'
import { Transfer, Tag } from '@skygraph/react'
import { employees, transferSource } from './data'
import { useAppLocale } from '../_shared'

export function TeamAssignTab() {
  const t = useAppLocale('hrPortal').team
  const [targetKeys, setTargetKeys] = useState<string[]>(
    employees.filter((e) => e.department === 'Engineering').map((e) => e.id),
  )

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <h4 style={{ margin: 0 }}>{t.heading}</h4>
        <Tag color="processing">{t.assignedTag(targetKeys.length)}</Tag>
      </div>
      <Transfer
        dataSource={transferSource}
        targetKeys={targetKeys}
        onChange={(keys) => setTargetKeys(keys)}
        titles={[t.available, t.assigned]}
        showSearch
      />
    </div>
  )
}
