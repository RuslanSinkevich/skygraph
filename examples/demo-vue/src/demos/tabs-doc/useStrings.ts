import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { TabsDocStrings } from './en'
import { tabsDocEn } from './en'
import { tabsDocRu } from './ru'

const dictByLocale: Record<Locale, TabsDocStrings> = {
  en: tabsDocEn as TabsDocStrings,
  ru: tabsDocRu,
}

/**
 * Doc strings for the `Tabs` component page (`TabsDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useTabsDocStrings(): ComputedRef<TabsDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
