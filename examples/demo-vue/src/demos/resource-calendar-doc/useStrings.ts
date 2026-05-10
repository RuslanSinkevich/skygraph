import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { ResourceCalendarDocStrings } from './en'
import { resourceCalendarDocEn } from './en'
import { resourceCalendarDocRu } from './ru'

const dictByLocale: Record<Locale, ResourceCalendarDocStrings> = {
  en: resourceCalendarDocEn as ResourceCalendarDocStrings,
  ru: resourceCalendarDocRu,
}

export function useResourceCalendarDocStrings(): ComputedRef<ResourceCalendarDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
