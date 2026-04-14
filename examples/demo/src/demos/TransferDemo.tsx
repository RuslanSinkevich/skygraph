import { Transfer } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'
import { useState } from 'react'

const transferProps: PropDef[] = [
  { name: 'dataSource', description: 'Data source items', type: 'TransferItem[]' },
  { name: 'targetKeys', description: 'Keys of items in the right list', type: 'string[]' },
  { name: 'onChange', description: 'Callback when transfer occurs', type: '(targetKeys, direction, moveKeys) => void' },
  { name: 'showSearch', description: 'Show search input', type: 'boolean', default: 'false' },
  { name: 'titles', description: 'Titles for left and right list', type: '[string, string]', default: "['Source', 'Target']" },
  { name: 'disabled', description: 'Disable the transfer', type: 'boolean', default: 'false' },
  { name: 'oneWay', description: 'One-way transfer (can only move to right)', type: 'boolean', default: 'false' },
]

const mockData = Array.from({ length: 10 }, (_, i) => ({
  key: `${i}`,
  title: `Content ${i + 1}`,
  description: `Description of content ${i + 1}`,
}))

export function TransferDemo() {
  const [targetKeys, setTargetKeys] = useState<string[]>(['1', '3', '5'])

  return (
    <ComponentDoc
      title="Transfer"
      description="Double column transfer choice box."
      whenToUse={[
        'When you need to transfer items between two lists.',
        'Useful for permission assignment or tag selection.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="The most basic transfer usage."
        code={`import { Transfer } from '@skygraph/react'

const mockData = Array.from({ length: 10 }, (_, i) => ({
  key: String(i),
  title: \`Content \${i + 1}\`,
}))

const [targetKeys, setTargetKeys] = useState(['1', '3'])

<Transfer
  dataSource={mockData}
  targetKeys={targetKeys}
  onChange={(keys) => setTargetKeys(keys)}
/>`}
      >
        <Transfer
          dataSource={mockData}
          targetKeys={targetKeys}
          onChange={(keys) => setTargetKeys(keys)}
        />
      </DemoBox>

      <DemoBox
        title="With Search"
        description="Transfer with search ability."
        code={`<Transfer
  dataSource={mockData}
  targetKeys={targetKeys}
  onChange={(keys) => setTargetKeys(keys)}
  showSearch
/>`}
      >
        <Transfer
          dataSource={mockData}
          targetKeys={targetKeys}
          onChange={(keys) => setTargetKeys(keys)}
          showSearch
        />
      </DemoBox>

      <DemoBox
        title="One Way"
        description="One-way transfer, items can only be transferred to the right."
        code={`<Transfer
  dataSource={mockData}
  targetKeys={targetKeys}
  onChange={(keys) => setTargetKeys(keys)}
  oneWay
/>`}
      >
        <Transfer
          dataSource={mockData}
          targetKeys={targetKeys}
          onChange={(keys) => setTargetKeys(keys)}
          oneWay
        />
      </DemoBox>

      <PropsTable data={transferProps} />
    </ComponentDoc>
  )
}
