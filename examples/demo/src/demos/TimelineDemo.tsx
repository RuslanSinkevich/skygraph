import { Timeline } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const timelineProps: PropDef[] = [
  { name: 'items', description: 'Timeline items', type: 'TimelineItem[]' },
  { name: 'mode', description: 'Layout mode of the timeline', type: "'left' | 'right' | 'alternate'", default: "'left'" },
  { name: 'pending', description: 'Last node as pending or custom pending content', type: 'ReactNode | boolean' },
  { name: 'pendingDot', description: 'Custom dot for the pending node', type: 'ReactNode' },
  { name: 'reverse', description: 'Reverse the timeline order', type: 'boolean', default: 'false' },
]

const timelineItemProps: PropDef[] = [
  { name: 'children', description: 'Content of the timeline item', type: 'ReactNode' },
  { name: 'color', description: 'Dot color', type: 'string', default: "'blue'" },
  { name: 'dot', description: 'Custom dot element', type: 'ReactNode' },
  { name: 'label', description: 'Label content', type: 'ReactNode' },
  { name: 'position', description: 'Custom position', type: "'left' | 'right'" },
]

const basicItems = [
  { children: 'Create a services site 2015-09-01' },
  { children: 'Solve initial network problems 2015-09-01' },
  { children: 'Technical testing 2015-09-01', color: 'green' },
  { children: 'Network problems being solved 2015-09-01', color: 'red' },
]

export function TimelineDemo() {
  return (
    <ComponentDoc
      title="Timeline"
      description="Vertical display timeline."
      whenToUse={[
        'When a series of information needs to be ordered by time (ascending or descending).',
        'When you need a timeline to make a visual connection.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Basic timeline."
        code={`import { Timeline } from '@skygraph/react'

<Timeline items={[
  { children: 'Create a services site 2015-09-01' },
  { children: 'Solve initial network problems' },
  { children: 'Technical testing', color: 'green' },
  { children: 'Network problems being solved', color: 'red' },
]} />`}
      >
        <Timeline items={basicItems} />
      </DemoBox>

      <DemoBox
        title="Alternate"
        description="Alternate timeline content on left and right."
        code={`<Timeline mode="alternate" items={[
  { children: 'Create site 2015-09-01' },
  { children: 'Solve problems 2015-09-01', color: 'green' },
  { children: 'Testing 2015-09-01' },
  { children: 'Problems solved 2015-09-01', color: 'red' },
]} />`}
      >
        <Timeline mode="alternate" items={basicItems} />
      </DemoBox>

      <DemoBox
        title="With Label"
        description="Use label to set a summary."
        code={`<Timeline mode="alternate" items={[
  { label: '2015-09-01', children: 'Create site' },
  { label: '2015-09-02', children: 'Solve problems' },
  { label: '2015-09-03', children: 'Testing' },
]} />`}
      >
        <Timeline mode="alternate" items={[
          { label: '2015-09-01', children: 'Create a services site' },
          { label: '2015-09-02', children: 'Solve initial network problems' },
          { label: '2015-09-03', children: 'Technical testing' },
          { label: '2015-09-04', children: 'Network problems being solved' },
        ]} />
      </DemoBox>

      <DemoBox
        title="Pending"
        description="When the timeline is incomplete and ongoing, put a ghost node at last."
        code={`<Timeline pending="Recording..." items={[
  { children: 'Create site 2015-09-01' },
  { children: 'Solve problems 2015-09-01' },
  { children: 'Technical testing 2015-09-01' },
]} />`}
      >
        <Timeline pending="Recording..." items={[
          { children: 'Create a services site 2015-09-01' },
          { children: 'Solve initial network problems 2015-09-01' },
          { children: 'Technical testing 2015-09-01' },
        ]} />
      </DemoBox>

      <DemoBox
        title="Reverse"
        description="Flip the order of events."
        code={`<Timeline reverse items={items} />`}
      >
        <Timeline reverse items={basicItems} />
      </DemoBox>

      <DemoBox
        title="Custom color per item"
        description="Any CSS color works in the color prop."
        code={`<Timeline items={[
  { children: 'Blue (default)' },
  { children: 'Custom purple', color: '#7c3aed' },
  { children: 'Custom pink', color: '#db2777' },
]} />`}
      >
        <Timeline
          items={[
            { children: 'Blue (default)' },
            { children: 'Custom purple', color: '#7c3aed' },
            { children: 'Custom pink', color: '#db2777' },
            { children: 'Custom amber', color: '#d97706' },
          ]}
        />
      </DemoBox>

      <PropsTable data={timelineProps} />
      <PropsTable title="TimelineItem" data={timelineItemProps} />
    </ComponentDoc>
  )
}
