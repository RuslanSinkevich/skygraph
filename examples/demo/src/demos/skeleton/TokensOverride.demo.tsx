import { Skeleton } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  width: '100%',
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-skeleton-bg': '#334155',
  '--sg-skeleton-shimmer': '#475569',
} as CSSProperties

export function TokensOverrideSkeleton() {
  return (
    <div style={dark}>
      <Skeleton active avatar paragraph={{ rows: 2 }} />
    </div>
  )
}
