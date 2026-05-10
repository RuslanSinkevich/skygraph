import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { RateDocStrings } from './en'
import { rateDocEn } from './en'
import { rateDocRu } from './ru'

const rateDocByLocale: Record<Locale, RateDocStrings> = {
  en: rateDocEn as RateDocStrings,
  ru: rateDocRu,
}

export function useRateDocStrings(): ComputedRef<RateDocStrings> {
  const { locale } = useI18n()
  return computed(() => rateDocByLocale[locale.value])
}
