import { Tabs } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const tabsProps: PropDef[] = [
  { name: 'items', description: 'Tab items configuration', type: 'Array<{ key, label, children, disabled?, loading? }>' },
  { name: 'activeKey', description: 'Currently active tab key', type: 'string' },
  { name: 'defaultActiveKey', description: 'Default active tab key', type: 'string' },
  { name: 'onChange', description: 'Callback when tab changes', type: '(key: string) => void' },
  { name: 'type', description: 'Tab style type', type: "'line' | 'card'", default: "'line'" },
  { name: 'size', description: 'Tab size', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'centered', description: 'Center tabs', type: 'boolean', default: 'false' },
  { name: 'className', description: 'Additional CSS class', type: 'string' },
  { name: 'unstyled', description: 'Remove all built-in styles', type: 'boolean', default: 'false' },
]

export function TabsDemo() {
  return (
    <ComponentDoc
      title="Tabs"
      description="Tabs make it easy to switch between different views."
      whenToUse={[
        'Card-type tabs for switching between views inside a card.',
        'Standard line tabs for flat navigation between content areas.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Default tabs with three panels."
        code={`import { Tabs } from '@skygraph/react'

<Tabs items={[
  { key: '1', label: 'Tab 1', children: <p>Content of Tab 1</p> },
  { key: '2', label: 'Tab 2', children: <p>Content of Tab 2</p> },
  { key: '3', label: 'Tab 3', children: <p>Content of Tab 3</p> },
]} />`}
      >
        <div style={{ width: '100%' }}>
          <Tabs
            items={[
              { key: '1', label: 'Tab 1', children: <p>Content of Tab 1</p> },
              { key: '2', label: 'Tab 2', children: <p>Content of Tab 2</p> },
              { key: '3', label: 'Tab 3', children: <p>Content of Tab 3</p> },
            ]}
          />
        </div>
      </DemoBox>

      <DemoBox
        title="Disabled & Loading"
        description="Tabs with a disabled and a loading tab."
        code={`<Tabs items={[
  { key: '1', label: 'Tab 1', children: <p>Content</p> },
  { key: '2', label: 'Loading', children: <p>...</p>, loading: true },
  { key: '3', label: 'Disabled', children: <p>Nope</p>, disabled: true },
]} />`}
      >
        <div style={{ width: '100%' }}>
          <Tabs
            items={[
              { key: '1', label: 'Tab 1', children: <p>Content of Tab 1</p> },
              { key: '2', label: 'Loading', children: <p>Loading content...</p>, loading: true },
              { key: '3', label: 'Disabled', children: <p>Nope</p>, disabled: true },
            ]}
          />
        </div>
      </DemoBox>

      <PropsTable data={tabsProps} />
    </ComponentDoc>
  )
}
