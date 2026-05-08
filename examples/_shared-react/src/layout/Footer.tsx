import type { ReactNode } from 'react'

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterColumn {
  title: string
  links: readonly FooterLink[]
}

export interface FooterProps {
  /** Four-column area at the top (Documentation / Resources / Community / Project). */
  columns: readonly FooterColumn[]
  /** Bottom-strip copyright line ("© 2026 SkyGraph"). */
  copyright: string
  /** Bottom-strip version badge ("v0.5.0"). */
  version?: string
  /** Bottom-strip extras (theme switcher, language switcher). */
  extras?: ReactNode
  /** Click handler for non-external links (intra-app navigation). */
  onSelect?: (href: string) => void
}

/**
 * Bottom site footer — four-column link grid plus a 40px-tall bottom
 * strip with copyright, version badge and bottom-strip extras
 * (typically <ThemeSwitcher /> + <LanguageSwitcher />).
 *
 * Internal links (those whose `href` starts with `#/`) fire the
 * `onSelect(href)` callback so the host app can intercept hash-based
 * navigation; external links open in a new tab.
 */
export function Footer({
  columns,
  copyright,
  version,
  extras,
  onSelect,
}: FooterProps) {
  return (
    <footer className="xshell-footer" role="contentinfo">
      <div className="xshell-footer-inner">
        {columns.map((col) => (
          <div key={col.title} className="xshell-footer-col">
            <div className="xshell-footer-col-title">{col.title}</div>
            <ul>
              {col.links.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noreferrer noopener">
                      {link.label}
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(ev) => {
                        if (onSelect) {
                          ev.preventDefault()
                          onSelect(link.href)
                        }
                      }}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="xshell-footer-bottom">
        <span>{copyright}</span>
        {version && <span className="xshell-footer-version">{version}</span>}
        <div className="xshell-footer-spacer" />
        {extras}
      </div>
    </footer>
  )
}
