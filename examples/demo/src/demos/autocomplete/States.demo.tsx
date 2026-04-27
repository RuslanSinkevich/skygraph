import { AutoComplete } from '@skygraph/react'
import { frameworkOptions } from './data'

/**
 * Disabled locks the input. Loading keeps it visible but blocks edits
 * and shows the inline spinner — use it while fetching suggestions.
 */
export function StatesAutoComplete() {
  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <AutoComplete disabled options={frameworkOptions} placeholder="Disabled" />
      <AutoComplete loading options={frameworkOptions} placeholder="Loading…" />
    </div>
  )
}
