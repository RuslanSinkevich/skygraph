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

      <DemoBox
        title="Validation state"
        description="Use aria-invalid for errors. SkyGraph styles the input error state without !important."
        code={`<Input aria-invalid placeholder="Invalid" />
<Input aria-required placeholder="Required" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320, width: '100%' }}>
          <Input aria-invalid placeholder="Invalid input" defaultValue="not-an-email" />
          <Input aria-required placeholder="Required" />
        </div>
      </DemoBox>

      <DemoBox
        title="Component tokens (radius, height, font)"
        description="Per-scope tokens let you reskin only these inputs."
        code={`<div style={{
  ['--sg-input-height' as any]: '44px',
  ['--sg-input-radius' as any]: '14px',
  ['--sg-input-font-size' as any]: '16px',
}}>
  <Input placeholder="Rounded soft input" />
</div>`}
      >
        <div
          style={{
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
            maxWidth: 360,
            width: '100%',
            ['--sg-input-height' as never]: '44px',
            ['--sg-input-radius' as never]: '14px',
            ['--sg-input-font-size' as never]: '16px',
          }}
        >
          <Input placeholder="Rounded soft input" />
          <Input placeholder="Rounded 2" />
        </div>
      </DemoBox>

      <DemoBox
        title="Scoped brand"
        description="Override --sg-color-primary and focus ring follows automatically."
        code={`<div style={{
  ['--sg-color-primary' as any]: '#7c3aed',
  ['--sg-color-primary-bg' as any]: '#f3e8ff',
}}>
  <Input placeholder="Brand-aware input" />
</div>`}
      >
        <div
          style={{
            maxWidth: 360,
            width: '100%',
            ['--sg-color-primary' as never]: '#7c3aed',
            ['--sg-color-primary-bg' as never]: '#f3e8ff',
          }}
        >
          <Input placeholder="Brand-aware input (violet)" />
        </div>
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Drop SkyGraph styles, keep the semantics. Bring your own look."
        code={`<Input unstyled className="demo-unstyled-input" placeholder="Custom CSS" />`}
      >
        <Input unstyled className="demo-unstyled-input" placeholder="Custom CSS" />
      </DemoBox>

      <PropsTable data={inputProps} />
    </ComponentDoc>
  )
}
