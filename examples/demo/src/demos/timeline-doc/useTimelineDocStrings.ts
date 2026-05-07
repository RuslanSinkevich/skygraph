import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { TimelineDocStrings } from './en'
import { timelineDocEn } from './en'
import { timelineDocRu } from './ru'

const timelineDocByLocale: Record<Locale, TimelineDocStrings> = {
  en: timelineDocEn as TimelineDocStrings,
  ru: timelineDocRu,
}

/**
 * Doc strings for the Timeline component page (`TimelineDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useTimelineDocStrings(): TimelineDocStrings {
  const { locale } = useI18n()
  return useMemo(() => timelineDocByLocale[locale], [locale])
}
