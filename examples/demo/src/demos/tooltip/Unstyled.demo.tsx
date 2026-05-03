import { Tooltip, Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    tip: 'Fully custom look',
    button: 'Hover me',
  },
  ru: {
    tip: 'Полностью свой вид',
    button: 'Наведите курсор',
  },
} as const

/**
 * `unstyled` drops all `sg-tooltip-*` classes. You keep the hover
 * behaviour, `role="tooltip"`, and `aria-describedby` wiring — you
 * own the painting with your own className.
 */
export function UnstyledTooltip() {
  const t = useDemoStrings(STRINGS)
  return (
    <Tooltip
      unstyled
      title={
        <div
          style={{
            background: '#0f172a',
            color: '#e2e8f0',
            padding: '6px 10px',
            borderRadius: 6,
            fontSize: 12,
            whiteSpace: 'nowrap',
            marginTop: 8,
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            display: 'inline-block',
          }}
        >
          {t.tip}
        </div>
      }
    >
      <Button>{t.button}</Button>
    </Tooltip>
  )
}
