import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { TreeSelectDocStrings } from './en'
import { treeSelectDocEn } from './en'
import { treeSelectDocRu } from './ru'

const treeSelectDocByLocale: Record<Locale, TreeSelectDocStrings> = {
  en: treeSelectDocEn as TreeSelectDocStrings,
  ru: treeSelectDocRu,
}

/**
 * Doc strings for the TreeSelect component page (`TreeSelectDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useTreeSelectDocStrings(): TreeSelectDocStrings {
  const { locale } = useI18n()
  return useMemo(() => treeSelectDocByLocale[locale], [locale])
}
