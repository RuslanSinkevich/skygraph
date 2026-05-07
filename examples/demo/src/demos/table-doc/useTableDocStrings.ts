import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { TableDocStrings } from './en'
import { tableDocEn } from './en'
import { tableDocRu } from './ru'

const tableDocByLocale: Record<Locale, TableDocStrings> = {
  en: tableDocEn as TableDocStrings,
  ru: tableDocRu,
}

/**
 * Doc strings for the Table component page (`TableDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useTableDocStrings(): TableDocStrings {
  const { locale } = useI18n()
  return useMemo(() => tableDocByLocale[locale], [locale])
}
