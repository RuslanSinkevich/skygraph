import { Badge } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  display: 'flex',
  gap: 20,
  alignItems: 'center',
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-error': '#60a5fa',
  '--sg-color-primary': '#60a5fa',
} as CSSProperties

const box: CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 8,
  background: 'rgba(148, 163, 184, 0.35)',
  display: 'inline-block',
}

export function TokensOverrideBadge() {
  return (
    <div style={dark}>
      <Badge count={5}>
        <span style={box} />
      </Badge>
      <Badge dot>
        <span style={box} />
      </Badge>
    </div>
  )
}
