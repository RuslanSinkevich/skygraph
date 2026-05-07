import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { SliderDocStrings } from './en'
import { sliderDocEn } from './en'
import { sliderDocRu } from './ru'

const sliderDocByLocale: Record<Locale, SliderDocStrings> = {
  en: sliderDocEn as SliderDocStrings,
  ru: sliderDocRu,
}

/**
 * Doc strings for the Slider component page (`SliderDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useSliderDocStrings(): SliderDocStrings {
  const { locale } = useI18n()
  return useMemo(() => sliderDocByLocale[locale], [locale])
}
