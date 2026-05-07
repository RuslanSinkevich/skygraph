import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { AutoCompleteDocStrings } from './en'
import { autoCompleteDocEn } from './en'
import { autoCompleteDocRu } from './ru'

const autoCompleteDocByLocale: Record<Locale, AutoCompleteDocStrings> = {
  en: autoCompleteDocEn as AutoCompleteDocStrings,
  ru: autoCompleteDocRu,
}

/**
 * Doc strings for the AutoComplete component page (`AutoCompleteDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useAutoCompleteDocStrings(): AutoCompleteDocStrings {
  const { locale } = useI18n()
  return useMemo(() => autoCompleteDocByLocale[locale], [locale])
}
