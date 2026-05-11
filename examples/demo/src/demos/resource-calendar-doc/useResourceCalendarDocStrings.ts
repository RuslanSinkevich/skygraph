import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { ResourceCalendarDocStrings } from './en'
import { resourceCalendarDocEn } from './en'
import { resourceCalendarDocRu } from './ru'

const resourceCalendarDocByLocale: Record<Locale, ResourceCalendarDocStrings> = {
  en: resourceCalendarDocEn as ResourceCalendarDocStrings,
  ru: resourceCalendarDocRu,
}

/**
 * Doc strings for the ResourceCalendar component page (`ResourceCalendarDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useResourceCalendarDocStrings(): ResourceCalendarDocStrings {
  const { locale } = useI18n()
  return useMemo(() => resourceCalendarDocByLocale[locale], [locale])
}
