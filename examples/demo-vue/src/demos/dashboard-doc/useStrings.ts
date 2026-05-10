import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { DashboardDocStrings } from './en'
import { dashboardDocEn } from './en'
import { dashboardDocRu } from './ru'

const dictByLocale: Record<Locale, DashboardDocStrings> = {
  en: dashboardDocEn as DashboardDocStrings,
  ru: dashboardDocRu,
}

export function useDashboardDocStrings(): ComputedRef<DashboardDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
