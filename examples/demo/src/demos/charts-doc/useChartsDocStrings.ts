import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { ChartsDocStrings } from './en'
import { chartsDocEn } from './en'
import { chartsDocRu } from './ru'

const chartsDocByLocale: Record<Locale, ChartsDocStrings> = {
  en: chartsDocEn as ChartsDocStrings,
  ru: chartsDocRu,
}

/**
 * Doc strings for the Charts component page (`ChartsDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useChartsDocStrings(): ChartsDocStrings {
  const { locale } = useI18n()
  return useMemo(() => chartsDocByLocale[locale], [locale])
}
