import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { SwitchDocStrings } from './en'
import { switchDocEn } from './en'
import { switchDocRu } from './ru'

const switchDocByLocale: Record<Locale, SwitchDocStrings> = {
  en: switchDocEn as SwitchDocStrings,
  ru: switchDocRu,
}

export function useSwitchDocStrings(): ComputedRef<SwitchDocStrings> {
  const { locale } = useI18n()
  return computed(() => switchDocByLocale[locale.value])
}
