import { useState } from 'react'
import { Breadcrumb } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    dashboard: 'Dashboard',
    projects: 'Projects',
    alpha: 'Alpha',
    overview: 'Overview',
    navigated: 'Navigated to',
  },
  ru: {
    dashboard: 'Панель',
    projects: 'Проекты',
    alpha: 'Alpha',
    overview: 'Обзор',
    navigated: 'Переход на',
  },
} as const

/**
 * `onClick` preempts navigation — even if `href` is set, the click
 * handler prevents default and runs. Use this for in-app routers
 * that want to avoid full page loads.
 */
export function OnClickBreadcrumb() {
  const t = useDemoStrings(STRINGS)
  const [history, setHistory] = useState<string[]>([])
  const visit = (page: string) => setHistory((h) => [page, ...h].slice(0, 5))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Breadcrumb
        items={[
          { title: t.dashboard, href: '#dashboard', onClick: () => visit(t.dashboard) },
          { title: t.projects, href: '#projects', onClick: () => visit(t.projects) },
          { title: t.alpha, href: '#alpha', onClick: () => visit(t.alpha) },
          { title: t.overview },
        ]}
      />
      <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        {history.map((h, i) => <li key={i}>{t.navigated} {h}</li>)}
      </ul>
    </div>
  )
}
