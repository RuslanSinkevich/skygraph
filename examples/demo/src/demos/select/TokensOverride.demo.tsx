import { useMemo } from 'react'
import { Select } from '@skygraph/react'
import { fruitOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    tallRounded: 'Tall & rounded',
    brandedGreen: 'Branded green',
    darkInput: 'Dark input',
    apple: 'Apple',
    pear: 'Pear',
    mango: 'Mango',
    kiwi: 'Kiwi',
  },
  ru: {
    tallRounded: 'Выше и с скруглением',
    brandedGreen: 'Зелёный бренд',
    darkInput: 'Тёмное поле',
    apple: 'Яблоко',
    pear: 'Груша',
    mango: 'Манго',
    kiwi: 'Киви',
  },
} as const

/**
 * Select shares CSS variables with Input (height / radius / border). Wrap
 * one instance in a scoped style object and only that select changes.
 */
export function TokensOverrideSelect() {
  const t = useDemoStrings(STRINGS)
  const options = useMemo(
    () => fruitOptions.map((o) => ({
      ...o,
      label: t[o.value as 'apple' | 'pear' | 'mango' | 'kiwi'],
    })),
    [t],
  )

  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <div
        style={
          {
            '--sg-input-height': '44px',
            '--sg-input-radius': '14px',
          } as React.CSSProperties
        }
      >
        <Select placeholder={t.tallRounded} options={options} />
      </div>

      <div
        style={
          {
            '--sg-color-primary': '#059669',
            '--sg-color-primary-bg': '#d1fae5',
            '--sg-color-primary-hover': '#047857',
          } as React.CSSProperties
        }
      >
        <Select placeholder={t.brandedGreen} options={options} />
      </div>

      <div
        style={
          {
            '--sg-input-bg': '#0f172a',
            '--sg-input-color': '#e2e8f0',
            '--sg-input-border': '#1e293b',
            '--sg-color-text-placeholder': '#64748b',
          } as React.CSSProperties
        }
      >
        <Select placeholder={t.darkInput} options={options} />
      </div>
    </div>
  )
}
