import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { SelectDocStrings } from './en'
import { selectDocEn } from './en'
import { selectDocRu } from './ru'

const selectDocByLocale: Record<Locale, SelectDocStrings> = {
  en: selectDocEn as SelectDocStrings,
  ru: selectDocRu,
}

export function useSelectDocStrings(): ComputedRef<SelectDocStrings> {
  const { locale } = useI18n()
  return computed(() => selectDocByLocale[locale.value])
}
