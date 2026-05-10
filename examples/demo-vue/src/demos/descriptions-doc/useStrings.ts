import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { DescriptionsDocStrings } from './en'
import { descriptionsDocEn } from './en'
import { descriptionsDocRu } from './ru'

const dictByLocale: Record<Locale, DescriptionsDocStrings> = {
  en: descriptionsDocEn as DescriptionsDocStrings,
  ru: descriptionsDocRu,
}

/**
 * Doc strings for the Descriptions component page (`DescriptionsDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useDescriptionsDocStrings(): ComputedRef<DescriptionsDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
