import { useMemo } from 'react'
import { Segmented } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    map: 'Map',
    transit: 'Transit',
    satellite: 'Satellite',
  },
  ru: {
    map: 'Карта',
    transit: 'Транспорт',
    satellite: 'Спутник',
  },
} as const

/**
 * Two axes of disablement — either the whole control (via the
 * top-level `disabled` prop, also inherited from
 * `ConfigProvider`) or individual options (`disabled` on the
 * option object).
 */
export function DisabledSegmented() {
  const t = useDemoStrings(STRINGS)
  const options = useMemo(
    () => [
      { label: t.map, value: 'Map' },
      { label: t.transit, value: 'Transit', disabled: true },
      { label: t.satellite, value: 'Satellite' },
    ],
    [t],
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Segmented
        options={[
          { label: t.map, value: 'Map' },
          { label: t.transit, value: 'Transit' },
          { label: t.satellite, value: 'Satellite' },
        ]}
        disabled
      />
      <Segmented
        defaultValue="Map"
        options={options}
      />
    </div>
  )
}
