import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { ResultDocStrings } from './en'
import { resultDocEn } from './en'
import { resultDocRu } from './ru'

const dictByLocale: Record<Locale, ResultDocStrings> = {
  en: resultDocEn as ResultDocStrings,
  ru: resultDocRu,
}

/**
 * Doc strings for the Result component page (`ResultDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useResultDocStrings(): ComputedRef<ResultDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
