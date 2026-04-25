import { useState } from 'react'
import { Button } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const buttonProps: PropDef[] = [
  {
    name: 'type',
    description: 'Visual variant of the button',
    type: "'default' | 'primary' | 'dashed' | 'text' | 'link'",
    default: "'default'",
  },
  { name: 'size', description: 'Button size', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'disabled', description: 'Disable the button', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Show loading spinner inside button', type: 'boolean', default: 'false' },
  { name: 'htmlType', description: 'Native HTML button type attribute', type: "'button' | 'submit' | 'reset'", default: "'button'" },
  { name: 'onClick', description: 'Click handler', type: '(e: MouseEvent) => void' },
  { name: 'className', description: 'Additional CSS class on the root', type: 'string' },
  { name: 'style', description: 'Inline styles on the root', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop all SkyGraph styles; keeps semantics (disabled, aria-busy, type)', type: 'boolean', default: 'false' },
]

export function ButtonDemo() {
  return (
    <ComponentDoc
      title="Button"
      badge="General"
      crumbs={['General', 'Button']}
      description="Trigger actions. Five visual types, three sizes, three shapes, loading/disabled states, and a fully unstyled mode."
      whenToUse={[
        'A button means an operation (or a series of operations). Clicking a button triggers business logic.',
        'Use primary for the call to action, default for secondary actions, dashed for adding items, text/link for inline actions.',
      ]}
      notes={
        <>
          Styling hooks: <code>--sg-btn-height</code>, <code>--sg-btn-radius</code>,{' '}
          <code>--sg-btn-padding</code>, <code>--sg-btn-font-size</code>. Semantic tokens like{' '}
          <code>--sg-color-primary</code> apply automatically.
        </>
      }
    >
      <DemoBox
        title="Type"
        description="There are primary, default, dashed, text, and link button types."
        code={`<Button>Default</Button>
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
        code={`<Button size="small">Small</Button>
<Button>Middle</Button>
<Button size="large">Large</Button>`}
      >
        <Button size="small">Small</Button>
        <Button type="primary" size="small">
          Small primary
        </Button>
        <Button>Middle</Button>
        <Button type="primary">Middle primary</Button>
        <Button size="large">Large</Button>
        <Button type="primary" size="large">
          Large primary
        </Button>
      </DemoBox>

      <DemoBox
        title="Loading"
        description="A loading indicator can be added to a button by setting the loading property."
        code={`<Button loading>Loading</Button>
<Button type="primary" loading>Saving…</Button>
<Button type="dashed" loading>Submitting…</Button>`}
      >
        <Button loading>Default Loading</Button>
        <Button type="primary" loading>
          Primary Loading
        </Button>
        <Button type="dashed" loading>
          Dashed Loading
        </Button>
        <DelayLoadingButton />
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
        <Button type="primary" disabled>
          Primary Disabled
        </Button>
        <Button type="dashed" disabled>
          Dashed Disabled
        </Button>
        <Button type="text" disabled>
          Text Disabled
        </Button>
        <Button type="link" disabled>
          Link Disabled
        </Button>
      </DemoBox>

      <DemoBox
        title="Component tokens"
        description="Override --sg-btn-* on a local wrapper to restyle only these buttons."
        code={`<div style={{
  ['--sg-btn-height' as any]: '42px',
  ['--sg-btn-radius' as any]: '999px',
  ['--sg-btn-font-size' as any]: '14px',
  ['--sg-btn-padding' as any]: '0 22px',
}}>
  <Button type="primary">Pill primary</Button>
  <Button>Pill default</Button>
</div>`}
      >
        <div
          style={{
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
            ['--sg-btn-height' as never]: '42px',
            ['--sg-btn-radius' as never]: '999px',
            ['--sg-btn-font-size' as never]: '14px',
            ['--sg-btn-padding' as never]: '0 22px',
          }}
        >
          <Button type="primary">Pill primary</Button>
          <Button>Pill default</Button>
          <Button type="dashed">Pill dashed</Button>
        </div>
      </DemoBox>

      <DemoBox
        title="Scoped brand"
        description="Override semantic tokens to change the whole brand on a subtree without touching components."
        code={`<div style={{
  ['--sg-color-primary' as any]: '#16a34a',
  ['--sg-color-primary-hover' as any]: '#15803d',
  ['--sg-color-primary-bg' as any]: '#dcfce7',
}}>
  <Button type="primary">Primary</Button>
</div>`}
      >
        <div
          style={{
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
            ['--sg-color-primary' as never]: '#16a34a',
            ['--sg-color-primary-hover' as never]: '#15803d',
            ['--sg-color-primary-bg' as never]: '#dcfce7',
          }}
        >
          <Button type="primary">Primary (green)</Button>
          <Button>Default</Button>
          <Button type="link">Link</Button>
        </div>
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Keep semantics (disabled, aria-busy, focus) but drop all default CSS. Bring your own."
        code={`<Button unstyled className="demo-unstyled-btn">
  Custom shape
</Button>`}
      >
        <Button unstyled className="demo-unstyled-btn">
          Custom pill
        </Button>
        <Button unstyled className="demo-unstyled-btn" disabled>
          Disabled pill
        </Button>
      </DemoBox>

      <PropsTable data={buttonProps} />
    </ComponentDoc>
  )
}

function DelayLoadingButton() {
  const [loading, setLoading] = useState(false)
  return (
    <Button
      type="primary"
      loading={loading}
      onClick={() => {
        setLoading(true)
        setTimeout(() => setLoading(false), 1500)
      }}
    >
      Click me
    </Button>
  )
}
