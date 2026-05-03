import { AutoComplete } from '@skygraph/react'
import { frameworkOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    disabled: 'Disabled',
    loading: 'Loading…',
  },
  ru: {
    disabled: 'Отключено',
    loading: 'Загрузка…',
  },
} as const

/**
 * Disabled locks the input. Loading keeps it visible but blocks edits
 * and shows the inline spinner — use it while fetching suggestions.
 */
export function StatesAutoComplete() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <AutoComplete disabled options={frameworkOptions} placeholder={t.disabled} />
      <AutoComplete loading options={frameworkOptions} placeholder={t.loading} />
    </div>
  )
}
