import type { CSSProperties } from 'react'
import { Breadcrumb } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    home: 'Home',
    docs: 'Docs',
    breadcrumb: 'Breadcrumb',
  },
  ru: {
    home: 'Главная',
    docs: 'Документация',
    breadcrumb: 'Хлебные крошки',
  },
} as const

/**
 * Breadcrumb has no component-specific tokens — override the text
 * palette to restyle. `--sg-color-text-secondary` paints linked
 * segments, `--sg-color-text-tertiary` paints the separator, and
 * `--sg-color-text` + bold weight marks the current page.
 */
const scoped: CSSProperties = {
  ['--sg-color-text' as never]: '#0b1120',
  ['--sg-color-text-secondary' as never]: '#475569',
  ['--sg-color-text-tertiary' as never]: '#94a3b8',
  ['--sg-color-primary' as never]: '#db2777',
  ['--sg-font-size' as never]: '13px',
}

export function TokensOverrideBreadcrumb() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={scoped}>
      <Breadcrumb
        items={[
          { title: t.home, href: '#' },
          { title: t.docs, href: '#' },
          { title: t.breadcrumb },
        ]}
      />
    </div>
  )
}
