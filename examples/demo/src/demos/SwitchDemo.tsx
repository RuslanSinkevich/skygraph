import { Switch } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'
import { useState } from 'react'

const switchProps: PropDef[] = [
  { name: 'checked', description: 'Determine whether the Switch is checked', type: 'boolean' },
  { name: 'defaultChecked', description: 'Initial checked state', type: 'boolean', default: 'false' },
  { name: 'onChange', description: 'Callback when state changes', type: '(checked: boolean) => void' },
  { name: 'disabled', description: 'Disable the switch', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Show loading state on the switch', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Size of the switch', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'checkedChildren', description: 'Content shown when checked', type: 'ReactNode' },
  { name: 'unCheckedChildren', description: 'Content shown when unchecked', type: 'ReactNode' },
]

export function SwitchDemo() {
  const [checked, setChecked] = useState(false)

  return (
    <ComponentDoc
      title="Switch"
      description="Switching selector."
      whenToUse={[
        'When you need to represent the switching between two states or on-off state.',
        'The difference between Switch and Checkbox is that Switch triggers a state change directly, but Checkbox is generally used for state marking.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="The most basic usage."
        code={`import { Switch } from '@skygraph/react'

<Switch defaultChecked />`}
      >
        <Switch defaultChecked />
      </DemoBox>

      <DemoBox
        title="Text & Icon"
        description="With text or icon inside."
        code={`<Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
<Switch checkedChildren="1" unCheckedChildren="0" />`}
      >
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
          <Switch checkedChildren="1" unCheckedChildren="0" />
        </div>
      </DemoBox>

      <DemoBox
        title="Disabled"
        description="Disabled state of Switch."
        code={`<Switch disabled />
<Switch disabled defaultChecked />`}
      >
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Switch disabled />
          <Switch disabled defaultChecked />
        </div>
      </DemoBox>

      <DemoBox
        title="Loading"
        description="Loading state of Switch."
        code={`<Switch loading />
<Switch loading defaultChecked />`}
      >
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Switch loading />
          <Switch loading defaultChecked />
        </div>
      </DemoBox>

      <DemoBox
        title="Controlled"
        description="Controlled Switch."
        code={`const [checked, setChecked] = useState(false)

<Switch checked={checked} onChange={setChecked} />`}
      >
        <Switch checked={checked} onChange={setChecked} />
        <span style={{ marginLeft: 8 }}>{checked ? 'Checked' : 'Unchecked'}</span>
      </DemoBox>

      <PropsTable data={switchProps} />
    </ComponentDoc>
  )
}
