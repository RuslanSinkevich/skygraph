import { useState } from 'react'
import { AutoComplete } from '@skygraph/react'
import { frameworkOptions } from './data'

/**
 * A text field backed by a list of suggestions. The typed value is the
 * source of truth — picking a row writes its `value` into the input.
 * Filtering is case-insensitive and done by label.
 */
export function BasicAutoComplete() {
  const [value, setValue] = useState('')
  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <AutoComplete
        options={frameworkOptions}
        value={value}
        onChange={setValue}
        placeholder="Type to filter…"
      />
      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        {value ? `Current: "${value}"` : 'Start typing to see suggestions.'}
      </span>
    </div>
  )
}
