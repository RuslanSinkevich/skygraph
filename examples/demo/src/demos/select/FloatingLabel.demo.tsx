import { useMemo, useState } from 'react'
import { Select } from '@skygraph/react'
import { fruitOptions, cityOptions } from './data'
import { useDemoStrings } from '../../i18n'
import { FloatingField, FloatingFieldStyles } from '../_shared/FloatingField'

/**
 * Floating label on the Select trigger. The label glides up on focus or once
 * a value is chosen — focus is tracked via the bubbling focus events, "filled"
 * comes from the controlled value.
 */
const STRINGS = {
  en: { fruit: 'Favourite fruit', city: 'City' },
  ru: { fruit: 'Любимый фрукт', city: 'Город' },
} as const

export function FloatingLabelSelect() {
  const t = useDemoStrings(STRINGS)
  const [fruit, setFruit] = useState<string | number>('')
  const [city, setCity] = useState<string | number>('')

  const fruits = useMemo(() => fruitOptions, [])
  const cities = useMemo(() => cityOptions, [])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 220px))',
        gap: 24,
        maxWidth: 480,
      }}
    >
      <FloatingFieldStyles />
      <FloatingField label={t.fruit} filled={fruit !== ''}>
        <Select value={fruit} onChange={setFruit} options={fruits} placeholder="" />
      </FloatingField>
      <FloatingField label={t.city} filled={city !== ''}>
        <Select value={city} onChange={setCity} options={cities} placeholder="" />
      </FloatingField>
    </div>
  )
}
