import { Checkbox } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Checkbox exposes `--sg-checkbox-*` paint tokens on top of the globals. Three
 * scoped recipes — branded green, dark field, glass pick — recolour the box.
 */
const STRINGS = {
  en: { emails: 'Receive emails', remember: 'Remember me' },
  ru: { emails: 'Получать письма', remember: 'Запомнить меня' },
} as const

export function TokensOverrideCheckbox() {
  const t = useDemoStrings(STRINGS)
  return (
    <TokenScopeCards
      extra={{
        brand: {
          ['--sg-checkbox-bg-checked' as never]: '#059669',
          ['--sg-checkbox-border-hover' as never]: '#059669',
        },
        dark: {
          ['--sg-checkbox-bg-checked' as never]: '#60a5fa',
          ['--sg-checkbox-border-hover' as never]: '#60a5fa',
        },
        glass: {
          ['--sg-checkbox-bg-checked' as never]: '#6366f1',
          ['--sg-checkbox-border-hover' as never]: '#6366f1',
        },
      }}
      render={() => (
        <div style={{ display: 'grid', gap: 6 }}>
          <Checkbox defaultChecked>{t.emails}</Checkbox>
          <Checkbox>{t.remember}</Checkbox>
        </div>
      )}
    />
  )
}
