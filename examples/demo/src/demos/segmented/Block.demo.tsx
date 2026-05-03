import { useMemo } from 'react'
import { Segmented } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    a: 'Option A',
    b: 'Option B',
    c: 'Option C',
  },
  ru: {
    a: 'Вариант A',
    b: 'Вариант B',
    c: 'Вариант C',
  },
} as const

/**
 * `block` stretches the control to fill its container and makes
 * every segment equal width — ideal for full-width toolbars on
 * mobile or inside cards.
 */
export function BlockSegmented() {
  const t = useDemoStrings(STRINGS)
  const options = useMemo(() => [t.a, t.b, t.c], [t])
  return <Segmented block options={options} />
}
