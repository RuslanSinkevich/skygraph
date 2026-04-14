import { Button } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const buttonProps: PropDef[] = [
  { name: 'type', description: 'Visual variant of the button', type: "'default' | 'primary' | 'dashed' | 'text' | 'link'", default: "'default'" },
  { name: 'size', description: 'Button size', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'disabled', description: 'Disable the button', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Show loading spinner inside button', type: 'boolean', default: 'false' },
  { name: 'danger', description: 'Set the danger status of button', type: 'boolean', default: 'false' },
  { name: 'block', description: 'Make the button fit its parent width', type: 'boolean', default: 'false' },
  { name: 'htmlType', description: 'Native HTML button type attribute', type: "'button' | 'submit' | 'reset'", default: "'button'" },
  { name: 'onClick', description: 'Click handler', type: '(e: MouseEvent) => void' },
  { name: 'className', description: 'Additional CSS class', type: 'string' },
  { name: 'style', description: 'Inline styles', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Remove all built-in styles (headless mode)', type: 'boolean', default: 'false' },
]

export function ButtonDemo() {
  return (
    <ComponentDoc
      title="Button"
      description="To trigger an operation."
      whenToUse={[
        'A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.',
        'In SkyGraph, we provide 5 types of button: primary, default, dashed, text, and link.',
      ]}
    >
      <DemoBox
        title="Type"
        description="There are primary, default, dashed, text, and link button types."
        code={`import { Button } from '@skygraph/react'

<Button>Default</Button>
<Button type="primary">Primary</Button>
<Button type="dashed">Dashed</Button>
<Button type="text">Text</Button>
<Button type="link">Link</Button>`}
      >
        <Button>Default</Button>
        <Button type="primary">Primary</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="text">Text</Button>
        <Button type="link">Link</Button>
      </DemoBox>

      <DemoBox
        title="Size"
        description="Buttons come in three sizes: small, middle (default), and large."
        code={`<Button type="primary" size="small">Small</Button>
<Button type="primary">Middle</Button>
<Button type="primary" size="large">Large</Button>`}
      >
        <Button type="primary" size="small">Small</Button>
        <Button type="primary">Middle</Button>
        <Button type="primary" size="large">Large</Button>
      </DemoBox>

      <DemoBox
        title="Loading"
        description="A loading indicator can be added to a button by setting the loading property."
        code={`<Button loading>Default Loading</Button>
<Button type="primary" loading>Primary Loading</Button>
<Button type="dashed" loading>Dashed Loading</Button>`}
      >
        <Button loading>Default Loading</Button>
        <Button type="primary" loading>Primary Loading</Button>
        <Button type="dashed" loading>Dashed Loading</Button>
      </DemoBox>

      <DemoBox
        title="Disabled"
        description="To mark a button as disabled, add the disabled property."
        code={`<Button disabled>Disabled</Button>
<Button type="primary" disabled>Primary Disabled</Button>
<Button type="dashed" disabled>Dashed Disabled</Button>
<Button type="text" disabled>Text Disabled</Button>
<Button type="link" disabled>Link Disabled</Button>`}
      >
        <Button disabled>Disabled</Button>
        <Button type="primary" disabled>Primary Disabled</Button>
        <Button type="dashed" disabled>Dashed Disabled</Button>
        <Button type="text" disabled>Text Disabled</Button>
        <Button type="link" disabled>Link Disabled</Button>
      </DemoBox>

      <PropsTable data={buttonProps} />
    </ComponentDoc>
  )
}
