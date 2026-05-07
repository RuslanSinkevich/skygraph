import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { PaginationDocStrings } from './en'
import { paginationDocEn } from './en'
import { paginationDocRu } from './ru'

const paginationDocByLocale: Record<Locale, PaginationDocStrings> = {
  en: paginationDocEn as PaginationDocStrings,
  ru: paginationDocRu,
}

/**
 * Doc strings for the Pagination component page (`PaginationDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function usePaginationDocStrings(): PaginationDocStrings {
  const { locale } = useI18n()
  return useMemo(() => paginationDocByLocale[locale], [locale])
}
