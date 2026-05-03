import { useMemo, useState } from 'react'
import { Segmented } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    selected: 'Selected:',
    map: 'Map',
    transit: 'Transit',
    satellite: 'Satellite',
  },
  ru: {
    selected: 'Выбрано:',
    map: 'Карта',
    transit: 'Транспорт',
    satellite: 'Спутник',
  },
} as const

/**
 * Fully controlled: drive `value` from your own state and mirror
 * the change back through `onChange`. Use this when the
 * selection needs to round-trip through a URL, reducer or form.
 */
export function ControlledSegmented() {
  const t = useDemoStrings(STRINGS)
  const [value, setValue] = useState('Map')

  const options = useMemo(
    () => [
      { label: t.map, value: 'Map' },
      { label: t.transit, value: 'Transit' },
      { label: t.satellite, value: 'Satellite' },
    ],
    [t],
  )

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Segmented
        options={options}
        value={value}
        onChange={setValue}
      />
      <span style={{ color: 'var(--sg-color-text-secondary)' }}>{t.selected} {value}</span>
    </div>
  )
}
