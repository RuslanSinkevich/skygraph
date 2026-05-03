import { useMemo } from 'react'
import { Select } from '@skygraph/react'
import { numberOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    small: 'Small',
    default: 'Default',
    large: 'Large',
    one: 'One',
    two: 'Two',
    three: 'Three',
  },
  ru: {
    small: 'Маленький',
    default: 'Обычный',
    large: 'Большой',
    one: 'Один',
    two: 'Два',
    three: 'Три',
  },
} as const

/** Three sizes — match whatever form/toolbar density you're going for. */
export function SelectSizes() {
  const t = useDemoStrings(STRINGS)
  const options = useMemo(
    () => numberOptions.map((o) => ({
      ...o,
      label: o.value === 1 ? t.one : o.value === 2 ? t.two : t.three,
    })),
    [t],
  )

  return (
    <>
      <Select size="small" placeholder={t.small} options={options} />
      <Select placeholder={t.default} options={options} />
      <Select size="large" placeholder={t.large} options={options} />
    </>
  )
}
