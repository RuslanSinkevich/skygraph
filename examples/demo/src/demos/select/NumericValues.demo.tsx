import { useMemo, useState } from 'react'
import { Select } from '@skygraph/react'
import { numberOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    valuePrefix: 'value:',
    typeofLabel: 'typeof',
    one: 'One',
    two: 'Two',
    three: 'Three',
  },
  ru: {
    valuePrefix: 'значение:',
    typeofLabel: 'тип',
    one: 'Один',
    two: 'Два',
    three: 'Три',
  },
} as const

/**
 * `value` can be a string OR a number. SkyGraph keeps the original type,
 * which matters when wiring to APIs that expect numeric IDs.
 */
export function NumericValuesSelect() {
  const t = useDemoStrings(STRINGS)
  const options = useMemo(
    () => numberOptions.map((o) => ({
      ...o,
      label: o.value === 1 ? t.one : o.value === 2 ? t.two : t.three,
    })),
    [t],
  )

  const [value, setValue] = useState<string | number>(2)
  return (
    <>
      <Select value={value} onChange={setValue} options={options} />
      <span
        style={{
          fontSize: 13,
          color: 'var(--sg-color-text-secondary)',
          alignSelf: 'center',
        }}
      >
        {t.valuePrefix} <code>{JSON.stringify(value)}</code> ({t.typeofLabel}{' '}
        <code>{typeof value}</code>)
      </span>
    </>
  )
}
