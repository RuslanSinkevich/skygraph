import { Skeleton } from '@skygraph/react'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Skeleton reads `--sg-skeleton-bg` and `--sg-skeleton-shimmer` for the sweep.
 * Three scoped recipes — branded green, dark field, glass pick — recolour the
 * placeholders.
 */
export function TokensOverrideSkeleton() {
  return (
    <TokenScopeCards
      extra={{
        brand: {
          ['--sg-skeleton-bg' as never]: '#a7f3d0',
          ['--sg-skeleton-shimmer' as never]: '#d1fae5',
        },
        dark: {
          ['--sg-skeleton-bg' as never]: 'rgba(148, 163, 184, 0.18)',
          ['--sg-skeleton-shimmer' as never]: 'rgba(226, 232, 240, 0.45)',
        },
        glass: {
          ['--sg-skeleton-bg' as never]: 'rgba(99, 102, 241, 0.18)',
          ['--sg-skeleton-shimmer' as never]: 'rgba(199, 210, 254, 0.6)',
        },
      }}
      render={() => <Skeleton active avatar paragraph={{ rows: 2 }} />}
    />
  )
}
