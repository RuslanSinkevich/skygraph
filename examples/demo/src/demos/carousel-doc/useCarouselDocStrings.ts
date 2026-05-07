import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { CarouselDocStrings } from './en'
import { carouselDocEn } from './en'
import { carouselDocRu } from './ru'

const carouselDocByLocale: Record<Locale, CarouselDocStrings> = {
  en: carouselDocEn as CarouselDocStrings,
  ru: carouselDocRu,
}

/**
 * Doc strings for the Carousel component page (`CarouselDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useCarouselDocStrings(): CarouselDocStrings {
  const { locale } = useI18n()
  return useMemo(() => carouselDocByLocale[locale], [locale])
}
