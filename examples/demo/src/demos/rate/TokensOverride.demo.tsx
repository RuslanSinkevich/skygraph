import { Rate } from '@skygraph/react'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Rate owns one dedicated token, `--sg-color-star`, for the filled symbol; the
 * empty colour comes from `--sg-color-border`. Three scoped recipes — branded
 * green, dark field, glass pick — recolour the stars.
 */
export function TokensOverrideRate() {
  return (
    <TokenScopeCards
      extra={{
        brand: { ['--sg-color-star' as never]: '#059669' },
        dark: { ['--sg-color-star' as never]: '#60a5fa' },
        glass: { ['--sg-color-star' as never]: '#6366f1' },
      }}
      render={() => <Rate defaultValue={3.5} allowHalf />}
    />
  )
}
