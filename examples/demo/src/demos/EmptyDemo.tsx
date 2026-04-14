import { Empty, Button } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const emptyProps: PropDef[] = [
  { name: 'image', description: 'Custom image', type: 'ReactNode' },
  { name: 'description', description: 'Custom description', type: 'ReactNode', default: "'No Data'" },
  { name: 'children', description: 'Extra content below the description', type: 'ReactNode' },
]

export function EmptyDemo() {
  return (
    <ComponentDoc
      title="Empty"
      description="Empty state placeholder."
      whenToUse={[
        'When a list, table, or card has no data to display.',
        'When a user has completed all tasks or has no results to show.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Simplest usage."
        code={`import { Empty } from '@skygraph/react'

<Empty />`}
      >
        <Empty />
      </DemoBox>

      <DemoBox
        title="Custom Description"
        description="Customize the description text."
        code={`<Empty description="No results found" />`}
      >
        <Empty description="No results found" />
      </DemoBox>

      <DemoBox
        title="No Description"
        description="Hide the description."
        code={`<Empty description={null} />`}
      >
        <Empty description={null} />
      </DemoBox>

      <DemoBox
        title="Custom Content"
        description="Add extra content like a button."
        code={`<Empty description="No data yet">
  <Button type="primary">Create Now</Button>
</Empty>`}
      >
        <Empty description="No data yet">
          <Button type="primary">Create Now</Button>
        </Empty>
      </DemoBox>

      <PropsTable data={emptyProps} />
    </ComponentDoc>
  )
}
