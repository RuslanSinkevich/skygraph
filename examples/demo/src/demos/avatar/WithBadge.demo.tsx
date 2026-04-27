import { Avatar, Badge } from '@skygraph/react'

/**
 * Wrap an Avatar in a Badge to pin presence / notification dots. The
 * Badge's `offset` nudges the dot inside the circular edge so it
 * doesn't float off the glyph.
 */
export function WithBadgeAvatar() {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Badge dot color="var(--sg-color-success)" offset={[-4, 4]}>
        <Avatar size="large" src="https://api.dicebear.com/7.x/miniavs/svg?seed=9" alt="Alice" />
      </Badge>
      <Badge count={4} offset={[-4, 4]}>
        <Avatar size="large" src="https://api.dicebear.com/7.x/miniavs/svg?seed=10" alt="Bob" />
      </Badge>
      <Badge dot color="var(--sg-color-warning)" offset={[-4, 4]}>
        <Avatar size="large">CD</Avatar>
      </Badge>
    </div>
  )
}
