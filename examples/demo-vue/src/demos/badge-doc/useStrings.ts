import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { BadgeDocStrings } from './en'
import { badgeDocEn } from './en'
import { badgeDocRu } from './ru'

const dictByLocale: Record<Locale, BadgeDocStrings> = {
  en: badgeDocEn as BadgeDocStrings,
  ru: badgeDocRu,
}

/**
 * Doc strings for the Badge component page (`BadgeDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useBadgeDocStrings(): ComputedRef<BadgeDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
