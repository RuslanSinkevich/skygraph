import { Progress, Button } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'
import { useState } from 'react'

const progressProps: PropDef[] = [
  { name: 'percent', description: 'Completion percentage', type: 'number' },
  { name: 'type', description: 'Type of progress', type: "'line' | 'circle'", default: "'line'" },
  { name: 'status', description: 'Status of the progress', type: "'normal' | 'success' | 'error' | 'active'", default: "'normal'" },
  { name: 'showInfo', description: 'Whether to display the percentage text', type: 'boolean', default: 'true' },
  { name: 'strokeWidth', description: 'Width of the progress bar stroke', type: 'number' },
  { name: 'strokeColor', description: 'Color of the progress bar', type: 'string' },
  { name: 'width', description: 'Width of the circular progress', type: 'number', default: '120' },
  { name: 'size', description: 'Size of the progress', type: "'small' | 'middle' | 'large'", default: "'middle'" },
]

export function ProgressDemo() {
  const [percent, setPercent] = useState(30)

  const increase = () => setPercent((p) => Math.min(100, p + 10))
  const decrease = () => setPercent((p) => Math.max(0, p - 10))

  return (
    <ComponentDoc
      title="Progress"
      description="Display the current progress of an operation flow."
      whenToUse={[
        'When an operation takes a long time to complete.',
        'When you need to display the completion percentage of an operation.',
      ]}
    >
      <DemoBox
        title="Line"
        description="A standard progress bar."
        code={`import { Progress } from '@skygraph/react'

<Progress percent={30} />
<Progress percent={50} status="active" />
<Progress percent={70} status="error" />
<Progress percent={100} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
          <Progress percent={30} />
          <Progress percent={50} status="active" />
          <Progress percent={70} status="error" />
          <Progress percent={100} />
        </div>
      </DemoBox>

      <DemoBox
        title="Circle"
        description="A circular progress bar."
        code={`<Progress type="circle" percent={75} />
<Progress type="circle" percent={100} />
<Progress type="circle" percent={70} status="error" />`}
      >
        <div style={{ display: 'flex', gap: 24 }}>
          <Progress type="circle" percent={75} />
          <Progress type="circle" percent={100} />
          <Progress type="circle" percent={70} status="error" />
        </div>
      </DemoBox>

      <DemoBox
        title="Dynamic"
        description="A dynamic progress bar."
        code={`const [percent, setPercent] = useState(30)

<Progress percent={percent} />
<Button onClick={() => setPercent(p => Math.min(100, p + 10))}>+</Button>
<Button onClick={() => setPercent(p => Math.max(0, p - 10))}>-</Button>`}
      >
        <div style={{ maxWidth: 400 }}>
          <Progress percent={percent} />
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <Button size="small" onClick={decrease}>−</Button>
            <Button size="small" onClick={increase}>+</Button>
          </div>
        </div>
      </DemoBox>

      <DemoBox
        title="Custom Color"
        description="Custom stroke color."
        code={`<Progress percent={50} strokeColor="#722ed1" />
<Progress type="circle" percent={75} strokeColor="#eb2f96" />`}
      >
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div style={{ flex: 1, maxWidth: 300 }}>
            <Progress percent={50} strokeColor="#722ed1" />
          </div>
          <Progress type="circle" percent={75} strokeColor="#eb2f96" />
        </div>
      </DemoBox>

      <DemoBox
        title="Scoped brand"
        description="Progress picks up --sg-color-primary for active/normal states — no props needed."
        code={`<div style={{ ['--sg-color-primary' as any]: '#059669' }}>
  <Progress percent={45} />
  <Progress type="circle" percent={65} />
</div>`}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            ['--sg-color-primary' as never]: '#059669',
          }}
        >
          <div style={{ flex: 1, maxWidth: 320 }}>
            <Progress percent={45} />
          </div>
          <Progress type="circle" percent={65} />
        </div>
      </DemoBox>

      <PropsTable data={progressProps} />
    </ComponentDoc>
  )
}
