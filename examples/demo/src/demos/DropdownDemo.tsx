import { Dropdown, Button } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const dropdownProps: PropDef[] = [
  { name: 'items', description: 'Menu items', type: 'DropdownItem[]' },
  { name: 'onSelect', description: 'Callback when item is selected', type: '(key: string) => void' },
  { name: 'trigger', description: 'Trigger mode', type: "'click' | 'hover'", default: "'hover'" },
  { name: 'placement', description: 'Placement of popup', type: "'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'", default: "'bottomLeft'" },
  { name: 'disabled', description: 'Whether the dropdown is disabled', type: 'boolean', default: 'false' },
  { name: 'children', description: 'Element that triggers the dropdown', type: 'ReactElement' },
]

const itemProps: PropDef[] = [
  { name: 'key', description: 'Unique key of the item', type: 'string' },
  { name: 'label', description: 'Display label', type: 'ReactNode' },
  { name: 'disabled', description: 'Whether the item is disabled', type: 'boolean' },
  { name: 'danger', description: 'Display as danger item', type: 'boolean' },
  { name: 'divider', description: 'Display as divider line', type: 'boolean' },
]

const items = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item (disabled)', disabled: true },
  { key: 'd', label: '', divider: true },
  { key: '4', label: 'Danger item', danger: true },
]

export function DropdownDemo() {
  return (
    <ComponentDoc
      title="Dropdown"
      description="A dropdown list."
      whenToUse={[
        'When there are more than a few options to choose from, you can wrap them in a Dropdown.',
        'By hovering or clicking on the trigger, a dropdown menu should appear.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="The most basic dropdown menu."
        code={`import { Dropdown, Button } from '@skygraph/react'

const items = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
]

<Dropdown items={items} onSelect={(key) => console.log(key)}>
  <Button>Hover me</Button>
</Dropdown>`}
      >
        <Dropdown items={items} onSelect={(key) => alert(`Selected: ${key}`)}>
          <Button>Hover me</Button>
        </Dropdown>
      </DemoBox>

      <DemoBox
        title="Click Trigger"
        description="Trigger by clicking."
        code={`<Dropdown items={items} trigger="click">
  <Button>Click me</Button>
</Dropdown>`}
      >
        <Dropdown items={items} trigger="click" onSelect={(key) => alert(`Selected: ${key}`)}>
          <Button>Click me</Button>
        </Dropdown>
      </DemoBox>

      <DemoBox
        title="Placement"
        description="Different placements."
        code={`<Dropdown items={items} placement="bottomRight">
  <Button>Bottom Right</Button>
</Dropdown>`}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <Dropdown items={items} placement="bottomLeft"><Button>bottomLeft</Button></Dropdown>
          <Dropdown items={items} placement="bottomRight"><Button>bottomRight</Button></Dropdown>
        </div>
      </DemoBox>

      <PropsTable data={dropdownProps} />
      <PropsTable title="DropdownItem" data={itemProps} />
    </ComponentDoc>
  )
}
