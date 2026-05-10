import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { TableDocStrings } from './en'
import { tableDocEn } from './en'
import { tableDocRu } from './ru'

const tableDocByLocale: Record<Locale, TableDocStrings> = {
  en: tableDocEn as TableDocStrings,
  ru: tableDocRu,
}

export function useTableDocStrings(): ComputedRef<TableDocStrings> {
  const { locale } = useI18n()
  return computed(() => tableDocByLocale[locale.value])
}
