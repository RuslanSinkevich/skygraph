import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { EmptyDocStrings } from './en'
import { emptyDocEn } from './en'
import { emptyDocRu } from './ru'

const dictByLocale: Record<Locale, EmptyDocStrings> = {
  en: emptyDocEn as EmptyDocStrings,
  ru: emptyDocRu,
}

/**
 * Doc strings for the Empty component page (`EmptyDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useEmptyDocStrings(): ComputedRef<EmptyDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
