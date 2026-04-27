import type { CSSProperties } from 'react'
import { Skeleton } from '@skygraph/react'

/**
 * Skeleton reads `--sg-color-bg-hover` for the placeholder fill
 * and `--sg-color-bg-secondary` for the animation highlight.
 * Scope both on a wrapper for a bespoke palette (dark example).
 */
const scoped: CSSProperties = {
  ['--sg-color-bg-hover' as never]: 'rgba(124, 58, 237, 0.18)',
  ['--sg-color-bg-secondary' as never]: 'rgba(124, 58, 237, 0.32)',
  ['--sg-border-radius-sm' as never]: '6px',
  padding: 16,
  background: '#0f172a',
  borderRadius: 12,
}

export function TokensOverrideSkeleton() {
  return (
    <div style={scoped}>
      <Skeleton active avatar paragraph={{ rows: 3 }} />
    </div>
  )
}
