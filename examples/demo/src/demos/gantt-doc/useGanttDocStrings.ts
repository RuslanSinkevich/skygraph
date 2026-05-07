import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { GanttDocStrings } from './en'
import { ganttDocEn } from './en'
import { ganttDocRu } from './ru'

const ganttDocByLocale: Record<Locale, GanttDocStrings> = {
  en: ganttDocEn as GanttDocStrings,
  ru: ganttDocRu,
}

/**
 * Doc strings for the Gantt component page (`GanttDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useGanttDocStrings(): GanttDocStrings {
  const { locale } = useI18n()
  return useMemo(() => ganttDocByLocale[locale], [locale])
}
