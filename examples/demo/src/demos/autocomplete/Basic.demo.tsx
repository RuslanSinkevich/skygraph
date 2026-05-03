import { useState } from 'react'
import { AutoComplete } from '@skygraph/react'
import { frameworkOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    placeholder: 'Type to filter…',
    currentPrefix: 'Current:',
    hint: 'Start typing to see suggestions.',
  },
  ru: {
    placeholder: 'Начните вводить для фильтра…',
    currentPrefix: 'Сейчас:',
    hint: 'Начните вводить, чтобы увидеть подсказки.',
  },
} as const

/**
 * A text field backed by a list of suggestions. The typed value is the
 * source of truth — picking a row writes its `value` into the input.
 * Filtering is case-insensitive and done by label.
 */
export function BasicAutoComplete() {
  const t = useDemoStrings(STRINGS)
  const [value, setValue] = useState('')
  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <AutoComplete
        options={frameworkOptions}
        value={value}
        onChange={setValue}
        placeholder={t.placeholder}
      />
      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        {value ? `${t.currentPrefix} "${value}"` : t.hint}
      </span>
    </div>
  )
}
