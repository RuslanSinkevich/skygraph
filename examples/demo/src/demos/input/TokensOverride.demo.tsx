import { Input } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Input exposes its own `--sg-input-*` tokens on top of the globals. Each card
 * scopes a different subset — branded green, dark field and frosted glass —
 * reshaping only the paint while the focus ring, disabled and validation states
 * keep their semantic behaviour.
 */
const STRINGS = {
  en: { placeholder: 'Search anything…' },
  ru: { placeholder: 'Поиск чего угодно…' },
} as const

export function TokensOverrideInput() {
  const t = useDemoStrings(STRINGS)
  return (
    <TokenScopeCards
      extra={{
        brand: { ['--sg-input-border' as never]: '#6ee7b7' },
        dark: {
          ['--sg-input-bg' as never]: '#0f172a',
          ['--sg-input-color' as never]: '#e2e8f0',
          ['--sg-input-border' as never]: '#1e293b',
        },
        glass: {
          ['--sg-input-bg' as never]: 'rgba(255, 255, 255, 0.55)',
          ['--sg-input-border' as never]: 'rgba(15, 23, 42, 0.08)',
          ['--sg-input-radius' as never]: '12px',
        },
      }}
      render={() => <Input placeholder={t.placeholder} />}
    />
  )
}
