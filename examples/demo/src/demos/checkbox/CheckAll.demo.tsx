import { useMemo, useState } from 'react'
import { Checkbox } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    apple: 'Apple',
    pear: 'Pear',
    orange: 'Orange',
    banana: 'Banana',
    mango: 'Mango',
    checkAll: 'Check all',
  },
  ru: {
    apple: 'Яблоко',
    pear: 'Груша',
    orange: 'Апельсин',
    banana: 'Банан',
    mango: 'Манго',
    checkAll: 'Выбрать все',
  },
} as const

const KEYS = ['apple', 'pear', 'orange', 'banana', 'mango'] as const
type FruitKey = (typeof KEYS)[number]

/**
 * Classic "check all" pattern — a parent checkbox with indeterminate
 * state when only some children are selected. Uses a single array of
 * checked keys for the state.
 */
export function CheckAllCheckbox() {
  const t = useDemoStrings(STRINGS)
  const [checked, setChecked] = useState<FruitKey[]>(['apple'])

  const { allChecked, indeterminate } = useMemo(
    () => ({
      allChecked: checked.length === KEYS.length,
      indeterminate: checked.length > 0 && checked.length < KEYS.length,
    }),
    [checked],
  )

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <Checkbox
        checked={allChecked}
        indeterminate={indeterminate}
        onChange={(c) => setChecked(c ? [...KEYS] : [])}
      >
        <strong>{t.checkAll} ({checked.length}/{KEYS.length})</strong>
      </Checkbox>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 20 }}>
        {KEYS.map((key) => (
          <Checkbox
            key={key}
            checked={checked.includes(key)}
            onChange={(c) =>
              setChecked((prev) => (c ? [...prev, key] : prev.filter((x) => x !== key)))
            }
          >
            {t[key]}
          </Checkbox>
        ))}
      </div>
    </div>
  )
}
