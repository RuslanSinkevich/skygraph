import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { TabsDocStrings } from './en'
import { tabsDocEn } from './en'
import { tabsDocRu } from './ru'

const tabsDocByLocale: Record<Locale, TabsDocStrings> = {
  en: tabsDocEn as TabsDocStrings,
  ru: tabsDocRu,
}

/**
 * Doc strings for the Tabs component page (`TabsDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useTabsDocStrings(): TabsDocStrings {
  const { locale } = useI18n()
  return useMemo(() => tabsDocByLocale[locale], [locale])
}
