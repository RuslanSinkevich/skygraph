import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { AutoCompleteDocStrings } from './en'
import { autoCompleteDocEn } from './en'
import { autoCompleteDocRu } from './ru'

const autoCompleteDocByLocale: Record<Locale, AutoCompleteDocStrings> = {
  en: autoCompleteDocEn as AutoCompleteDocStrings,
  ru: autoCompleteDocRu,
}

export function useAutoCompleteDocStrings(): ComputedRef<AutoCompleteDocStrings> {
  const { locale } = useI18n()
  return computed(() => autoCompleteDocByLocale[locale.value])
}
