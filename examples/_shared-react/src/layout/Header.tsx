import type { ReactNode } from 'react'
import { useAppShell } from './AppShell'

export interface NavItem {
  /** Stable key — also used to test `active` equality. */
  key: string
  /** Visible label. */
  label: string
  /**
   * Optional href. When set, the link opens in the current tab
   * (use `external` for `target="_blank"`). When omitted, the
   * `onSelect(key)` callback fires instead.
   */
  href?: string
  /** Render as external link (target=_blank + ↗ marker). */
  external?: boolean
}

export interface HeaderProps {
  /** Brand name shown next to the logo mark. */
  brand: string
  /** Top-level navigation items. */
  items: readonly NavItem[]
  /** Currently-active item key (for highlighting). */
  active?: string | null
  /** Click handler for non-external items. */
  onSelect?: (key: string) => void
  /** Click handler for the brand logo (typically navigates home). */
  onBrandClick?: () => void
  /** Optional search input value. */
  searchValue?: string
  onSearchChange?: (value: string) => void
  /** Search placeholder ("Search components..."). */
  searchPlaceholder?: string
  /** Search aria-label. */
  searchAriaLabel?: string
  /** Aria-label for the mobile burger button. */
  burgerAriaLabel?: string
  /**
   * Right-aligned extras (theme switcher, GitHub link, ...). Rendered
   * inside `.xshell-header-extras`.
   */
  extras?: ReactNode
}

/**
 * Top app bar — sticky, 56px tall, single-pixel bottom border. Holds
 * the brand mark, a horizontal nav row, an optional search input and a
 * slot for app-specific extras (theme switcher, GitHub link, etc.).
 *
 * On ≤1024px the nav row is replaced by a burger button that toggles
 * the AppShell's sidebar drawer.
 */
export function Header({
  brand,
  items,
  active = null,
  onSelect,
  onBrandClick,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  searchAriaLabel,
  burgerAriaLabel = 'Open navigation',
  extras,
}: HeaderProps) {
  const shell = useAppShell()

  return (
    <header className="xshell-header" role="banner">
      <button
        type="button"
        className="xshell-header-burger"
        onClick={() => shell?.openSidebar()}
        aria-label={burgerAriaLabel}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M2 4h14M2 9h14M2 14h14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <button
        type="button"
        className="xshell-logo"
        onClick={onBrandClick}
        aria-label={brand}
      >
        <span className="xshell-logo-mark" aria-hidden="true" />
        {brand}
      </button>

      <nav className="xshell-nav" aria-label="Primary">
        {items.map((it) => {
          const className = [
            'xshell-nav-item',
            active === it.key ? 'xshell-nav-item--active' : '',
            it.external ? 'xshell-nav-item-external' : '',
          ]
            .filter(Boolean)
            .join(' ')

          if (it.href && it.external) {
            return (
              <a
                key={it.key}
                href={it.href}
                className={className}
                target="_blank"
                rel="noreferrer noopener"
              >
                {it.label}
              </a>
            )
          }

          if (it.href) {
            return (
              <a
                key={it.key}
                href={it.href}
                className={className}
                onClick={(ev) => {
                  if (onSelect) {
                    ev.preventDefault()
                    onSelect(it.key)
                  }
                }}
              >
                {it.label}
              </a>
            )
          }

          return (
            <button
              key={it.key}
              type="button"
              className={className}
              onClick={() => onSelect?.(it.key)}
            >
              {it.label}
            </button>
          )
        })}
      </nav>

      <div className="xshell-header-spacer" />

      {onSearchChange && (
        <div className="xshell-search">
          <svg
            className="xshell-search-icon"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="6"
              cy="6"
              r="4.25"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M9 9l3 3"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="search"
            value={searchValue ?? ''}
            onChange={(ev) => onSearchChange(ev.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchAriaLabel ?? searchPlaceholder}
          />
        </div>
      )}

      {extras && <div className="xshell-header-extras">{extras}</div>}
    </header>
  )
}
