import { useMemo } from 'react'
import { useI18n } from '../../i18n'
import type { Locale } from '../../i18n/types'
import type { RadioDocStrings } from './en'
import { radioDocEn } from './en'
import { radioDocRu } from './ru'

const radioDocByLocale: Record<Locale, RadioDocStrings> = {
  en: radioDocEn as RadioDocStrings,
  ru: radioDocRu,
}

/**
 * Doc strings for the Radio component page (`RadioDemo.tsx`).
 * English module (`en.ts`) is the key source of truth; `ru.ts` must match keys.
 */
export function useRadioDocStrings(): RadioDocStrings {
  const { locale } = useI18n()
  return useMemo(() => radioDocByLocale[locale], [locale])
}
