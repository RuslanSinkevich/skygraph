import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { StylingShowcaseDocStrings } from './en'
import { stylingShowcaseDocEn } from './en'
import { stylingShowcaseDocRu } from './ru'

const stylingShowcaseDocByLocale: Record<Locale, StylingShowcaseDocStrings> = {
  en: stylingShowcaseDocEn as StylingShowcaseDocStrings,
  ru: stylingShowcaseDocRu,
}

/**
 * Doc strings for the Styling Showcase page (`StylingShowcasePage.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useStylingShowcaseDocStrings(): StylingShowcaseDocStrings {
  const { locale } = useI18n()
  return useMemo(() => stylingShowcaseDocByLocale[locale], [locale])
}
