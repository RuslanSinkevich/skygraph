import { Menu } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const menuProps: PropDef[] = [
  { name: 'items', description: 'Menu item configuration', type: 'MenuItem[]' },
  { name: 'mode', description: 'Type of menu', type: "'vertical' | 'horizontal' | 'inline'", default: "'vertical'" },
  { name: 'selectedKeys', description: 'Currently selected keys', type: 'string[]' },
  { name: 'defaultSelectedKeys', description: 'Initially selected keys', type: 'string[]' },
  { name: 'openKeys', description: 'Currently opened sub-menu keys', type: 'string[]' },
  { name: 'defaultOpenKeys', description: 'Initially opened sub-menu keys', type: 'string[]' },
  { name: 'onSelect', description: 'Callback when a menu item is selected', type: '(info: { key, selectedKeys }) => void' },
  { name: 'onOpenChange', description: 'Callback when sub-menu open state changes', type: '(openKeys: string[]) => void' },
  { name: 'theme', description: 'Color theme of the menu', type: "'light' | 'dark'", default: "'light'" },
  { name: 'inlineCollapsed', description: 'Collapse inline menu', type: 'boolean', default: 'false' },
]

const verticalItems = [
  { key: '1', label: 'Navigation One' },
  { key: '2', label: 'Navigation Two' },
  {
    key: 'sub1',
    label: 'Navigation Three',
    children: [
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Four',
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
    ],
  },
]

const horizontalItems = [
  { key: 'mail', label: 'Mail' },
  { key: 'app', label: 'App Center' },
  {
    key: 'sub',
    label: 'Settings',
    children: [
      { key: 's1', label: 'General' },
      { key: 's2', label: 'Advanced' },
    ],
  },
]

export function MenuDemo() {
  return (
    <ComponentDoc
      title="Menu"
      description="A versatile menu for navigation."
      whenToUse={[
        'Navigation menus, whether top navigation or sidebar navigation.',
        'When you need a multi-level navigation menu.',
      ]}
    >
      <DemoBox
        title="Horizontal"
        description="Horizontal top navigation menu."
        code={`import { Menu } from '@skygraph/react'

const items = [
  { key: 'mail', label: 'Mail' },
  { key: 'app', label: 'App Center' },
]

<Menu mode="horizontal" items={items} defaultSelectedKeys={['mail']} />`}
      >
        <Menu mode="horizontal" items={horizontalItems} defaultSelectedKeys={['mail']} />
      </DemoBox>

      <DemoBox
        title="Vertical"
        description="Vertical sidebar menu with sub-menus."
        code={`const items = [
  { key: '1', label: 'Navigation One' },
  { key: 'sub1', label: 'Navigation Three', children: [
    { key: '3', label: 'Option 3' },
    { key: '4', label: 'Option 4' },
  ]},
]

<Menu items={items} defaultOpenKeys={['sub1']} defaultSelectedKeys={['3']} />`}
      >
        <div style={{ maxWidth: 256 }}>
          <Menu
            items={verticalItems}
            defaultOpenKeys={['sub1']}
            defaultSelectedKeys={['3']}
          />
        </div>
      </DemoBox>

      <DemoBox
        title="Inline"
        description="Inline mode, sub-menu opens inside the menu."
        code={`<Menu mode="inline" items={items} defaultOpenKeys={['sub1']} />`}
      >
        <div style={{ maxWidth: 256 }}>
          <Menu
            mode="inline"
            items={verticalItems}
            defaultOpenKeys={['sub1']}
            defaultSelectedKeys={['1']}
          />
        </div>
      </DemoBox>

      <PropsTable data={menuProps} />
    </ComponentDoc>
  )
}
