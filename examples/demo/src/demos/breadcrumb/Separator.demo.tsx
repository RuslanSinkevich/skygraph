import { Breadcrumb } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    home: 'Home',
    projects: 'Projects',
    current: 'Current',
    root: 'Root',
    branch: 'Branch',
    leaf: 'Leaf',
    dash: 'Dash',
    docs: 'Docs',
    api: 'API',
  },
  ru: {
    home: 'Главная',
    projects: 'Проекты',
    current: 'Текущее',
    root: 'Корень',
    branch: 'Ветка',
    leaf: 'Лист',
    dash: 'Панель',
    docs: 'Документация',
    api: 'API',
  },
} as const

/**
 * `separator` is any ReactNode — a character, an icon, or a styled
 * span. The separator is rendered between, never after, the last
 * segment.
 */
export function SeparatorBreadcrumb() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Breadcrumb
        separator=">"
        items={[{ title: t.home, href: '#' }, { title: t.projects, href: '#' }, { title: t.current }]}
      />
      <Breadcrumb
        separator={<span aria-hidden="true">›</span>}
        items={[{ title: t.root }, { title: t.branch }, { title: t.leaf }]}
      />
      <Breadcrumb
        separator={<span style={{ color: 'var(--sg-color-primary)' }}>•</span>}
        items={[{ title: t.dash }, { title: t.docs }, { title: t.api }]}
      />
    </div>
  )
}
