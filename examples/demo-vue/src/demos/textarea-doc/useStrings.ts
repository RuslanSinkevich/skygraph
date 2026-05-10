import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { TextareaDocStrings } from './en'
import { textareaDocEn } from './en'
import { textareaDocRu } from './ru'

const textareaDocByLocale: Record<Locale, TextareaDocStrings> = {
  en: textareaDocEn as TextareaDocStrings,
  ru: textareaDocRu,
}

export function useTextareaDocStrings(): ComputedRef<TextareaDocStrings> {
  const { locale } = useI18n()
  return computed(() => textareaDocByLocale[locale.value])
}
