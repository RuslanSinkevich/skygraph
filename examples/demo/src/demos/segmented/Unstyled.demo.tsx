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
 * `unstyled` drops every CSS class and renders a native radio
 * group — behaviour stays (`role="radiogroup"`, keyboard,
 * disabled), but styling is 100% yours.
 */
export function UnstyledSegmented() {
  const t = useDemoStrings(STRINGS)
  const options = useMemo(
    () => [
      { label: t.map, value: 'Map' },
      { label: t.transit, value: 'Transit' },
      { label: t.satellite, value: 'Satellite' },
    ],
    [t],
  )

  return (
    <div>
      <style>{`
        .demo-radio-group { display: inline-flex; gap: 16px; }
        .demo-radio-group label { display: inline-flex; align-items: center; gap: 6px; cursor: pointer; }
        .demo-radio-group input[disabled] + * { opacity: 0.4; }
      `}</style>
      <Segmented
        unstyled
        className="demo-radio-group"
        defaultValue="Map"
        options={options}
      />
    </div>
  )
}
