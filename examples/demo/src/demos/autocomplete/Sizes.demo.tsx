import { AutoComplete } from '@skygraph/react'
import { frameworkOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    small: 'small',
    middle: 'middle (default)',
    large: 'large',
  },
  ru: {
    small: 'маленький',
    middle: 'средний (по умолчанию)',
    large: 'большой',
  },
} as const

/**
 * Three sizes mirror Input / Select. Line them up in the same row and
 * the heights, paddings and font sizes align.
 */
export function SizesAutoComplete() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <AutoComplete size="small" options={frameworkOptions} placeholder={t.small} />
      <AutoComplete options={frameworkOptions} placeholder={t.middle} />
      <AutoComplete size="large" options={frameworkOptions} placeholder={t.large} />
    </div>
  )
}
