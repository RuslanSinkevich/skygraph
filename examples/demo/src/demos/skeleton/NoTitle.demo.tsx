import { Skeleton } from '@skygraph/react'

/**
 * Drop pieces you don't need. `title={false}` hides the heading
 * bar, `paragraph={false}` hides the lines, `avatar={false}` hides
 * the round placeholder. Great for ad-hoc shapes.
 */
export function NoTitleSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Skeleton active title={false} paragraph={{ rows: 2 }} />
      <Skeleton active paragraph={false} title={{ width: 240 }} />
      <Skeleton active avatar title={false} paragraph={{ rows: 1 }} />
    </div>
  )
}
