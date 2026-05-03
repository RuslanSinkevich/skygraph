import { Tag } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    default: 'default',
    success: 'success',
    processing: 'processing',
    warning: 'warning',
    error: 'error',
  },
  ru: {
    default: 'обычный',
    success: 'успех',
    processing: 'в процессе',
    warning: 'предупреждение',
    error: 'ошибка',
  },
} as const

/**
 * Five semantic presets map directly to palette tokens:
 * `success`, `error`, `warning`, `processing`, and `default`. These
 * are the *only* strings that resolve to tokens — anything else is
 * treated as a raw CSS colour (see Custom demo).
 */
export function PresetsTag() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag color="default">{t.default}</Tag>
      <Tag color="success">{t.success}</Tag>
      <Tag color="processing">{t.processing}</Tag>
      <Tag color="warning">{t.warning}</Tag>
      <Tag color="error">{t.error}</Tag>
    </div>
  )
}
