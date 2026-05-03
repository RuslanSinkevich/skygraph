import { Tag } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    verified: 'Verified',
    syncing: 'Syncing…',
    review: 'Review',
    failed: 'Failed',
  },
  ru: {
    verified: 'Подтверждено',
    syncing: 'Синхронизация…',
    review: 'На проверке',
    failed: 'Ошибка',
  },
} as const

/**
 * Tag's `children` is a `ReactNode` — drop an icon + text combo for
 * a status pill. The gap between inline children is already 4px.
 */
export function WithIconTag() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag color="success">
        <span aria-hidden="true">✓</span> {t.verified}
      </Tag>
      <Tag color="processing">
        <span aria-hidden="true">⟳</span> {t.syncing}
      </Tag>
      <Tag color="warning">
        <span aria-hidden="true">⚠</span> {t.review}
      </Tag>
      <Tag color="error">
        <span aria-hidden="true">✕</span> {t.failed}
      </Tag>
    </div>
  )
}
