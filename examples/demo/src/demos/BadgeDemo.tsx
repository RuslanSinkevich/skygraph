import { Badge, Avatar, Button } from '@skygraph/react'
import { useState } from 'react'

export function BadgeDemo() {
  const [count, setCount] = useState(5)

  return (
    <section>
      <h2>Badge</h2>
      <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 16 }}>
        Counts, dots, and status indicators.
      </p>

      <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
        <Badge count={count}>
          <Avatar shape="square" size={40}>U</Avatar>
        </Badge>
        <Badge count={100} overflowCount={99}>
          <Avatar shape="square" size={40}>U</Avatar>
        </Badge>
        <Badge dot>
          <Avatar shape="square" size={40}>U</Avatar>
        </Badge>
        <Badge count={0} showZero>
          <Avatar shape="square" size={40}>U</Avatar>
        </Badge>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button size="small" onClick={() => setCount(Math.max(0, count - 1))}>−</Button>
          <Button size="small" onClick={() => setCount(count + 1)}>+</Button>
        </div>
      </div>

      <h4 style={{ marginBottom: 8 }}>Status</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Badge status="success" text="Success" />
        <Badge status="error" text="Error" />
        <Badge status="warning" text="Warning" />
        <Badge status="processing" text="Processing" />
        <Badge status="default" text="Default" />
      </div>
    </section>
  )
}
