import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { ButtonDocStrings } from './en'
import { buttonDocEn } from './en'
import { buttonDocRu } from './ru'

const buttonDocByLocale: Record<Locale, ButtonDocStrings> = {
  en: buttonDocEn as ButtonDocStrings,
  ru: buttonDocRu,
}

/**
 * Doc strings for the Button component page (`ButtonDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useButtonDocStrings(): ButtonDocStrings {
  const { locale } = useI18n()
  return useMemo(() => buttonDocByLocale[locale], [locale])
}
