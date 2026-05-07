import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { SelectDocStrings } from './en'
import { selectDocEn } from './en'
import { selectDocRu } from './ru'

const selectDocByLocale: Record<Locale, SelectDocStrings> = {
  en: selectDocEn as SelectDocStrings,
  ru: selectDocRu,
}

/**
 * Doc strings for the Select component page (`SelectDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useSelectDocStrings(): SelectDocStrings {
  const { locale } = useI18n()
  return useMemo(() => selectDocByLocale[locale], [locale])
}
