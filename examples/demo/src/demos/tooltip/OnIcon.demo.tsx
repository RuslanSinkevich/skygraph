import { Tooltip } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    label: 'Brand score',
    tooltip: 'Weighted average of NPS, reviews, and social sentiment (0–100).',
    aria: 'More info about brand score',
  },
  ru: {
    label: 'Оценка бренда',
    tooltip: 'Взвешенное среднее NPS, отзывов и социальных сигналов (0–100).',
    aria: 'Подробнее об оценке бренда',
  },
} as const

/**
 * Classic "info icon" pattern: a small glyph with a Tooltip for the
 * extra context. Give the icon `tabIndex={0}` so keyboard users can
 * focus it and read the tip too.
 */
export function OnIconTooltip() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <label style={{ fontWeight: 500 }}>{t.label}</label>
      <Tooltip title={t.tooltip}>
        <span
          tabIndex={0}
          aria-label={t.aria}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: 'var(--sg-color-bg-container-disabled, #e5e7eb)',
            color: 'var(--sg-color-text-secondary, #4b5563)',
            fontSize: 12,
            cursor: 'help',
            userSelect: 'none',
          }}
        >
          ?
        </span>
      </Tooltip>
    </div>
  )
}
