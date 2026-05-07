import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { BreadcrumbDocStrings } from './en'
import { breadcrumbDocEn } from './en'
import { breadcrumbDocRu } from './ru'

const breadcrumbDocByLocale: Record<Locale, BreadcrumbDocStrings> = {
  en: breadcrumbDocEn as BreadcrumbDocStrings,
  ru: breadcrumbDocRu,
}

/**
 * Doc strings for the Breadcrumb component page (`BreadcrumbDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useBreadcrumbDocStrings(): BreadcrumbDocStrings {
  const { locale } = useI18n()
  return useMemo(() => breadcrumbDocByLocale[locale], [locale])
}
