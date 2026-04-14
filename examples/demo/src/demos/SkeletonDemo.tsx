import { Skeleton, Button } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'
import { useState } from 'react'

const skeletonProps: PropDef[] = [
  { name: 'active', description: 'Show animation effect', type: 'boolean', default: 'false' },
  { name: 'avatar', description: 'Show avatar placeholder', type: 'boolean | { size?: number; shape?: "circle" | "square" }', default: 'false' },
  { name: 'title', description: 'Show title placeholder', type: 'boolean | { width?: number | string }', default: 'true' },
  { name: 'paragraph', description: 'Show paragraph placeholder', type: 'boolean | { rows?: number; width?: Array<number | string> }', default: 'true' },
  { name: 'loading', description: 'Display the skeleton when true, children when false', type: 'boolean', default: 'true' },
  { name: 'children', description: 'Content to show when not loading', type: 'ReactNode' },
]

export function SkeletonDemo() {
  const [loading, setLoading] = useState(true)

  return (
    <ComponentDoc
      title="Skeleton"
      description="Provide a placeholder while you wait for content to load."
      whenToUse={[
        'When a resource needs a long time to load.',
        'When the content area is in a loading state, a skeleton screen provides a visual expectation.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Simplest Skeleton usage."
        code={`import { Skeleton } from '@skygraph/react'

<Skeleton />`}
      >
        <Skeleton />
      </DemoBox>

      <DemoBox
        title="Active Animation"
        description="Display active animation."
        code={`<Skeleton active />`}
      >
        <Skeleton active />
      </DemoBox>

      <DemoBox
        title="With Avatar"
        description="Skeleton with avatar, title and paragraph."
        code={`<Skeleton avatar active />`}
      >
        <Skeleton avatar active />
      </DemoBox>

      <DemoBox
        title="Contains Children"
        description="Show content when loading is complete."
        code={`const [loading, setLoading] = useState(true)

<Button onClick={() => setLoading(!loading)}>Toggle</Button>
<Skeleton loading={loading} avatar active>
  <div>Actual content here</div>
</Skeleton>`}
      >
        <div style={{ marginBottom: 12 }}>
          <Button onClick={() => setLoading(!loading)}>Toggle Loading</Button>
        </div>
        <Skeleton loading={loading} avatar active>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--sg-color-primary)' }} />
            <div>
              <h4 style={{ margin: 0 }}>John Doe</h4>
              <p style={{ margin: 0, color: 'var(--sg-color-text-secondary)' }}>Software Engineer at Acme Corp</p>
            </div>
          </div>
        </Skeleton>
      </DemoBox>

      <DemoBox
        title="Custom Rows"
        description="Customize the number of paragraph rows."
        code={`<Skeleton paragraph={{ rows: 5 }} active />`}
      >
        <Skeleton paragraph={{ rows: 5 }} active />
      </DemoBox>

      <PropsTable data={skeletonProps} />
    </ComponentDoc>
  )
}
