import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { TagDocStrings } from './en'
import { tagDocEn } from './en'
import { tagDocRu } from './ru'

const dictByLocale: Record<Locale, TagDocStrings> = {
  en: tagDocEn as TagDocStrings,
  ru: tagDocRu,
}

/**
 * Doc strings for the Tag component page (`TagDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useTagDocStrings(): ComputedRef<TagDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
