import type { CSSProperties } from 'react'
import { Switch } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    defaultLabel: 'Default',
    overrideLabel: 'Token override',
    on: 'ON',
    off: 'OFF',
  },
  ru: {
    defaultLabel: 'По умолчанию',
    overrideLabel: 'Переопределение',
    on: 'ВКЛ',
    off: 'ВЫКЛ',
  },
} as const

const overrideStyle: CSSProperties = {
  ['--sg-switch-bg-checked' as never]: '#e11d48',
  ['--sg-switch-bg' as never]: 'rgba(225, 29, 72, 0.2)',
  padding: '16px',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
  border: '1px solid #fecdd3',
}

const defaultStyle: CSSProperties = {
  padding: '16px',
  borderRadius: '12px',
  background: 'var(--sg-color-bg-secondary)',
  border: '1px solid var(--sg-color-border-secondary)',
}

const labelStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: 8,
  color: 'var(--sg-color-text-secondary)',
}

export function TokensOverrideSwitch() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <div style={defaultStyle}>
        <div style={labelStyle}>{t.defaultLabel}</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Switch defaultChecked />
          <Switch defaultChecked checkedChildren={t.on} unCheckedChildren={t.off} />
          <Switch />
        </div>
      </div>
      <div style={overrideStyle}>
        <div style={{ ...labelStyle, color: '#9f1239' }}>{t.overrideLabel}</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Switch defaultChecked />
          <Switch defaultChecked checkedChildren={t.on} unCheckedChildren={t.off} />
          <Switch />
        </div>
      </div>
    </div>
  )
}
