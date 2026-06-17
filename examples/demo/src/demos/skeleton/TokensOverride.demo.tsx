import { Skeleton } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-skeleton-bg': 'rgba(148, 163, 184, 0.18)',
  '--sg-skeleton-shimmer': 'rgba(226, 232, 240, 0.45)',
} as CSSProperties

export function TokensOverrideSkeleton() {
  return (
    <div style={dark}>
      <Skeleton active avatar paragraph={{ rows: 2 }} />
    </div>
  )
}
