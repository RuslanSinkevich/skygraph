import type { CSSProperties } from 'react'
import { Tooltip, Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    brandTip: 'Brand-coloured tooltip',
    brandButton: 'Brand tip',
    rounderTip: 'Rounder corners here too',
    bottom: 'Bottom',
  },
  ru: {
    brandTip: 'Подсказка в цветах бренда',
    brandButton: 'Брендовая подсказка',
    rounderTip: 'Скруглённые углы и здесь',
    bottom: 'Снизу',
  },
} as const

/**
 * Tooltip ships with dedicated tokens: `--sg-color-tooltip-bg` and
 * `--sg-color-tooltip-text`. Override them on a wrapper to swap the
 * tip's look without touching the global theme.
 */
const scoped: CSSProperties = {
  ['--sg-color-tooltip-bg' as never]: '#7c3aed',
  ['--sg-color-tooltip-text' as never]: '#faf5ff',
  ['--sg-border-radius-sm' as never]: '8px',
}

export function TokensOverrideTooltip() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ ...scoped, display: 'flex', gap: 12 }}>
      <Tooltip title={t.brandTip}>
        <Button>{t.brandButton}</Button>
      </Tooltip>
      <Tooltip title={t.rounderTip} placement="bottom">
        <Button>{t.bottom}</Button>
      </Tooltip>
    </div>
  )
}
