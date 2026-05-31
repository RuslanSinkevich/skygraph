import type { CSSProperties } from 'react'
import { Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

/**
 * Two ready-to-use Button themes built purely from component tokens
 * (`--sg-btn-*`). Scope them on any wrapper — hover / focus / disabled
 * behaviour stays intact because only the paint tokens change.
 */
const STRINGS = {
  en: {
    emeraldLabel: 'Emerald · pill',
    sunsetLabel: 'Sunset · sharp',
    primary: 'Primary',
    secondary: 'Secondary',
    dashed: 'Dashed',
  },
  ru: {
    emeraldLabel: 'Изумруд · pill',
    sunsetLabel: 'Закат · острый',
    primary: 'Основная',
    secondary: 'Вторичная',
    dashed: 'Пунктир',
  },
} as const

const cardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  padding: 20,
  borderRadius: 16,
  flex: '1 1 240px',
}

const labelStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
}

const rowStyle: CSSProperties = { display: 'flex', gap: 10, flexWrap: 'wrap' }

// Emerald: rounded pill, mint surface, deep-green primary.
const emeraldScope: CSSProperties = {
  ['--sg-btn-radius' as never]: '999px',
  ['--sg-btn-height' as never]: '40px',
  ['--sg-btn-padding' as never]: '0 20px',
  ['--sg-btn-font-size' as never]: '14px',
  ['--sg-btn-bg' as never]: '#059669',
  ['--sg-btn-color' as never]: '#ffffff',
  ['--sg-btn-border' as never]: '#059669',
  ...cardStyle,
  background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
  border: '1px solid #a7f3d0',
}

// Sunset: sharp corners, warm gradient surface, amber primary.
const sunsetScope: CSSProperties = {
  ['--sg-btn-radius' as never]: '4px',
  ['--sg-btn-height' as never]: '40px',
  ['--sg-btn-padding' as never]: '0 18px',
  ['--sg-btn-font-size' as never]: '14px',
  ['--sg-btn-bg' as never]: '#ea580c',
  ['--sg-btn-color' as never]: '#ffffff',
  ['--sg-btn-border' as never]: '#ea580c',
  ...cardStyle,
  background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
  border: '1px solid #fed7aa',
}

export function TokensOverrideButton() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <div style={emeraldScope}>
        <span style={{ ...labelStyle, color: '#047857' }}>{t.emeraldLabel}</span>
        <div style={rowStyle}>
          <Button type="primary">{t.primary}</Button>
          <Button>{t.secondary}</Button>
          <Button type="dashed">{t.dashed}</Button>
        </div>
      </div>
      <div style={sunsetScope}>
        <span style={{ ...labelStyle, color: '#c2410c' }}>{t.sunsetLabel}</span>
        <div style={rowStyle}>
          <Button type="primary">{t.primary}</Button>
          <Button>{t.secondary}</Button>
          <Button type="dashed">{t.dashed}</Button>
        </div>
      </div>
    </div>
  )
}
