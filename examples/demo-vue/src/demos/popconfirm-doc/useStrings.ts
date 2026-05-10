import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { PopconfirmDocStrings } from './en'
import { popconfirmDocEn } from './en'
import { popconfirmDocRu } from './ru'

const dictByLocale: Record<Locale, PopconfirmDocStrings> = {
  en: popconfirmDocEn as PopconfirmDocStrings,
  ru: popconfirmDocRu,
}

/**
 * Doc strings for the `Popconfirm` component page (`PopconfirmDemo.vue`).
 * English module (`en.ts`) is the source of truth; `ru.ts` matches keys.
 */
export function usePopconfirmDocStrings(): ComputedRef<PopconfirmDocStrings> {
  const { locale } = useI18n()
  return computed(() => dictByLocale[locale.value])
}
