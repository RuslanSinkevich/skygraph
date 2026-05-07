import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { DescriptionsDocStrings } from './en'
import { descriptionsDocEn } from './en'
import { descriptionsDocRu } from './ru'

const descriptionsDocByLocale: Record<Locale, DescriptionsDocStrings> = {
  en: descriptionsDocEn as DescriptionsDocStrings,
  ru: descriptionsDocRu,
}

/**
 * Doc strings for the Descriptions component page (`DescriptionsDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useDescriptionsDocStrings(): DescriptionsDocStrings {
  const { locale } = useI18n()
  return useMemo(() => descriptionsDocByLocale[locale], [locale])
}
