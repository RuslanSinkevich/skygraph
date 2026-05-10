import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { DatePickerDocStrings } from './en'
import { datePickerDocEn } from './en'
import { datePickerDocRu } from './ru'

const datePickerDocByLocale: Record<Locale, DatePickerDocStrings> = {
  en: datePickerDocEn as DatePickerDocStrings,
  ru: datePickerDocRu,
}

export function useDatePickerDocStrings(): ComputedRef<DatePickerDocStrings> {
  const { locale } = useI18n()
  return computed(() => datePickerDocByLocale[locale.value])
}
