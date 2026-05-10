import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { InputNumberDocStrings } from './en'
import { inputNumberDocEn } from './en'
import { inputNumberDocRu } from './ru'

const inputNumberDocByLocale: Record<Locale, InputNumberDocStrings> = {
  en: inputNumberDocEn as InputNumberDocStrings,
  ru: inputNumberDocRu,
}

export function useInputNumberDocStrings(): ComputedRef<InputNumberDocStrings> {
  const { locale } = useI18n()
  return computed(() => inputNumberDocByLocale[locale.value])
}
