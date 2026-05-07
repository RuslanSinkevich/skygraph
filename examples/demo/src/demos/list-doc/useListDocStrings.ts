import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { ListDocStrings } from './en'
import { listDocEn } from './en'
import { listDocRu } from './ru'

const listDocByLocale: Record<Locale, ListDocStrings> = {
  en: listDocEn as ListDocStrings,
  ru: listDocRu,
}

/**
 * Doc strings for the List component page (`ListDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useListDocStrings(): ListDocStrings {
  const { locale } = useI18n()
  return useMemo(() => listDocByLocale[locale], [locale])
}
