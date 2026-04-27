import { Badge } from '@skygraph/react'

const box = {
  width: 42,
  height: 42,
  borderRadius: 6,
  background: 'var(--sg-color-bg-container-disabled)',
  display: 'inline-block',
}

/**
 * `dot` renders a pill-less 8×8 indicator — use it for "has
 * unread activity" signals where the exact number is noise.
 */
export function DotBadge() {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <Badge dot>
        <div style={box} />
      </Badge>
      <Badge dot color="var(--sg-color-success)">
        <div style={box} />
      </Badge>
      <Badge dot color="var(--sg-color-warning)">
        <div style={box} />
      </Badge>
    </div>
  )
}
