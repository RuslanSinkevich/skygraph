import type { CSSProperties } from 'react'
import { RadioGroup } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    defaultLabel: 'Default',
    overrideLabel: 'Token override',
    brandA: 'Brand A',
    brandB: 'Brand B',
    brandC: 'Brand C',
  },
  ru: {
    defaultLabel: 'По умолчанию',
    overrideLabel: 'Переопределение',
    brandA: 'Бренд A',
    brandB: 'Бренд B',
    brandC: 'Бренд C',
  },
} as const

const overrideStyle: CSSProperties = {
  ['--sg-radio-bg-checked' as never]: '#059669',
  ['--sg-radio-border-hover' as never]: '#059669',
  ['--sg-radio-dot-color' as never]: '#fff',
  ['--sg-color-text' as never]: '#065f46',
  padding: '16px',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
  border: '1px solid #a7f3d0',
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

export function TokensOverrideRadio() {
  const t = useDemoStrings(STRINGS)
  const options = [
    { label: t.brandA, value: 'a' },
    { label: t.brandB, value: 'b' },
    { label: t.brandC, value: 'c' },
  ]
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <div style={defaultStyle}>
        <div style={labelStyle}>{t.defaultLabel}</div>
        <RadioGroup defaultValue="b" options={options} />
      </div>
      <div style={overrideStyle}>
        <div style={{ ...labelStyle, color: '#065f46' }}>{t.overrideLabel}</div>
        <RadioGroup defaultValue="b" options={options} />
      </div>
    </div>
  )
}
