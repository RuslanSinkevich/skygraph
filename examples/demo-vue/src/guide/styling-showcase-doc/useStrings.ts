import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { StylingShowcaseDocStrings } from './en'
import { stylingShowcaseDocEn } from './en'
import { stylingShowcaseDocRu } from './ru'

const dictByLocale: Record<Locale, StylingShowcaseDocStrings> = {
  en: stylingShowcaseDocEn as StylingShowcaseDocStrings,
  ru: stylingShowcaseDocRu,
}

/**
 * Doc strings for the Styling Showcase guide page
 * (`examples/demo-vue/src/guide/StylingShowcase.vue`).
 *
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 * Mirrors React's `useStylingShowcaseDocStrings` hook 1:1, except it returns
 * a `ComputedRef` so consumers can keep reactivity through locale switches.
 */
export function useStylingShowcaseDocStrings(): ComputedRef<StylingShowcaseDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
