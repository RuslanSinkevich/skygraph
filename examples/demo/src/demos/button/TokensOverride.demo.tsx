import { Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Button reads the global `--sg-color-primary*` palette plus its own
 * `--sg-btn-*` paint tokens. Three scoped recipes — branded green, dark field
 * and frosted glass — reskin the same Button; hover / focus / disabled
 * behaviour stays intact.
 */
const STRINGS = {
  en: { primary: 'Get started', secondary: 'Learn more' },
  ru: { primary: 'Начать', secondary: 'Подробнее' },
} as const

export function TokensOverrideButton() {
  const t = useDemoStrings(STRINGS)
  return (
    <TokenScopeCards
      extra={{
        brand: { ['--sg-btn-border' as never]: '#6ee7b7' },
        dark: { ['--sg-btn-border' as never]: '#1e293b' },
        glass: {
          ['--sg-btn-bg' as never]: 'rgba(255, 255, 255, 0.6)',
          ['--sg-btn-border' as never]: 'rgba(15, 23, 42, 0.08)',
        },
      }}
      render={() => (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button type="primary">{t.primary}</Button>
          <Button>{t.secondary}</Button>
        </div>
      )}
    />
  )
}
