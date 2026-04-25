import { useState } from 'react'
import { Checkbox } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const checkboxProps: PropDef[] = [
  { name: 'checked', description: 'Whether checkbox is checked', type: 'boolean' },
  { name: 'defaultChecked', description: 'Initial checked state', type: 'boolean', default: 'false' },
  { name: 'onChange', description: 'Callback when state changes', type: '(checked: boolean) => void' },
  { name: 'disabled', description: 'Disable the checkbox', type: 'boolean', default: 'false' },
  { name: 'indeterminate', description: 'Indeterminate visual state', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Show loading state', type: 'boolean', default: 'false' },
  { name: 'children', description: 'Label content', type: 'ReactNode' },
  { name: 'unstyled', description: 'Remove all built-in styles', type: 'boolean', default: 'false' },
]

export function CheckboxDemo() {
  const [checked, setChecked] = useState(false)

  return (
    <ComponentDoc
      title="Checkbox"
      description="Collect user's binary choices."
      whenToUse={[
        'Used for selecting multiple values from several options.',
        'Stand-alone checkbox can be used for toggling a single option on and off.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Basic usage of checkbox."
        code={`const [checked, setChecked] = useState(false)

<Checkbox checked={checked} onChange={setChecked}>
  Accept terms
</Checkbox>`}
      >
        <Checkbox checked={checked} onChange={setChecked}>Accept terms</Checkbox>
      </DemoBox>

      <DemoBox
        title="States"
        description="Default checked, disabled, indeterminate, and loading states."
        code={`<Checkbox defaultChecked>Default checked</Checkbox>
<Checkbox disabled>Disabled</Checkbox>
<Checkbox indeterminate>Indeterminate</Checkbox>
<Checkbox loading>Loading</Checkbox>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Checkbox defaultChecked>Default checked</Checkbox>
          <Checkbox disabled>Disabled</Checkbox>
          <Checkbox indeterminate>Indeterminate</Checkbox>
          <Checkbox loading>Loading</Checkbox>
        </div>
      </DemoBox>

      <DemoBox
        title="Scoped brand"
        description="Checked state uses --sg-color-primary. Override on a scope to rebrand."
        code={`<div style={{ ['--sg-color-primary' as any]: '#db2777' }}>
  <Checkbox defaultChecked>Pink</Checkbox>
</div>`}
      >
        <div
          style={{
            display: 'flex',
            gap: 16,
            ['--sg-color-primary' as never]: '#db2777',
          }}
        >
          <Checkbox defaultChecked>Pink</Checkbox>
          <Checkbox>Unchecked</Checkbox>
          <Checkbox indeterminate>Indeterminate</Checkbox>
        </div>
      </DemoBox>

      <DemoBox
        title="Group (manual)"
        description="Compose checkboxes into a group with shared state."
        code={`const all = ['Apple', 'Pear', 'Orange']
const [sel, setSel] = useState(['Apple'])
<div>
  {all.map(opt => (
    <Checkbox
      key={opt}
      checked={sel.includes(opt)}
      onChange={(c) => setSel(p => c ? [...p, opt] : p.filter(x => x !== opt))}
    >
      {opt}
    </Checkbox>
  ))}
</div>`}
      >
        <ManualGroup />
      </DemoBox>

      <PropsTable data={checkboxProps} />
    </ComponentDoc>
  )
}

function ManualGroup() {
  const all = ['Apple', 'Pear', 'Orange']
  const [sel, setSel] = useState<string[]>(['Apple'])
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {all.map((opt) => (
        <Checkbox
          key={opt}
          checked={sel.includes(opt)}
          onChange={(c) =>
            setSel((p) => (c ? [...p, opt] : p.filter((x) => x !== opt)))
          }
        >
          {opt}
        </Checkbox>
      ))}
      <code style={{ marginLeft: 8 }}>{JSON.stringify(sel)}</code>
    </div>
  )
}
