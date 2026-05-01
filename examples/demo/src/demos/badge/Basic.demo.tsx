import { useState } from 'react'
import { Badge, Button } from '@skygraph/react'

const box = {
  width: 42,
  height: 42,
  borderRadius: 6,
  background: 'var(--sg-color-bg-container)',
  border: '1px solid var(--sg-color-border)',
  boxShadow: 'inset 0 0 0 1px color-mix(in srgb, white 55%, transparent)',
  display: 'inline-block',
}

/**
 * Badge wraps a child and pins a count to its top-right corner.
 * A `count` of 0 is hidden unless `showZero` is set — that lets you
 * drop the Badge in unconditionally without conditionals upstream.
 */
export function BasicBadge() {
  const [count, setCount] = useState(5)

  return (
    <div>
      <div style={{ display: 'flex', gap: 24 }}>
        <Badge count={count}>
          <div style={box} />
        </Badge>
        <Badge count={0} showZero>
          <div style={box} />
        </Badge>
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <Button size="small" onClick={() => setCount((c) => Math.max(0, c - 1))}>−</Button>
        <Button size="small" onClick={() => setCount((c) => c + 1)}>+</Button>
      </div>
    </div>
  )
}
