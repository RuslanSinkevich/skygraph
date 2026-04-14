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

      <PropsTable data={checkboxProps} />
    </ComponentDoc>
  )
}
