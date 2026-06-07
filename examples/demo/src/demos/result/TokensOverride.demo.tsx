import { Result, Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Result has no component-private tokens — icon tints read
 * `--sg-color-success/primary`, the body panel reads
 * `--sg-color-bg-secondary`. Three scoped recipes — branded green, dark field,
 * glass pick — rebrand it.
 */
const STRINGS = {
  en: { title: 'All good', subtitle: 'Scoped via tokens', cta: 'Continue' },
  ru: { title: 'Всё готово', subtitle: 'Скоуп через токены', cta: 'Продолжить' },
} as const

export function TokensOverrideResult() {
  const t = useDemoStrings(STRINGS)
  return (
    <TokenScopeCards
      extra={{
        brand: { ['--sg-color-success' as never]: '#059669' },
        dark: { ['--sg-color-success' as never]: '#34d399' },
        glass: { ['--sg-color-success' as never]: '#6366f1' },
      }}
      render={() => (
        <Result
          status="success"
          title={t.title}
          subTitle={t.subtitle}
          extra={<Button type="primary">{t.cta}</Button>}
        />
      )}
    />
  )
}
