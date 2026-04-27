import { Breadcrumb } from '@skygraph/react'

/**
 * `title` is a full ReactNode — combine icons with text to help
 * people spot the level at a glance. Keep icons aria-hidden so
 * screen readers only announce the text label.
 */
const icon = (glyph: string) => (
  <span aria-hidden="true" style={{ marginRight: 4 }}>{glyph}</span>
)

export function WithIconsBreadcrumb() {
  return (
    <Breadcrumb
      items={[
        { title: (<>{icon('🏠')}Home</>), href: '#' },
        { title: (<>{icon('📁')}Projects</>), href: '#' },
        { title: (<>{icon('📄')}README.md</>) },
      ]}
    />
  )
}
