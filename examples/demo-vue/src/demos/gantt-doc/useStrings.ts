import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { GanttDocStrings } from './en'
import { ganttDocEn } from './en'
import { ganttDocRu } from './ru'

const dictByLocale: Record<Locale, GanttDocStrings> = {
  en: ganttDocEn as GanttDocStrings,
  ru: ganttDocRu,
}

export function useGanttDocStrings(): ComputedRef<GanttDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
