import { Tooltip, Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    commit: 'Commit',
    commitDesc: 'Saves the current state to the history — press ⌘⏎ to commit quickly.',
    hoverDetails: 'Hover for details',
    networkOnline: 'Network: online',
    iconText: 'Icon + text',
  },
  ru: {
    commit: 'Коммит',
    commitDesc: 'Сохраняет текущее состояние в историю — нажмите ⌘⏎ для быстрого коммита.',
    hoverDetails: 'Наведите для деталей',
    networkOnline: 'Сеть: онлайн',
    iconText: 'Иконка + текст',
  },
} as const

/**
 * `title` is a full ReactNode — drop a heading + description + link
 * combo. The content box uses `white-space: nowrap`, so wrap wide
 * content in a sized `<div>` as below.
 */
export function RichContentTooltip() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Tooltip
        title={
          <div style={{ maxWidth: 220, whiteSpace: 'normal', lineHeight: 1.45 }}>
            <strong style={{ display: 'block', marginBottom: 4 }}>{t.commit}</strong>
            <span style={{ fontSize: 12, opacity: 0.85 }}>
              {t.commitDesc}
            </span>
          </div>
        }
      >
        <Button>{t.hoverDetails}</Button>
      </Tooltip>
      <Tooltip
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span aria-hidden="true">⚡</span>
            {t.networkOnline}
          </div>
        }
      >
        <Button>{t.iconText}</Button>
      </Tooltip>
    </div>
  )
}
