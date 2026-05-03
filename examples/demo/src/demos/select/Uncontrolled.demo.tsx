import { useMemo } from 'react'
import { Select } from '@skygraph/react'
import { priorityOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    p0: 'Critical',
    p1: 'High',
    p2: 'Normal',
    p3: 'Low',
  },
  ru: {
    p0: 'Критично',
    p1: 'Высокий',
    p2: 'Обычный',
    p3: 'Низкий',
  },
} as const

/**
 * Uncontrolled — SkyGraph keeps the value internally, you just read it via
 * `onChange` when the user picks something.
 */
export function UncontrolledSelect() {
  const t = useDemoStrings(STRINGS)
  const options = useMemo(
    () => priorityOptions.map((o) => ({
      ...o,
      label: t[o.value as 'p0' | 'p1' | 'p2' | 'p3'],
    })),
    [t],
  )

  return (
    <Select
      defaultValue="p2"
      options={options}
      onChange={(v) => console.log('picked', v)}
    />
  )
}
