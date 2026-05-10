import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { MenuDocStrings } from './en'
import { menuDocEn } from './en'
import { menuDocRu } from './ru'

const dictByLocale: Record<Locale, MenuDocStrings> = {
  en: menuDocEn as MenuDocStrings,
  ru: menuDocRu,
}

/**
 * Doc strings for the `Menu` component page (`MenuDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useMenuDocStrings(): ComputedRef<MenuDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
