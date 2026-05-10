import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { RadioDocStrings } from './en'
import { radioDocEn } from './en'
import { radioDocRu } from './ru'

const radioDocByLocale: Record<Locale, RadioDocStrings> = {
  en: radioDocEn as RadioDocStrings,
  ru: radioDocRu,
}

export function useRadioDocStrings(): ComputedRef<RadioDocStrings> {
  const { locale } = useI18n()
  return computed(() => radioDocByLocale[locale.value])
}
