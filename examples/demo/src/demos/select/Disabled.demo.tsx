import { useMemo } from 'react'
import { Select } from '@skygraph/react'
import { cityOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    placeholder: 'One option disabled',
    unavailable: 'Unavailable',
    moscow: 'Moscow',
    berlin: 'Berlin',
    tokyo: 'Tokyo',
    ny: 'New York',
    sp: 'São Paulo',
  },
  ru: {
    placeholder: 'Один вариант отключён',
    unavailable: 'Недоступно',
    moscow: 'Москва',
    berlin: 'Берлин',
    tokyo: 'Токио',
    ny: 'Нью-Йорк',
    sp: 'Сан-Паулу',
  },
} as const

type CityKey = 'moscow' | 'berlin' | 'tokyo' | 'ny' | 'sp'

/**
 * Disable the whole select via `disabled`, or a single option by flagging
 * it in `options`. Disabled options stay visible but cannot be picked.
 */
export function DisabledSelect() {
  const t = useDemoStrings(STRINGS)
  const base = useMemo(
    () => cityOptions.map((o) => ({
      ...o,
      label: t[o.value as CityKey],
    })),
    [t],
  )

  const withDisabledRow = useMemo(
    () => [...base, { label: t.unavailable, value: 'x', disabled: true }],
    [t, base],
  )

  return (
    <>
      <Select disabled defaultValue="moscow" options={base} />
      <Select placeholder={t.placeholder} options={withDisabledRow} />
    </>
  )
}
