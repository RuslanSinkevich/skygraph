import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { InputDocStrings } from './en'
import { inputDocEn } from './en'
import { inputDocRu } from './ru'

const inputDocByLocale: Record<Locale, InputDocStrings> = {
  en: inputDocEn as InputDocStrings,
  ru: inputDocRu,
}

/**
 * Doc strings for the Input component page (`InputDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useInputDocStrings(): InputDocStrings {
  const { locale } = useI18n()
  return useMemo(() => inputDocByLocale[locale], [locale])
}
