import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { CascaderDocStrings } from './en'
import { cascaderDocEn } from './en'
import { cascaderDocRu } from './ru'

const cascaderDocByLocale: Record<Locale, CascaderDocStrings> = {
  en: cascaderDocEn as CascaderDocStrings,
  ru: cascaderDocRu,
}

export function useCascaderDocStrings(): ComputedRef<CascaderDocStrings> {
  const { locale } = useI18n()
  return computed(() => cascaderDocByLocale[locale.value])
}
