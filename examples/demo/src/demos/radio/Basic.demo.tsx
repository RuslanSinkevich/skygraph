import { useState } from 'react'
import { RadioGroup } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    economy: 'Economy',
    standard: 'Standard',
    premium: 'Premium',
    selected: 'Selected:',
  },
  ru: {
    economy: 'Эконом',
    standard: 'Стандарт',
    premium: 'Премиум',
    selected: 'Выбрано:',
  },
} as const

/**
 * Controlled radio group. `onChange` gives you the selected value so you
 * can lift it into a store or form state.
 */
export function BasicRadio() {
  const t = useDemoStrings(STRINGS)
  const [value, setValue] = useState<string | number>('standard')
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <RadioGroup
        value={value}
        onChange={setValue}
        options={[
          { label: t.economy, value: 'economy' },
          { label: t.standard, value: 'standard' },
          { label: t.premium, value: 'premium' },
        ]}
      />
      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>{t.selected} {String(value)}</span>
    </div>
  )
}
