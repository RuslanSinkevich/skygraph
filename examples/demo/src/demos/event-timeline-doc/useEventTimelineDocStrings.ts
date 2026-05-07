import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { EventTimelineDocStrings } from './en'
import { eventTimelineDocEn } from './en'
import { eventTimelineDocRu } from './ru'

const eventTimelineDocByLocale: Record<Locale, EventTimelineDocStrings> = {
  en: eventTimelineDocEn as EventTimelineDocStrings,
  ru: eventTimelineDocRu,
}

/**
 * Doc strings for the EventTimeline component page (`EventTimelineDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useEventTimelineDocStrings(): EventTimelineDocStrings {
  const { locale } = useI18n()
  return useMemo(() => eventTimelineDocByLocale[locale], [locale])
}
