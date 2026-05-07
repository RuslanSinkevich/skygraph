import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { RateDocStrings } from './en'
import { rateDocEn } from './en'
import { rateDocRu } from './ru'

const rateDocByLocale: Record<Locale, RateDocStrings> = {
  en: rateDocEn as RateDocStrings,
  ru: rateDocRu,
}

/**
 * Doc strings for the Rate component page (`RateDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useRateDocStrings(): RateDocStrings {
  const { locale } = useI18n()
  return useMemo(() => rateDocByLocale[locale], [locale])
}
