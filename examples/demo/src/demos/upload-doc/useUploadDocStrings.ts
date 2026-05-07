import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { UploadDocStrings } from './en'
import { uploadDocEn } from './en'
import { uploadDocRu } from './ru'

const uploadDocByLocale: Record<Locale, UploadDocStrings> = {
  en: uploadDocEn as UploadDocStrings,
  ru: uploadDocRu,
}

/**
 * Doc strings for the Upload component page (`UploadDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useUploadDocStrings(): UploadDocStrings {
  const { locale } = useI18n()
  return useMemo(() => uploadDocByLocale[locale], [locale])
}
