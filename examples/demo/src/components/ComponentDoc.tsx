import type { ReactNode } from 'react'

export interface ComponentDocProps {
  title: string
  description: string
  whenToUse?: string[]
  children: ReactNode
}

export function ComponentDoc({ title, description, whenToUse, children }: ComponentDocProps) {
  return (
    <section className="doc-page">
      <h1 className="doc-component-title">{title}</h1>
      <p className="doc-lead">{description}</p>

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

      <h2>Examples</h2>
      <div className="doc-demos">{children}</div>
    </section>
  )
}
