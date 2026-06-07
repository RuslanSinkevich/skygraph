import { Steps } from '@skygraph/react'
import { basicSteps } from './data'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Finished / process steps pull `--sg-color-primary` for the fill and tail.
 * Three scoped recipes — branded green, dark field, glass pick — rebrand the
 * whole wizard.
 */
export function TokensOverrideSteps() {
  return (
    <TokenScopeCards
      minCardWidth={420}
      extra={{
        brand: { ['--sg-color-border-secondary' as never]: '#a7f3d0' },
        dark: {
          ['--sg-color-border' as never]: '#64748b',
          ['--sg-color-border-secondary' as never]: '#475569',
        },
        glass: { ['--sg-color-border-secondary' as never]: 'rgba(79, 70, 229, 0.24)' },
      }}
      render={() => <Steps current={1} items={basicSteps} direction="vertical" />}
    />
  )
}
