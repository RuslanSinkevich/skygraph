import { Tooltip, Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * The Tooltip and its trigger Button read the global palette. Three scoped
 * recipes — branded green, dark field, glass pick — rebrand the trigger and
 * the themed surface around it. Hover the button to reveal the tip.
 */
const STRINGS = {
  en: { hint: 'Press ⌘K to search', btn: 'Hover me' },
  ru: { hint: 'Нажмите ⌘K для поиска', btn: 'Наведите' },
} as const

export function TokensOverrideTooltip() {
  const t = useDemoStrings(STRINGS)
  return (
    <TokenScopeCards
      render={() => (
        <Tooltip title={t.hint} placement="top">
          <Button type="primary">{t.btn}</Button>
        </Tooltip>
      )}
    />
  )
}
