import { useMemo } from 'react'
import { Segmented } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    small: 'Small',
    middle: 'Middle',
    large: 'Large',
  },
  ru: {
    small: 'Маленький',
    middle: 'Средний',
    large: 'Большой',
  },
} as const

/**
 * `size` controls item height, padding and font size together.
 * Use `small` inside toolbars / cards, `large` for landing or
 * onboarding screens.
 */
export function SizesSegmented() {
  const t = useDemoStrings(STRINGS)
  const options = useMemo(() => [t.small, t.middle, t.large], [t])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Segmented size="small" options={options} />
      <Segmented options={options} />
      <Segmented size="large" options={options} />
    </div>
  )
}
