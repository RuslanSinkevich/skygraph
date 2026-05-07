import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { DashboardDocStrings } from './en'
import { dashboardDocEn } from './en'
import { dashboardDocRu } from './ru'

const dashboardDocByLocale: Record<Locale, DashboardDocStrings> = {
  en: dashboardDocEn as DashboardDocStrings,
  ru: dashboardDocRu,
}

/**
 * Doc strings for the Dashboard component page (`DashboardDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useDashboardDocStrings(): DashboardDocStrings {
  const { locale } = useI18n()
  return useMemo(() => dashboardDocByLocale[locale], [locale])
}
