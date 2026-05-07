import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { CalendarDocStrings } from './en'
import { calendarDocEn } from './en'
import { calendarDocRu } from './ru'

const calendarDocByLocale: Record<Locale, CalendarDocStrings> = {
  en: calendarDocEn as CalendarDocStrings,
  ru: calendarDocRu,
}

/**
 * Doc strings for the Calendar component page (`CalendarDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useCalendarDocStrings(): CalendarDocStrings {
  const { locale } = useI18n()
  return useMemo(() => calendarDocByLocale[locale], [locale])
}
