import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { CheckboxDocStrings } from './en'
import { checkboxDocEn } from './en'
import { checkboxDocRu } from './ru'

const checkboxDocByLocale: Record<Locale, CheckboxDocStrings> = {
  en: checkboxDocEn as CheckboxDocStrings,
  ru: checkboxDocRu,
}

export function useCheckboxDocStrings(): ComputedRef<CheckboxDocStrings> {
  const { locale } = useI18n()
  return computed(() => checkboxDocByLocale[locale.value])
}
