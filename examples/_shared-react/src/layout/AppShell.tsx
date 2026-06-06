import { useEffect, useState, type ReactNode } from 'react'

export type AppShellSection =
  | 'components'
  | 'showcases'
  | 'guide'
  | 'tokens'
  | 'changelog'
  | 'about'
  | 'landing'
  | null

export interface AppShellProps {
  /**
   * Logical app section. Drives sidebar visibility (sections that don't
   * benefit from contextual nav — `landing`, `changelog`, `about`,
   * `showcases` — render full-width).
   */
  section: AppShellSection
  /**
   * Header content. Render <Header /> here so the consumer can pass
   * app-specific nav items + extras (theme/lang/search).
   */
  header: ReactNode
  /**
   * Sidebar content. Pass `null` to skip the sidebar entirely (full-width
   * pages like Landing or Roadmap). The sidebar is sticky on desktop and
   * slides in as a drawer on ≤1024px.
   */
  sidebar?: ReactNode
  /**
   * Footer content. Pass `null` to skip (e.g. when a showcase wants the
   * full viewport).
   */
  footer?: ReactNode
  /** Page content. */
  children: ReactNode
  /**
   * Drop the default content padding. Useful for pages that already
   * provide their own outer wrapper (Landing hero) or showcases that
   * fill the viewport.
   */
  flush?: boolean
}

/**
 * Top-level layout shell shared by `examples/demo` and
 * `examples/showcases`. Provides the sticky header, contextual sidebar
 * gutter and footer; the consumer fills `children` with the route's
 * page.
 */
export function AppShell({
  section,
  header,
  sidebar,
  footer,
  children,
  flush = false,
}: AppShellProps) {
  const hasSidebar = sidebar !== null && sidebar !== undefined && sidebar !== false
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!sidebarOpen) return
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') setSidebarOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sidebarOpen])

  // Close drawer when section changes (route change).
  useEffect(() => {
    setSidebarOpen(false)
  }, [section])

  const className = [
    'xshell',
    `xshell--section-${section ?? 'none'}`,
    hasSidebar ? '' : 'xshell--no-sidebar',
    sidebarOpen ? 'xshell--sidebar-open' : '',
    flush ? 'xshell--flush' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className} data-section={section ?? 'none'}>
      <AppShellContext.Provider value={{ openSidebar: () => setSidebarOpen(true) }}>
        {header}
      </AppShellContext.Provider>
      <div className="xshell-body">
        {hasSidebar && (
          <>
            <aside className="xshell-sidebar" aria-label="Section navigation">
              {sidebar}
            </aside>
            <div
              className="xshell-sidebar-backdrop"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
          </>
        )}
        <main className="xshell-main">
          <div className="xshell-main-inner">{children}</div>
        </main>
      </div>
      {footer}
    </div>
  )
}

import { createContext, useContext } from 'react'

interface AppShellContextValue {
  openSidebar: () => void
}

const AppShellContext = createContext<AppShellContextValue | null>(null)

/**
 * Hook used by `<Header>` to open the mobile sidebar drawer when the
 * burger button is tapped. Returns `null` when used outside the shell
 * — callers should silently no-op (Header guards with `?.()`).
 */
export function useAppShell(): AppShellContextValue | null {
  return useContext(AppShellContext)
}
