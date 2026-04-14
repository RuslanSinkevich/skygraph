import { useState } from 'react'
import { Input } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const inputProps: PropDef[] = [
  { name: 'value', description: 'The input content value', type: 'string' },
  { name: 'defaultValue', description: 'Initial value', type: 'string' },
  { name: 'onChange', description: 'Callback when value changes', type: '(value: string) => void' },
  { name: 'placeholder', description: 'Placeholder text', type: 'string' },
  { name: 'type', description: 'HTML input type', type: "'text' | 'password' | 'number' | ...", default: "'text'" },
  { name: 'size', description: 'Input size', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'disabled', description: 'Disable the input', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Show loading spinner inside input', type: 'boolean', default: 'false' },
  { name: 'prefix', description: 'Prefix element inside input', type: 'ReactNode' },
  { name: 'suffix', description: 'Suffix element inside input', type: 'ReactNode' },
  { name: 'allowClear', description: 'Show clear button when has value', type: 'boolean', default: 'false' },
  { name: 'aria-invalid', description: 'Set ARIA invalid state for a11y', type: 'boolean' },
  { name: 'aria-required', description: 'Set ARIA required state for a11y', type: 'boolean' },
  { name: 'unstyled', description: 'Remove all built-in styles (headless mode)', type: 'boolean', default: 'false' },
]

export function InputDemo() {
  const [value, setValue] = useState('')

  return (
    <ComponentDoc
      title="Input"
      description="A basic widget for getting the user input in a text field."
      whenToUse={[
        'When a user needs to provide text input in a form field.',
        'A search field or similar text-based input.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Basic usage of Input component."
        code={`import { Input } from '@skygraph/react'

const [value, setValue] = useState('')

<Input placeholder="Default input" value={value} onChange={setValue} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 300, width: '100%' }}>
          <Input placeholder="Default input" value={value} onChange={setValue} />
        </div>
      </DemoBox>

      <DemoBox
        title="Three sizes"
        description="There are three sizes: large, middle (default), and small."
        code={`<Input size="small" placeholder="Small input" />
<Input placeholder="Default input" />
<Input size="large" placeholder="Large input" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 300, width: '100%' }}>
          <Input size="small" placeholder="Small input" />
          <Input placeholder="Default input" />
          <Input size="large" placeholder="Large input" />
        </div>
      </DemoBox>

      <DemoBox
        title="Password"
        description="Input component for entering passwords."
        code={`<Input type="password" placeholder="Enter password" />`}
      >
        <div style={{ maxWidth: 300, width: '100%' }}>
          <Input type="password" placeholder="Enter password" />
        </div>
      </DemoBox>

      <DemoBox
        title="Disabled & Loading"
        description="Disabled state and loading indicator."
        code={`<Input disabled placeholder="Disabled" />
<Input loading placeholder="Loading..." />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 300, width: '100%' }}>
          <Input disabled placeholder="Disabled" />
          <Input loading placeholder="Loading..." />
        </div>
      </DemoBox>

      <PropsTable data={inputProps} />
    </ComponentDoc>
  )
}
