import { Breadcrumb, Dropdown } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    home: 'Home',
    alpha: 'Alpha',
    projects: 'Projects ▾',
    projectAlpha: 'Project Alpha',
    projectBeta: 'Project Beta',
    projectGamma: 'Project Gamma',
  },
  ru: {
    home: 'Главная',
    alpha: 'Alpha',
    projects: 'Проекты ▾',
    projectAlpha: 'Проект Alpha',
    projectBeta: 'Проект Beta',
    projectGamma: 'Проект Gamma',
  },
} as const

/**
 * Put a Dropdown inside a `title` to open a sibling list — the
 * classic "jump to another project" pattern on deep paths.
 */
export function DropdownBreadcrumb() {
  const t = useDemoStrings(STRINGS)
  const projects = [
    { key: 'alpha', label: t.projectAlpha },
    { key: 'beta', label: t.projectBeta },
    { key: 'gamma', label: t.projectGamma },
  ]

  return (
    <Breadcrumb
      items={[
        { title: t.home, href: '#' },
        {
          title: (
            <Dropdown items={projects} trigger="click">
              <span style={{ cursor: 'pointer' }}>{t.projects}</span>
            </Dropdown>
          ),
        },
        { title: t.alpha },
      ]}
    />
  )
}
