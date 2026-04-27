import { AutoComplete } from '@skygraph/react'
import { frameworkOptions } from './data'

/**
 * `unstyled` drops every SkyGraph class on both the input and the
 * dropdown. Bring your own CSS — semantics (role="combobox",
 * aria-expanded, aria-autocomplete="list") stay in place.
 */
export function UnstyledAutoComplete() {
  return (
    <AutoComplete
      unstyled
      options={frameworkOptions}
      placeholder="Headless combobox"
      className="demo-unstyled-input"
      style={{ maxWidth: 320 }}
    />
  )
}
