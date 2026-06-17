import { Avatar } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-text-disabled': '#3b82f6',
} as CSSProperties

export function TokensOverrideAvatar() {
  return (
    <div style={dark}>
      <Avatar size="large">A</Avatar>
      <Avatar size="large" shape="square">
        B
      </Avatar>
    </div>
  )
}
