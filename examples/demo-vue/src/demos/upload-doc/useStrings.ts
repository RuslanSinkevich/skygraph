import { computed, type ComputedRef } from 'vue'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { UploadDocStrings } from './en'
import { uploadDocEn } from './en'
import { uploadDocRu } from './ru'

const uploadDocByLocale: Record<Locale, UploadDocStrings> = {
  en: uploadDocEn as UploadDocStrings,
  ru: uploadDocRu,
}

export function useUploadDocStrings(): ComputedRef<UploadDocStrings> {
  const { locale } = useI18n()
  return computed(() => uploadDocByLocale[locale.value])
}
