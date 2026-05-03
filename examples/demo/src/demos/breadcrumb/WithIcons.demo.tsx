import { Breadcrumb } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    home: 'Home',
    projects: 'Projects',
  },
  ru: {
    home: 'Главная',
    projects: 'Проекты',
  },
} as const

/**
 * `title` is a full ReactNode — combine icons with text to help
 * people spot the level at a glance. Keep icons aria-hidden so
 * screen readers only announce the text label.
 */
const icon = (glyph: string) => (
  <span aria-hidden="true" style={{ marginRight: 4 }}>{glyph}</span>
)

export function WithIconsBreadcrumb() {
  const t = useDemoStrings(STRINGS)
  return (
    <Breadcrumb
      items={[
        { title: (<>{icon('🏠')}{t.home}</>), href: '#' },
        { title: (<>{icon('📁')}{t.projects}</>), href: '#' },
        { title: (<>{icon('📄')}README.md</>) },
      ]}
    />
  )
}
