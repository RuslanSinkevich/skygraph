import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { FormDocStrings } from './en'
import { formDocEn } from './en'
import { formDocRu } from './ru'

const formDocByLocale: Record<Locale, FormDocStrings> = {
  en: formDocEn as FormDocStrings,
  ru: formDocRu,
}

export function useFormDocStrings(): ComputedRef<FormDocStrings> {
  const { locale } = useI18n()
  return computed(() => formDocByLocale[locale.value])
}
