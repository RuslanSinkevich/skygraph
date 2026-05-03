import { Tag } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    default: 'default',
    success: 'success',
    processing: 'processing',
    error: 'error',
  },
  ru: {
    default: 'обычный',
    success: 'успех',
    processing: 'в процессе',
    error: 'ошибка',
  },
} as const

/**
 * `bordered={false}` removes the outline while keeping the tinted
 * background — handy for dense lists where borders feel noisy.
 */
export function BorderlessTag() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag bordered={false}>{t.default}</Tag>
      <Tag bordered={false} color="success">{t.success}</Tag>
      <Tag bordered={false} color="processing">{t.processing}</Tag>
      <Tag bordered={false} color="error">{t.error}</Tag>
    </div>
  )
}
