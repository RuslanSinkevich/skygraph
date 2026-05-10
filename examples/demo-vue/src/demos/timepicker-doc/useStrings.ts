import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { TimePickerDocStrings } from './en'
import { timePickerDocEn } from './en'
import { timePickerDocRu } from './ru'

const timePickerDocByLocale: Record<Locale, TimePickerDocStrings> = {
  en: timePickerDocEn as TimePickerDocStrings,
  ru: timePickerDocRu,
}

export function useTimePickerDocStrings(): ComputedRef<TimePickerDocStrings> {
  const { locale } = useI18n()
  return computed(() => timePickerDocByLocale[locale.value])
}
