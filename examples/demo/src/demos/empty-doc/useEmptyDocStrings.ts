import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { EmptyDocStrings } from './en'
import { emptyDocEn } from './en'
import { emptyDocRu } from './ru'

const emptyDocByLocale: Record<Locale, EmptyDocStrings> = {
  en: emptyDocEn as EmptyDocStrings,
  ru: emptyDocRu,
}

/**
 * Doc strings for the Empty component page (`EmptyDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useEmptyDocStrings(): EmptyDocStrings {
  const { locale } = useI18n()
  return useMemo(() => emptyDocByLocale[locale], [locale])
}
