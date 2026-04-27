import { Avatar } from '@skygraph/react'

/**
 * `shape` chooses between a full circle and a rounded square. Square
 * avatars use `--sg-border-radius` so they pair with Cards and
 * Buttons tonally.
 */
export function ShapesAvatar() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar size="large">C</Avatar>
      <Avatar shape="square" size="large">S</Avatar>
      <Avatar size="large" src="https://api.dicebear.com/7.x/miniavs/svg?seed=42" alt="Lisa" />
      <Avatar shape="square" size="large" src="https://api.dicebear.com/7.x/miniavs/svg?seed=42" alt="Lisa" />
    </div>
  )
}
