import { Badge } from '@skygraph/react'

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
 * Numbers above `overflowCount` collapse to `{overflowCount}+`. The
 * default cap is 99 — bump it up to 999 for inbox-style counters.
 */
export function OverflowBadge() {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <Badge count={99}><div style={box} /></Badge>
      <Badge count={100}><div style={box} /></Badge>
      <Badge count={1000} overflowCount={999}><div style={box} /></Badge>
    </div>
  )
}
