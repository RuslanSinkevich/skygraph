import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { PaginationDocStrings } from './en'
import { paginationDocEn } from './en'
import { paginationDocRu } from './ru'

const dictByLocale: Record<Locale, PaginationDocStrings> = {
  en: paginationDocEn as PaginationDocStrings,
  ru: paginationDocRu,
}

/**
 * Doc strings for the `Pagination` component page (`PaginationDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function usePaginationDocStrings(): ComputedRef<PaginationDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
