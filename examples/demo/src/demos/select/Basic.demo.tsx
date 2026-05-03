import { useMemo, useState } from 'react'
import { Select } from '@skygraph/react'
import { cityOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    placeholder: 'Choose a city',
    moscow: 'Moscow',
    berlin: 'Berlin',
    tokyo: 'Tokyo',
    ny: 'New York',
    sp: 'São Paulo',
  },
  ru: {
    placeholder: 'Выберите город',
    moscow: 'Москва',
    berlin: 'Берлин',
    tokyo: 'Токио',
    ny: 'Нью-Йорк',
    sp: 'Сан-Паулу',
  },
} as const

type CityKey = 'moscow' | 'berlin' | 'tokyo' | 'ny' | 'sp'

/**
 * Controlled select. `value` / `onChange` is the canonical pattern — use
 * `defaultValue` to start uncontrolled.
 */
export function BasicSelect() {
  const t = useDemoStrings(STRINGS)
  const options = useMemo(
    () => cityOptions.map((o) => ({
      ...o,
      label: t[o.value as CityKey],
    })),
    [t],
  )

  const [value, setValue] = useState<string | number>('')

  return (
    <Select
      placeholder={t.placeholder}
      value={value}
      onChange={setValue}
      options={options}
    />
  )
}
