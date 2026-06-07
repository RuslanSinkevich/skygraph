import { Breadcrumb } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Breadcrumb has no component-specific tokens — it reads the text palette and
 * `--sg-color-primary` for link hover. Three scoped recipes — branded green,
 * dark field, glass pick — restyle the trail.
 */
const STRINGS = {
  en: { home: 'Home', docs: 'Docs', current: 'Breadcrumb' },
  ru: { home: 'Главная', docs: 'Документация', current: 'Хлебные крошки' },
} as const

export function TokensOverrideBreadcrumb() {
  const t = useDemoStrings(STRINGS)
  return (
    <TokenScopeCards
      render={() => (
        <Breadcrumb
          items={[{ title: t.home, href: '#' }, { title: t.docs, href: '#' }, { title: t.current }]}
        />
      )}
    />
  )
}
