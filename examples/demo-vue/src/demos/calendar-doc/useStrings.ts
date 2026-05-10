import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { CalendarDocStrings } from './en'
import { calendarDocEn } from './en'
import { calendarDocRu } from './ru'

const calendarDocByLocale: Record<Locale, CalendarDocStrings> = {
  en: calendarDocEn as CalendarDocStrings,
  ru: calendarDocRu,
}

export function useCalendarDocStrings(): ComputedRef<CalendarDocStrings> {
  const { locale } = useI18n()
  return computed(() => calendarDocByLocale[locale.value])
}
