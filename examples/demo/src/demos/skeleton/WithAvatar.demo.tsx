import { Skeleton } from '@skygraph/react'

/**
 * `avatar` prepends a round placeholder — matches the classic
 * profile card / feed item shape. Pass `{ size, shape }` for
 * tuning.
 */
export function WithAvatarSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Skeleton avatar active />
      <Skeleton active avatar={{ shape: 'square', size: 64 }} />
      <Skeleton active avatar={{ shape: 'circle', size: 56 }} title={{ width: 180 }} paragraph={{ rows: 2 }} />
    </div>
  )
}
