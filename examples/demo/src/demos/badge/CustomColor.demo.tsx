import { Badge } from '@skygraph/react'

const box = {
  width: 42,
  height: 42,
  borderRadius: 6,
  background: 'var(--sg-color-bg-container-disabled)',
  display: 'inline-block',
}

/**
 * `color` overrides the count / dot background with any CSS colour.
 * Pass a token reference like `var(--sg-color-primary)` to stay
 * theme-aware, or a raw hex for one-off colours.
 */
export function CustomColorBadge() {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <Badge color="#722ed1" count={5}><div style={box} /></Badge>
      <Badge color="#eb2f96" count={12}><div style={box} /></Badge>
      <Badge color="#16a34a" dot><div style={box} /></Badge>
      <Badge color="var(--sg-color-primary)" count={3}><div style={box} /></Badge>
    </div>
  )
}
