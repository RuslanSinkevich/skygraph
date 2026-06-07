import { Empty } from '@skygraph/react'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Empty has no component-private tokens — the illustration uses
 * `--sg-color-text-disabled`, the caption uses `--sg-color-text-tertiary`.
 * Three scoped recipes — branded green, dark field, glass pick — set the mood.
 */
export function TokensOverrideEmpty() {
  return (
    <TokenScopeCards
      extra={{
        brand: { ['--sg-color-text-disabled' as never]: '#6ee7b7' },
        dark: { ['--sg-color-text-disabled' as never]: '#475569' },
        glass: { ['--sg-color-text-disabled' as never]: '#a5b4fc' },
      }}
      render={() => <Empty description="No data" />}
    />
  )
}
