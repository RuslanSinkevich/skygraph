import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { EventTimelineDocStrings } from './en'
import { eventTimelineDocEn } from './en'
import { eventTimelineDocRu } from './ru'

const dictByLocale: Record<Locale, EventTimelineDocStrings> = {
  en: eventTimelineDocEn as EventTimelineDocStrings,
  ru: eventTimelineDocRu,
}

export function useEventTimelineDocStrings(): ComputedRef<EventTimelineDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
