import { useMemo } from 'react'
import { Select } from '@skygraph/react'
import { fruitOptions } from './data'
import { useDemoStrings } from '../../i18n'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Select shares the input tokens (`--sg-input-*`) with `Input` and listens to
 * the global colour / surface families. Three scoped recipes — branded green,
 * dark field and frosted glass — reskin the same component without touching
 * its behaviour.
 */
const STRINGS = {
  en: { apple: 'Apple', pear: 'Pear', mango: 'Mango', kiwi: 'Kiwi', placeholder: 'Pick a fruit' },
  ru: {
    apple: 'Яблоко',
    pear: 'Груша',
    mango: 'Манго',
    kiwi: 'Киви',
    placeholder: 'Выберите фрукт',
  },
} as const

export function TokensOverrideSelect() {
  const t = useDemoStrings(STRINGS)

  const options = useMemo(
    () =>
      fruitOptions.map((o) => ({
        ...o,
        label: t[o.value as 'apple' | 'pear' | 'mango' | 'kiwi'],
      })),
    [t],
  )

  return (
    <TokenScopeCards
      extra={{
        brand: { ['--sg-input-border' as never]: '#6ee7b7' },
        dark: {
          ['--sg-input-bg' as never]: '#0f172a',
          ['--sg-input-color' as never]: '#e2e8f0',
          ['--sg-input-border' as never]: '#1e293b',
        },
        glass: {
          ['--sg-input-bg' as never]: 'rgba(255, 255, 255, 0.55)',
          ['--sg-input-border' as never]: 'rgba(15, 23, 42, 0.08)',
          ['--sg-input-radius' as never]: '12px',
        },
      }}
      render={() => <Select placeholder={t.placeholder} options={options} />}
    />
  )
}
