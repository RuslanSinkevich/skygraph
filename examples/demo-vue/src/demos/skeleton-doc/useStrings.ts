import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { SkeletonDocStrings } from './en'
import { skeletonDocEn } from './en'
import { skeletonDocRu } from './ru'

const dictByLocale: Record<Locale, SkeletonDocStrings> = {
  en: skeletonDocEn as SkeletonDocStrings,
  ru: skeletonDocRu,
}

/**
 * Doc strings for the Skeleton component page (`SkeletonDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useSkeletonDocStrings(): ComputedRef<SkeletonDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
