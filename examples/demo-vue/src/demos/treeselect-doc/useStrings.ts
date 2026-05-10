import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { TreeSelectDocStrings } from './en'
import { treeSelectDocEn } from './en'
import { treeSelectDocRu } from './ru'

const treeSelectDocByLocale: Record<Locale, TreeSelectDocStrings> = {
  en: treeSelectDocEn as TreeSelectDocStrings,
  ru: treeSelectDocRu,
}

export function useTreeSelectDocStrings(): ComputedRef<TreeSelectDocStrings> {
  const { locale } = useI18n()
  return computed(() => treeSelectDocByLocale[locale.value])
}
