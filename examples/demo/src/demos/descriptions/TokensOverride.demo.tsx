import { Descriptions } from '@skygraph/react'
import { userItems } from './data'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Descriptions reads `--sg-color-bg-secondary` (label column),
 * `--sg-color-border-secondary` (dividers) and `--sg-border-radius`. Three
 * scoped recipes — branded green, dark field, glass pick — reskin the table.
 */
export function TokensOverrideDescriptions() {
  return (
    <TokenScopeCards
      extra={{
        brand: { ['--sg-color-bg-secondary' as never]: '#d1fae5' },
        dark: { ['--sg-color-bg-secondary' as never]: '#1e293b' },
        glass: { ['--sg-color-bg-secondary' as never]: 'rgba(99, 102, 241, 0.12)' },
      }}
      render={() => <Descriptions bordered items={userItems} />}
    />
  )
}
