import { Skeleton } from '@skygraph/react'

/**
 * Control the paragraph block with `{ rows, width }`. Match the
 * expected content size — too few lines feel off when the real
 * paragraph is a wall of text, too many look spammy.
 */
export function RowsSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Skeleton active paragraph={{ rows: 2 }} />
      <Skeleton active paragraph={{ rows: 5 }} />
      <Skeleton active paragraph={{ rows: 4, width: ['100%', '90%', '80%', '40%'] }} />
    </div>
  )
}
