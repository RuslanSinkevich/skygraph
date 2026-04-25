import type { ReactNode } from 'react'

export interface ComponentDocProps {
  title: string
  description: string
  /** Small badge next to the title (e.g. category). */
  badge?: string
  /** Optional sub-nav breadcrumb like "Data Display / Table". */
  crumbs?: string[]
  whenToUse?: string[]
  /** Extra row below "When To Use" (e.g. tokens hint, links). */
  notes?: ReactNode
  children: ReactNode
}

export function ComponentDoc({
  title,
  description,
  badge,
  crumbs,
  whenToUse,
  notes,
  children,
}: ComponentDocProps) {
  return (
    <section className="doc-page">
      {crumbs && crumbs.length > 0 && (
        <div className="doc-crumbs">
          {crumbs.map((c, i) => (
            <span key={i} className="doc-crumb">
              {c}
              {i < crumbs.length - 1 && <span className="doc-crumb-sep">/</span>}
            </span>
          ))}
        </div>
      )}

      <header className="doc-header">
        <h1 className="doc-component-title">
          {title}
          {badge && <span className="doc-badge">{badge}</span>}
        </h1>
        <p className="doc-lead">{description}</p>
      </header>

      {whenToUse && whenToUse.length > 0 && (
        <div className="doc-when-to-use">
          <h2>When To Use</h2>
          <ul>
            {whenToUse.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {notes && <div className="doc-notes">{notes}</div>}

      <h2>Examples</h2>
      <div className="doc-demos">{children}</div>
    </section>
  )
}
