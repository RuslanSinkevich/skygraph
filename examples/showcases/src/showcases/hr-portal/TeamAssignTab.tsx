import { useState } from 'react'
import { Transfer, Tag } from '@skygraph/react'
import { employees, transferSource } from './data'

export function TeamAssignTab() {
  const [targetKeys, setTargetKeys] = useState<string[]>(
    employees.filter(e => e.department === 'Engineering').map(e => e.id),
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h4 style={{ margin: 0 }}>Assign employees to Project Alpha</h4>
        <Tag color="processing">{targetKeys.length} assigned</Tag>
      </div>
      <Transfer
        dataSource={transferSource}
        targetKeys={targetKeys}
        onChange={(keys) => setTargetKeys(keys)}
        titles={['Available', 'Assigned']}
        showSearch
      />
    </div>
  )
}
