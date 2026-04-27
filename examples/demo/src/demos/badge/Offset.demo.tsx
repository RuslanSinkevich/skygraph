import { Badge } from '@skygraph/react'

const box = {
  width: 42,
  height: 42,
  borderRadius: 6,
  background: 'var(--sg-color-bg-container-disabled)',
  display: 'inline-block',
}

/**
 * `offset` shifts the count / dot by `[right, top]` pixels. Positive
 * right values push it outward, negative values pull it onto the
 * child — useful for overlaying circular avatars.
 */
export function OffsetBadge() {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <Badge count={5} offset={[-6, 6]}>
        <div style={{ ...box, borderRadius: '50%' }} />
      </Badge>
      <Badge count={5} offset={[8, -4]}>
        <div style={box} />
      </Badge>
      <Badge dot offset={[-2, 2]}>
        <div style={{ ...box, borderRadius: '50%' }} />
      </Badge>
    </div>
  )
}
