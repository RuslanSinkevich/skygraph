import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { TransferDocStrings } from './en'
import { transferDocEn } from './en'
import { transferDocRu } from './ru'

const transferDocByLocale: Record<Locale, TransferDocStrings> = {
  en: transferDocEn as TransferDocStrings,
  ru: transferDocRu,
}

export function useTransferDocStrings(): ComputedRef<TransferDocStrings> {
  const { locale } = useI18n()
  return computed(() => transferDocByLocale[locale.value])
}
