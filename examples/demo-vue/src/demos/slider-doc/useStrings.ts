import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { SliderDocStrings } from './en'
import { sliderDocEn } from './en'
import { sliderDocRu } from './ru'

const sliderDocByLocale: Record<Locale, SliderDocStrings> = {
  en: sliderDocEn as SliderDocStrings,
  ru: sliderDocRu,
}

export function useSliderDocStrings(): ComputedRef<SliderDocStrings> {
  const { locale } = useI18n()
  return computed(() => sliderDocByLocale[locale.value])
}
