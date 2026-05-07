import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { TreeDocStrings } from './en'
import { treeDocEn } from './en'
import { treeDocRu } from './ru'

const treeDocByLocale: Record<Locale, TreeDocStrings> = {
  en: treeDocEn as TreeDocStrings,
  ru: treeDocRu,
}

/**
 * Doc strings for the Tree component page (`TreeDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useTreeDocStrings(): TreeDocStrings {
  const { locale } = useI18n()
  return useMemo(() => treeDocByLocale[locale], [locale])
}
