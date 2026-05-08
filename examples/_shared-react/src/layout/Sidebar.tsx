import type { ReactNode } from 'react'

export interface SidebarSection {
  title: string
  items: readonly SidebarItem[]
}

export interface SidebarItem {
  key: string
  label: string
  disabled?: boolean
}

export interface SidebarProps {
  /**
   * Grouped sidebar items. Each section renders a tiny upper-case
   * heading followed by the items list. Pass an empty array (or
   * `null` sidebar via AppShell) when there's nothing to show.
   */
  sections?: readonly SidebarSection[]
  /** Currently-active item key (for highlighting). */
  active?: string | null
  /** Click handler — fires the item key. */
  onSelect?: (key: string) => void
  /** Empty-state message — shown when `sections` filters down to zero. */
  emptyLabel?: string
  /**
   * Free-form content. When provided, replaces the auto-generated
   * sections list — useful for custom sidebar widgets.
   */
  children?: ReactNode
}

/**
 * Contextual sidebar. Renders either:
 *   - free-form `children` (custom sidebar widgets), OR
 *   - grouped `sections` (typical components / guide nav).
 *
 * Visibility is owned by `<AppShell sidebar={...}>` — this component
 * is the inside content only.
 */
export function Sidebar({
  sections,
  active = null,
  onSelect,
  emptyLabel = 'Nothing to show',
  children,
}: SidebarProps) {
  if (children !== undefined) {
    return <>{children}</>
  }

  if (!sections || sections.length === 0) {
    return <div className="xshell-sidebar-empty">{emptyLabel}</div>
  }

  return (
    <>
      {sections.map((section) => (
        <div key={section.title} className="xshell-sidebar-section">
          <div className="xshell-sidebar-section-title">{section.title}</div>
          {section.items.map((it) => {
            const className = [
              'xshell-sidebar-item',
              active === it.key ? 'xshell-sidebar-item--active' : '',
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <a
                key={it.key}
                className={className}
                href={`#/${it.key}`}
                aria-disabled={it.disabled || undefined}
                onClick={(ev) => {
                  if (it.disabled) {
                    ev.preventDefault()
                    return
                  }
                  if (onSelect) {
                    ev.preventDefault()
                    onSelect(it.key)
                  }
                }}
              >
                {it.label}
              </a>
            )
          })}
        </div>
      ))}
    </>
  )
}
