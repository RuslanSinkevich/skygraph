import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { TransferDocStrings } from './en'
import { transferDocEn } from './en'
import { transferDocRu } from './ru'

const transferDocByLocale: Record<Locale, TransferDocStrings> = {
  en: transferDocEn as TransferDocStrings,
  ru: transferDocRu,
}

/**
 * Doc strings for the Transfer component page (`TransferDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useTransferDocStrings(): TransferDocStrings {
  const { locale } = useI18n()
  return useMemo(() => transferDocByLocale[locale], [locale])
}
