import { Spin, Button } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'
import { useState } from 'react'

const spinProps: PropDef[] = [
  { name: 'spinning', description: 'Whether Spin is visible', type: 'boolean', default: 'true' },
  { name: 'size', description: 'Size of the spinner', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'delay', description: 'Delay before showing spinner (ms)', type: 'number' },
  { name: 'tip', description: 'Customize description content below the spinner', type: 'string' },
  { name: 'fullscreen', description: 'Display as fullscreen overlay', type: 'boolean', default: 'false' },
  { name: 'indicator', description: 'Custom spinning indicator', type: 'ReactNode' },
  { name: 'children', description: 'Content to wrap with loading overlay', type: 'ReactNode' },
]

export function SpinDemo() {
  const [loading, setLoading] = useState(true)

  return (
    <ComponentDoc
      title="Spin"
      description="A spinner for displaying loading state of a page or a section."
      whenToUse={[
        'When part of the page is waiting for async data or during a rendering process, an appropriate loading animation can effectively alleviate user anxiety.',
        'When wrapping a container to show loading state for an entire section.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="A simple loading status."
        code={`import { Spin } from '@skygraph/react'

<Spin />`}
      >
        <Spin />
      </DemoBox>

      <DemoBox
        title="Size"
        description="A small, default, and large spinner."
        code={`<Spin size="small" />
<Spin />
<Spin size="large" />`}
      >
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Spin size="small" />
          <Spin />
          <Spin size="large" />
        </div>
      </DemoBox>

      <DemoBox
        title="Container"
        description="Wrapping content to show loading state."
        code={`const [loading, setLoading] = useState(true)

<Spin spinning={loading}>
  <div style={{ padding: 24 }}>Content here</div>
</Spin>
<Button onClick={() => setLoading(!loading)}>Toggle</Button>`}
      >
        <Spin spinning={loading}>
          <div style={{ padding: 24, border: '1px solid var(--sg-color-border)', borderRadius: 8 }}>
            <p>Some content that is being loaded.</p>
            <p>It will be blurred when loading.</p>
          </div>
        </Spin>
        <div style={{ marginTop: 12 }}>
          <Button onClick={() => setLoading(!loading)}>Toggle Loading</Button>
        </div>
      </DemoBox>

      <DemoBox
        title="Tip"
        description="A tip message below the spinner."
        code={`<Spin tip="Loading data..." spinning>
  <div style={{ padding: 24 }}>Content</div>
</Spin>`}
      >
        <Spin tip="Loading data..." spinning>
          <div style={{ padding: 24, border: '1px solid var(--sg-color-border)', borderRadius: 8 }}>
            <p>Content is loading...</p>
          </div>
        </Spin>
      </DemoBox>

      <PropsTable data={spinProps} />
    </ComponentDoc>
  )
}
