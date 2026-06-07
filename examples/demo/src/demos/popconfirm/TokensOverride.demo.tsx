import { Popconfirm, Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Popconfirm has no component-specific tokens — it composes the surface
 * globals plus the primary palette for the confirm button. Three scoped
 * recipes — branded green, dark field, glass pick — reskin the trigger and
 * popup.
 */
const STRINGS = {
  en: { title: 'Reset preferences?', ok: 'Reset', button: 'Reset' },
  ru: { title: 'Сбросить настройки?', ok: 'Сбросить', button: 'Сбросить' },
} as const

export function TokensOverridePopconfirm() {
  const t = useDemoStrings(STRINGS)
  return (
    <TokenScopeCards
      render={() => (
        <Popconfirm title={t.title} okText={t.ok}>
          <Button>{t.button}</Button>
        </Popconfirm>
      )}
    />
  )
}
