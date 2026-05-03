import { useMemo } from 'react'
import { Select } from '@skygraph/react'
import { cityOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    placeholder: 'Native select',
    moscow: 'Moscow',
    berlin: 'Berlin',
    tokyo: 'Tokyo',
    ny: 'New York',
    sp: 'São Paulo',
  },
  ru: {
    placeholder: 'Нативный select',
    moscow: 'Москва',
    berlin: 'Берлин',
    tokyo: 'Токио',
    ny: 'Нью-Йорк',
    sp: 'Сан-Паулу',
  },
} as const

type CityKey = 'moscow' | 'berlin' | 'tokyo' | 'ny' | 'sp'

/**
 * `unstyled` renders a native `<select>` with no SkyGraph styling. Useful
 * when you're embedding in a foreign design system and only need the
 * controlled-value wiring.
 */
export function UnstyledSelect() {
  const t = useDemoStrings(STRINGS)
  const options = useMemo(
    () => cityOptions.map((o) => ({
      ...o,
      label: t[o.value as CityKey],
    })),
    [t],
  )

  return (
    <Select
      unstyled
      placeholder={t.placeholder}
      options={options}
      defaultValue="berlin"
      style={{ padding: '6px 10px', borderRadius: 4 }}
    />
  )
}
