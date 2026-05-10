import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { TooltipDocStrings } from './en'
import { tooltipDocEn } from './en'
import { tooltipDocRu } from './ru'

const dictByLocale: Record<Locale, TooltipDocStrings> = {
  en: tooltipDocEn as TooltipDocStrings,
  ru: tooltipDocRu,
}

/**
 * Doc strings for the Tooltip component page (`TooltipDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useTooltipDocStrings(): ComputedRef<TooltipDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
