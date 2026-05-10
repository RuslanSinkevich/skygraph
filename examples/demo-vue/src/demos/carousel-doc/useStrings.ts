import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { CarouselDocStrings } from './en'
import { carouselDocEn } from './en'
import { carouselDocRu } from './ru'

const dictByLocale: Record<Locale, CarouselDocStrings> = {
  en: carouselDocEn as CarouselDocStrings,
  ru: carouselDocRu,
}

/**
 * Doc strings for the Carousel component page (`CarouselDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function useCarouselDocStrings(): ComputedRef<CarouselDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
