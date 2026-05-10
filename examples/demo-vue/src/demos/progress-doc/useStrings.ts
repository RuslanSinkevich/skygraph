import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { ProgressDocStrings } from './en'
import { progressDocEn } from './en'
import { progressDocRu } from './ru'

const dictByLocale: Record<Locale, ProgressDocStrings> = {
  en: progressDocEn as ProgressDocStrings,
  ru: progressDocRu,
}

/**
 * Doc strings for the Progress component page (`ProgressDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useProgressDocStrings(): ComputedRef<ProgressDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
