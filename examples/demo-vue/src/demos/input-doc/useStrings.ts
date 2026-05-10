import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { InputDocStrings } from './en'
import { inputDocEn } from './en'
import { inputDocRu } from './ru'

const inputDocByLocale: Record<Locale, InputDocStrings> = {
  en: inputDocEn as InputDocStrings,
  ru: inputDocRu,
}

export function useInputDocStrings(): ComputedRef<InputDocStrings> {
  const { locale } = useI18n()
  return computed(() => inputDocByLocale[locale.value])
}
