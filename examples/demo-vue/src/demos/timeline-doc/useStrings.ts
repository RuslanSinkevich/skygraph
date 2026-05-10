import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { TimelineDocStrings } from './en'
import { timelineDocEn } from './en'
import { timelineDocRu } from './ru'

const dictByLocale: Record<Locale, TimelineDocStrings> = {
  en: timelineDocEn as TimelineDocStrings,
  ru: timelineDocRu,
}

/**
 * Doc strings for the Timeline component page (`TimelineDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useTimelineDocStrings(): ComputedRef<TimelineDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
