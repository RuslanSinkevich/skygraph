import type { CSSProperties } from 'react'
import { Avatar } from '@skygraph/react'

/**
 * Avatar has no component-specific tokens — square corners follow
 * `--sg-border-radius` and the fallback background is
 * `--sg-color-text-disabled`. Override those globals to reshape and
 * restyle every avatar in the subtree at once.
 */
const scoped: CSSProperties = {
  ['--sg-border-radius' as never]: '12px',
  ['--sg-color-text-disabled' as never]: '#7c3aed',
  ['--sg-color-white' as never]: '#fef3c7',
}

export function TokensOverrideAvatar() {
  return (
    <div style={{ ...scoped, display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar size="large">A</Avatar>
      <Avatar size="large" shape="square">B</Avatar>
      <Avatar size="large" shape="square">C</Avatar>
    </div>
  )
}
