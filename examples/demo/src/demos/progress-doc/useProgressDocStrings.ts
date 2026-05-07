import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { ProgressDocStrings } from './en'
import { progressDocEn } from './en'
import { progressDocRu } from './ru'

const progressDocByLocale: Record<Locale, ProgressDocStrings> = {
  en: progressDocEn as ProgressDocStrings,
  ru: progressDocRu,
}

/**
 * Doc strings for the Progress component page (`ProgressDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useProgressDocStrings(): ProgressDocStrings {
  const { locale } = useI18n()
  return useMemo(() => progressDocByLocale[locale], [locale])
}
