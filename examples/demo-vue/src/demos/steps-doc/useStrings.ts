import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { StepsDocStrings } from './en'
import { stepsDocEn } from './en'
import { stepsDocRu } from './ru'

const dictByLocale: Record<Locale, StepsDocStrings> = {
  en: stepsDocEn as StepsDocStrings,
  ru: stepsDocRu,
}

/**
 * Doc strings for the `Steps` component page (`StepsDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useStepsDocStrings(): ComputedRef<StepsDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
