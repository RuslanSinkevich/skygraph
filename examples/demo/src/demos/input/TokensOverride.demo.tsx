import { useState, type CSSProperties } from 'react'
import { Input } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

/**
 * Two ready-to-use Input themes built purely from component tokens
 * (`--sg-input-*`). Only paint / shape tokens change — focus ring,
 * disabled and validation states keep their semantic behaviour.
 */
const STRINGS = {
  en: {
    softLabel: 'Soft · rounded',
    amberLabel: 'Amber · filled',
    softPlaceholder: 'Search anything…',
    amberPlaceholder: 'your@email.com',
  },
  ru: {
    softLabel: 'Мягкий · скруглённый',
    amberLabel: 'Янтарь · заливка',
    softPlaceholder: 'Поиск чего угодно…',
    amberPlaceholder: 'your@email.com',
  },
} as const

const cardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
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

// Soft: tall pill field on a violet surface.
const softScope: CSSProperties = {
  ['--sg-input-radius' as never]: '999px',
  ['--sg-input-height' as never]: '44px',
  ['--sg-input-padding' as never]: '0 18px',
  ['--sg-input-bg' as never]: '#ffffff',
  ['--sg-input-border' as never]: '#ddd6fe',
  ...cardStyle,
  background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
  border: '1px solid #ddd6fe',
}

// Amber: filled field, warm tinted background, square-ish corners.
const amberScope: CSSProperties = {
  ['--sg-input-radius' as never]: '8px',
  ['--sg-input-height' as never]: '44px',
  ['--sg-input-padding' as never]: '0 14px',
  ['--sg-input-bg' as never]: '#fffbeb',
  ['--sg-input-border' as never]: '#fcd34d',
  ...cardStyle,
  background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
  border: '1px solid #fde68a',
}

export function TokensOverrideInput() {
  const t = useDemoStrings(STRINGS)
  const [soft, setSoft] = useState('')
  const [amber, setAmber] = useState('')
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <div style={softScope}>
        <span style={{ ...labelStyle, color: '#6d28d9' }}>{t.softLabel}</span>
        <Input value={soft} onChange={setSoft} placeholder={t.softPlaceholder} />
      </div>
      <div style={amberScope}>
        <span style={{ ...labelStyle, color: '#b45309' }}>{t.amberLabel}</span>
        <Input value={amber} onChange={setAmber} placeholder={t.amberPlaceholder} />
      </div>
    </div>
  )
}
