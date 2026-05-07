import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { ResultDocStrings } from './en'
import { resultDocEn } from './en'
import { resultDocRu } from './ru'

const resultDocByLocale: Record<Locale, ResultDocStrings> = {
  en: resultDocEn as ResultDocStrings,
  ru: resultDocRu,
}

/**
 * Doc strings for the Result component page (`ResultDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useResultDocStrings(): ResultDocStrings {
  const { locale } = useI18n()
  return useMemo(() => resultDocByLocale[locale], [locale])
}
