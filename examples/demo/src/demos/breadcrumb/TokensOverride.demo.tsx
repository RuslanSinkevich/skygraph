import { Breadcrumb } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-primary': '#60a5fa',
} as CSSProperties

export function TokensOverrideBreadcrumb() {
  return (
    <div style={dark}>
      <Breadcrumb
        items={[
          { title: 'Home', href: '#' },
          { title: 'Docs', href: '#' },
          { title: 'Breadcrumb' },
        ]}
      />
    </div>
  )
}
