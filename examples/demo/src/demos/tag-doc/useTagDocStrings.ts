import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { TagDocStrings } from './en'
import { tagDocEn } from './en'
import { tagDocRu } from './ru'

const tagDocByLocale: Record<Locale, TagDocStrings> = {
  en: tagDocEn as TagDocStrings,
  ru: tagDocRu,
}

/**
 * Doc strings for the Tag component page (`TagDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useTagDocStrings(): TagDocStrings {
  const { locale } = useI18n()
  return useMemo(() => tagDocByLocale[locale], [locale])
}
