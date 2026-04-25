import { Steps, Button } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'
import { useState } from 'react'

const stepsProps: PropDef[] = [
  { name: 'current', description: 'Current step index (0-based)', type: 'number' },
  { name: 'items', description: 'Steps configuration', type: 'StepItem[]' },
  { name: 'direction', description: 'Direction of steps', type: "'horizontal' | 'vertical'", default: "'horizontal'" },
  { name: 'onChange', description: 'Callback when clicking step', type: '(current: number) => void' },
  { name: 'type', description: 'Type of steps', type: "'default' | 'navigation'", default: "'default'" },
  { name: 'size', description: 'Size of steps', type: "'small' | 'middle' | 'large'", default: "'middle'" },
]

const stepItemProps: PropDef[] = [
  { name: 'title', description: 'Title of the step', type: 'ReactNode' },
  { name: 'description', description: 'Description of the step', type: 'ReactNode' },
  { name: 'icon', description: 'Custom icon', type: 'ReactNode' },
  { name: 'status', description: 'Forced status', type: "'wait' | 'process' | 'finish' | 'error'" },
]

const basicSteps = [
  { title: 'Finished', description: 'This is a description.' },
  { title: 'In Progress', description: 'This is a description.' },
  { title: 'Waiting', description: 'This is a description.' },
]

export function StepsDemo() {
  const [current, setCurrent] = useState(1)

  return (
    <ComponentDoc
      title="Steps"
      description="A navigation bar that guides users through the steps of a task."
      whenToUse={[
        'When a task is complicated or has a certain sequence in the series of subtasks.',
        'When a large form needs to be broken into multiple steps.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="The most basic step bar."
        code={`import { Steps } from '@skygraph/react'

<Steps current={1} items={[
  { title: 'Finished', description: 'This is a description.' },
  { title: 'In Progress', description: 'This is a description.' },
  { title: 'Waiting', description: 'This is a description.' },
]} />`}
      >
        <Steps current={1} items={basicSteps} />
      </DemoBox>

      <DemoBox
        title="Clickable"
        description="Clickable steps with navigation."
        code={`const [current, setCurrent] = useState(1)

<Steps current={current} onChange={setCurrent} items={steps} />
<Button onClick={() => setCurrent(c => Math.max(0, c - 1))}>Previous</Button>
<Button onClick={() => setCurrent(c => Math.min(2, c + 1))}>Next</Button>`}
      >
        <Steps current={current} onChange={setCurrent} items={basicSteps} />
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <Button disabled={current <= 0} onClick={() => setCurrent((c) => c - 1)}>Previous</Button>
          <Button type="primary" disabled={current >= 2} onClick={() => setCurrent((c) => c + 1)}>Next</Button>
        </div>
      </DemoBox>

      <DemoBox
        title="Vertical"
        description="Vertical step bar."
        code={`<Steps direction="vertical" current={1} items={steps} />`}
      >
        <Steps direction="vertical" current={1} items={basicSteps} />
      </DemoBox>

      <DemoBox
        title="Error Status"
        description="Steps with an error status."
        code={`<Steps current={1} items={[
  { title: 'Finished' },
  { title: 'Error', status: 'error' },
  { title: 'Waiting' },
]} />`}
      >
        <Steps current={1} items={[
          { title: 'Finished' },
          { title: 'Error Step', status: 'error' },
          { title: 'Waiting' },
        ]} />
      </DemoBox>

      <DemoBox
        title="Size small"
        description="Compact steps for dense layouts."
        code={`<Steps size="small" current={1} items={items} />`}
      >
        <Steps size="small" current={1} items={basicSteps} />
      </DemoBox>

      <DemoBox
        title="Scoped brand"
        description="Active / finished step uses --sg-color-primary. Override on wrapper."
        code={`<div style={{ ['--sg-color-primary' as any]: '#16a34a' }}>
  <Steps current={1} items={items} />
</div>`}
      >
        <div style={{ ['--sg-color-primary' as never]: '#16a34a' }}>
          <Steps current={1} items={basicSteps} />
        </div>
      </DemoBox>

      <PropsTable data={stepsProps} />
      <PropsTable title="StepItem" data={stepItemProps} />
    </ComponentDoc>
  )
}
