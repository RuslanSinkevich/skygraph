import { AutoComplete } from '@skygraph/react'
import { frameworkOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    placeholder: 'Headless combobox',
  },
  ru: {
    placeholder: 'Headless-комбобокс',
  },
} as const

/**
 * `unstyled` drops every SkyGraph class on both the input and the
 * dropdown. Bring your own CSS — semantics (role="combobox",
 * aria-expanded, aria-autocomplete="list") stay in place.
 */
export function UnstyledAutoComplete() {
  const t = useDemoStrings(STRINGS)
  return (
    <AutoComplete
      unstyled
      options={frameworkOptions}
      placeholder={t.placeholder}
      className="demo-unstyled-input"
      style={{ maxWidth: 320 }}
    />
  )
}
