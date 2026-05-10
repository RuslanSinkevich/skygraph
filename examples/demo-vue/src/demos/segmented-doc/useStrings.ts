import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { SegmentedDocStrings } from './en'
import { segmentedDocEn } from './en'
import { segmentedDocRu } from './ru'

const dictByLocale: Record<Locale, SegmentedDocStrings> = {
  en: segmentedDocEn as SegmentedDocStrings,
  ru: segmentedDocRu,
}

/**
 * Doc strings for the `Segmented` component page (`SegmentedDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useSegmentedDocStrings(): ComputedRef<SegmentedDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
