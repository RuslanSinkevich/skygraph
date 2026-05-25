import type { CSSProperties } from 'react'
import { Checkbox } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    defaultLabel: 'Default',
    overrideLabel: 'Token override',
    option1: 'Receive emails',
    option2: 'Indeterminate',
    option3: 'Remember me',
  },
  ru: {
    defaultLabel: 'По умолчанию',
    overrideLabel: 'Переопределение',
    option1: 'Получать письма',
    option2: 'Промежуточное',
    option3: 'Запомнить меня',
  },
} as const

const overrideStyle: CSSProperties = {
  ['--sg-checkbox-bg-checked' as never]: '#c026d3',
  ['--sg-checkbox-border-hover' as never]: '#c026d3',
  ['--sg-checkbox-color-checked' as never]: '#fff',
  ['--sg-checkbox-radius' as never]: '50%',
  ['--sg-checkbox-size' as never]: '18px',
  ['--sg-color-text' as never]: '#6b0e4a',
  padding: '16px',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%)',
  border: '1px solid #e9d5ff',
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

export function TokensOverrideCheckbox() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <div style={defaultStyle}>
        <div style={labelStyle}>{t.defaultLabel}</div>
        <div style={{ display: 'grid', gap: 6 }}>
          <Checkbox defaultChecked>{t.option1}</Checkbox>
          <Checkbox indeterminate>{t.option2}</Checkbox>
          <Checkbox>{t.option3}</Checkbox>
        </div>
      </div>
      <div style={overrideStyle}>
        <div style={{ ...labelStyle, color: '#6b0e4a' }}>{t.overrideLabel}</div>
        <div style={{ display: 'grid', gap: 6 }}>
          <Checkbox defaultChecked>{t.option1}</Checkbox>
          <Checkbox indeterminate>{t.option2}</Checkbox>
          <Checkbox>{t.option3}</Checkbox>
        </div>
      </div>
    </div>
  )
}
