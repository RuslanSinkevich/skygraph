import { useState } from 'react'
import { Breadcrumb } from '@skygraph/react'

/**
 * `onClick` preempts navigation — even if `href` is set, the click
 * handler prevents default and runs. Use this for in-app routers
 * that want to avoid full page loads.
 */
export function OnClickBreadcrumb() {
  const [history, setHistory] = useState<string[]>([])
  const visit = (page: string) => setHistory((h) => [page, ...h].slice(0, 5))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Breadcrumb
        items={[
          { title: 'Dashboard', href: '#dashboard', onClick: () => visit('Dashboard') },
          { title: 'Projects', href: '#projects', onClick: () => visit('Projects') },
          { title: 'Alpha', href: '#alpha', onClick: () => visit('Alpha') },
          { title: 'Overview' },
        ]}
      />
      <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        {history.map((h, i) => <li key={i}>Navigated to {h}</li>)}
      </ul>
    </div>
  )
}
