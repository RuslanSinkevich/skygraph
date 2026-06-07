import { Collapse } from '@skygraph/react'
import { sampleItems } from './data'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Collapse reads the global surface palette (`--sg-color-bg-container`,
 * `--sg-color-bg-secondary`, `--sg-color-bg-hover`) and border tokens. Three
 * scoped recipes — branded green, dark field, glass pick — reskin the panels.
 */
export function TokensOverrideCollapse() {
  return (
    <TokenScopeCards
      minCardWidth={360}
      extra={{
        brand: { ['--sg-color-bg-secondary' as never]: '#ecfdf5' },
        dark: {
          ['--sg-color-bg-secondary' as never]: '#1e293b',
          ['--sg-color-border-secondary' as never]: '#475569',
        },
        glass: {
          ['--sg-color-bg-container' as never]: 'rgba(255, 255, 255, 0.72)',
          ['--sg-color-bg-secondary' as never]: 'rgba(255, 255, 255, 0.52)',
          ['--sg-color-border-secondary' as never]: 'rgba(79, 70, 229, 0.18)',
        },
      }}
      render={() => <Collapse items={sampleItems} defaultActiveKey={['1']} />}
    />
  )
}
