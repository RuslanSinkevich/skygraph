import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { DrawerDocStrings } from './en'
import { drawerDocEn } from './en'
import { drawerDocRu } from './ru'

const dictByLocale: Record<Locale, DrawerDocStrings> = {
  en: drawerDocEn as DrawerDocStrings,
  ru: drawerDocRu,
}

/**
 * Doc strings for the `Drawer` component page (`DrawerDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useDrawerDocStrings(): ComputedRef<DrawerDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
