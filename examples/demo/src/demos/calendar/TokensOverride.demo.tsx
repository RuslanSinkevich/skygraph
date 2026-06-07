import { Calendar } from '@skygraph/react'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Calendar has no component-scoped tokens — it is driven by the global
 * palette. Three scoped recipes — branded green, dark field, glass pick —
 * reskin one instance.
 */
export function TokensOverrideCalendar() {
  return (
    <TokenScopeCards
      minCardWidth={380}
      contentMinWidth={320}
      extra={{
        brand: { ['--sg-color-bg-hover' as never]: '#ecfdf5' },
        dark: { ['--sg-color-bg-hover' as never]: '#273449' },
        glass: {
          ['--sg-color-bg-container' as never]: 'rgba(255, 255, 255, 0.86)',
          ['--sg-color-border-secondary' as never]: 'rgba(79, 70, 229, 0.18)',
        },
      }}
      render={() => <Calendar fullscreen={false} />}
    />
  )
}
