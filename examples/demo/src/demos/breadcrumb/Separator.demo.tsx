import { Breadcrumb } from '@skygraph/react'

/**
 * `separator` is any ReactNode — a character, an icon, or a styled
 * span. The separator is rendered between, never after, the last
 * segment.
 */
export function SeparatorBreadcrumb() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Breadcrumb
        separator=">"
        items={[{ title: 'Home', href: '#' }, { title: 'Projects', href: '#' }, { title: 'Current' }]}
      />
      <Breadcrumb
        separator={<span aria-hidden="true">›</span>}
        items={[{ title: 'Root' }, { title: 'Branch' }, { title: 'Leaf' }]}
      />
      <Breadcrumb
        separator={<span style={{ color: 'var(--sg-color-primary)' }}>•</span>}
        items={[{ title: 'Dash' }, { title: 'Docs' }, { title: 'API' }]}
      />
    </div>
  )
}
