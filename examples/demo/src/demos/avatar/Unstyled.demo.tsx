import { Avatar } from '@skygraph/react'

/**
 * `unstyled` drops the `sg-avatar-*` classes and the inline sizing —
 * you get a plain `<span>` with the `<img>` (or icon / text) inside.
 * Size and shape are up to your own CSS.
 */
export function UnstyledAvatar() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Avatar
        unstyled
        src="https://api.dicebear.com/7.x/miniavs/svg?seed=24"
        alt="Custom"
        style={{
          display: 'inline-block',
          width: 56,
          height: 56,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 6px 16px rgba(15, 23, 42, 0.2)',
          background: '#0f172a',
        }}
      />
    </div>
  )
}
