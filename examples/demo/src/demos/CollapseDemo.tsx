import { Collapse } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const collapseProps: PropDef[] = [
  { name: 'items', description: 'Collapse panel items', type: 'CollapseItem[]' },
  { name: 'activeKey', description: 'Keys of active panels (controlled)', type: 'string | string[]' },
  { name: 'defaultActiveKey', description: 'Keys of initially active panels', type: 'string | string[]' },
  { name: 'onChange', description: 'Callback when panels change', type: '(activeKey: string[]) => void' },
  { name: 'accordion', description: 'Accordion mode — only one panel open at a time', type: 'boolean', default: 'false' },
  { name: 'bordered', description: 'Show border', type: 'boolean', default: 'true' },
  { name: 'expandIconPosition', description: 'Position of the expand icon', type: "'start' | 'end'", default: "'start'" },
  { name: 'ghost', description: 'Make background transparent', type: 'boolean', default: 'false' },
]

const items = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness.',
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: 'A cat is a small domesticated mammal valued for companionship.',
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: 'A bird is an animal with wings that can usually fly.',
  },
]

export function CollapseDemo() {
  return (
    <ComponentDoc
      title="Collapse"
      description="A content area which can be collapsed and expanded."
      whenToUse={[
        'When you need to organize information into collapsible sections.',
        'Use accordion mode when only one section should be open at a time.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Multiple panels can be opened at the same time."
        code={`import { Collapse } from '@skygraph/react'

const items = [
  { key: '1', label: 'Header 1', children: 'Content 1' },
  { key: '2', label: 'Header 2', children: 'Content 2' },
  { key: '3', label: 'Header 3', children: 'Content 3' },
]

<Collapse items={items} defaultActiveKey={['1']} />`}
      >
        <Collapse items={items} defaultActiveKey={['1']} />
      </DemoBox>

      <DemoBox
        title="Accordion"
        description="Only one panel can be open at a time."
        code={`<Collapse items={items} accordion defaultActiveKey="1" />`}
      >
        <Collapse items={items} accordion defaultActiveKey="1" />
      </DemoBox>

      <DemoBox
        title="Borderless"
        description="A borderless style."
        code={`<Collapse items={items} bordered={false} />`}
      >
        <Collapse items={items} bordered={false} defaultActiveKey={['1']} />
      </DemoBox>

      <DemoBox
        title="Ghost"
        description="Transparent background."
        code={`<Collapse items={items} ghost />`}
      >
        <Collapse items={items} ghost defaultActiveKey={['2']} />
      </DemoBox>

      <PropsTable data={collapseProps} />
    </ComponentDoc>
  )
}
