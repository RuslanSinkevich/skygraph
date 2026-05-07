import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { CollapseDocStrings } from './en'
import { collapseDocEn } from './en'
import { collapseDocRu } from './ru'

const collapseDocByLocale: Record<Locale, CollapseDocStrings> = {
  en: collapseDocEn as CollapseDocStrings,
  ru: collapseDocRu,
}

/**
 * Doc strings for the Collapse component page (`CollapseDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useCollapseDocStrings(): CollapseDocStrings {
  const { locale } = useI18n()
  return useMemo(() => collapseDocByLocale[locale], [locale])
}
