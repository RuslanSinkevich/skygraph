import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { BreadcrumbDocStrings } from './en'
import { breadcrumbDocEn } from './en'
import { breadcrumbDocRu } from './ru'

const dictByLocale: Record<Locale, BreadcrumbDocStrings> = {
  en: breadcrumbDocEn as BreadcrumbDocStrings,
  ru: breadcrumbDocRu,
}

/**
 * Doc strings for the `Breadcrumb` component page (`BreadcrumbDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useBreadcrumbDocStrings(): ComputedRef<BreadcrumbDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
