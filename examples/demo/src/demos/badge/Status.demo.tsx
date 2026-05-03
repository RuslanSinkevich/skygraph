import { Badge } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    processing: 'Processing',
    default: 'Default',
  },
  ru: {
    success: 'Успех',
    error: 'Ошибка',
    warning: 'Предупреждение',
    processing: 'В процессе',
    default: 'По умолчанию',
  },
} as const

/**
 * When Badge has no children but gets a `status`, it renders a
 * standalone dot + label row. `processing` pulses with a keyframe
 * animation to hint "currently active".
 */
export function StatusBadge() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Badge status="success" text={t.success} />
      <Badge status="error" text={t.error} />
      <Badge status="warning" text={t.warning} />
      <Badge status="processing" text={t.processing} />
      <Badge status="default" text={t.default} />
    </div>
  )
}
