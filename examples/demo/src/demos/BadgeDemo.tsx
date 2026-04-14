import { Badge, Button } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'
import { useState } from 'react'

const badgeProps: PropDef[] = [
  { name: 'count', description: 'Number to show in badge', type: 'number' },
  { name: 'dot', description: 'Show a red dot instead of a number', type: 'boolean', default: 'false' },
  { name: 'overflowCount', description: 'Max count to show', type: 'number', default: '99' },
  { name: 'showZero', description: 'Whether to show badge when count is zero', type: 'boolean', default: 'false' },
  { name: 'color', description: 'Custom background color', type: 'string' },
  { name: 'status', description: 'Set Badge as a status dot', type: "'success' | 'error' | 'warning' | 'processing' | 'default'" },
  { name: 'text', description: 'Text next to the status dot', type: 'ReactNode' },
  { name: 'offset', description: 'Offset of the badge [right, top]', type: '[number, number]' },
]

const box = { width: 42, height: 42, borderRadius: 4, background: 'var(--sg-color-bg-container-disabled)', display: 'inline-block' }

export function BadgeDemo() {
  const [count, setCount] = useState(5)

  return (
    <ComponentDoc
      title="Badge"
      description="Small numerical value or status descriptor for UI elements."
      whenToUse={[
        'When you want to display a notification count on an icon or element.',
        'Use status badges to show the state of a process.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Simplest usage. Badge will be hidden when count is 0."
        code={`import { Badge } from '@skygraph/react'

<Badge count={5}>
  <div style={{ width: 42, height: 42, background: '#eee' }} />
</Badge>
<Badge count={0} showZero>
  <div style={{ width: 42, height: 42, background: '#eee' }} />
</Badge>`}
      >
        <div style={{ display: 'flex', gap: 24 }}>
          <Badge count={count}>
            <div style={box} />
          </Badge>
          <Badge count={0} showZero>
            <div style={box} />
          </Badge>
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <Button size="small" onClick={() => setCount((c) => c - 1)}>−</Button>
          <Button size="small" onClick={() => setCount((c) => c + 1)}>+</Button>
        </div>
      </DemoBox>

      <DemoBox
        title="Overflow Count"
        description="When count exceeds overflowCount, it shows as overflowCount+."
        code={`<Badge count={99}><div style={box} /></Badge>
<Badge count={100}><div style={box} /></Badge>
<Badge count={1000} overflowCount={999}><div style={box} /></Badge>`}
      >
        <div style={{ display: 'flex', gap: 24 }}>
          <Badge count={99}><div style={box} /></Badge>
          <Badge count={100}><div style={box} /></Badge>
          <Badge count={1000} overflowCount={999}><div style={box} /></Badge>
        </div>
      </DemoBox>

      <DemoBox
        title="Dot"
        description="Show a simple dot instead of a number."
        code={`<Badge dot>
  <div style={{ width: 42, height: 42 }} />
</Badge>`}
      >
        <Badge dot>
          <div style={box} />
        </Badge>
      </DemoBox>

      <DemoBox
        title="Status"
        description="Standalone status badge."
        code={`<Badge status="success" text="Success" />
<Badge status="error" text="Error" />
<Badge status="warning" text="Warning" />
<Badge status="processing" text="Processing" />
<Badge status="default" text="Default" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Badge status="success" text="Success" />
          <Badge status="error" text="Error" />
          <Badge status="warning" text="Warning" />
          <Badge status="processing" text="Processing" />
          <Badge status="default" text="Default" />
        </div>
      </DemoBox>

      <PropsTable data={badgeProps} />
    </ComponentDoc>
  )
}
