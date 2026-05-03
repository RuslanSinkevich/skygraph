import { Tag } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    label: 'Custom gradient',
  },
  ru: {
    label: 'Свой градиент',
  },
} as const

/**
 * `unstyled` strips all `sg-tag-*` classes — you get just a `<span>`
 * with children and an optional close button. Style it with your
 * own classes or utility CSS.
 */
export function UnstyledTag() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Tag
        unstyled
        closable
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '2px 10px',
          borderRadius: 999,
          background: 'linear-gradient(135deg, #f472b6, #7c3aed)',
          color: '#fff',
          fontSize: 12,
        }}
      >
        {t.label}
      </Tag>
    </div>
  )
}
