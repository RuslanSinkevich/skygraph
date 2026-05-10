import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { CollapseDocStrings } from './en'
import { collapseDocEn } from './en'
import { collapseDocRu } from './ru'

const dictByLocale: Record<Locale, CollapseDocStrings> = {
  en: collapseDocEn as CollapseDocStrings,
  ru: collapseDocRu,
}

/**
 * Doc strings for the Collapse component page (`CollapseDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useCollapseDocStrings(): ComputedRef<CollapseDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
