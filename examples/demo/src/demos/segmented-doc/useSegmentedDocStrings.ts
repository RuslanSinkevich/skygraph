import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { SegmentedDocStrings } from './en'
import { segmentedDocEn } from './en'
import { segmentedDocRu } from './ru'

const segmentedDocByLocale: Record<Locale, SegmentedDocStrings> = {
  en: segmentedDocEn as SegmentedDocStrings,
  ru: segmentedDocRu,
}

/**
 * Doc strings for the Segmented component page (`SegmentedDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useSegmentedDocStrings(): SegmentedDocStrings {
  const { locale } = useI18n()
  return useMemo(() => segmentedDocByLocale[locale], [locale])
}
