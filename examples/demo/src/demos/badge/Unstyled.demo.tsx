import { Badge } from '@skygraph/react'

const box = {
  width: 42,
  height: 42,
  borderRadius: 6,
  background: '#1e293b',
  display: 'inline-block',
}

/**
 * `unstyled` drops every `sg-badge-*` class and just renders a
 * `<span>` with your children and a `<sup>` for the count / dot. Do
 * the styling on your wrapping container.
 */
export function UnstyledBadge() {
  return (
    <div
      style={{
        padding: 16,
        background: '#0f172a',
        color: '#e2e8f0',
        borderRadius: 8,
        display: 'inline-block',
      }}
    >
      <Badge
        unstyled
        count={7}
        style={{
          ['--badge-bg' as never]: '#f472b6',
        }}
      >
        <div style={box} />
      </Badge>
    </div>
  )
}
