import { Avatar } from '@skygraph/react'

/**
 * When `src` is missing, the avatar falls back to `icon`, and when
 * `icon` is also missing, to the `children` text. Use this to render
 * initials when a photo URL hasn't loaded yet.
 */
export function FallbackAvatar() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar size="large" src="https://api.dicebear.com/7.x/miniavs/svg?seed=3" alt="Photo" />
      <Avatar size="large" icon={<span aria-hidden="true">👤</span>} aria-label="Unknown user" />
      <Avatar size="large">AB</Avatar>
      <Avatar size="large">김</Avatar>
    </div>
  )
}
