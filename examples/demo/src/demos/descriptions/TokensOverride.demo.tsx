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
      minCardWidth={420}
      contentMinWidth={360}
      stack
      extra={{
        brand: { ['--sg-color-bg-secondary' as never]: '#ecfdf5' },
        dark: {
          ['--sg-color-bg-secondary' as never]: '#1e293b',
          ['--sg-color-border-secondary' as never]: '#475569',
        },
        glass: {
          ['--sg-color-bg-secondary' as never]: 'rgba(255, 255, 255, 0.58)',
          ['--sg-color-border-secondary' as never]: 'rgba(79, 70, 229, 0.22)',
        },
      }}
      render={() => <Descriptions bordered items={userItems} />}
    />
  )
}
